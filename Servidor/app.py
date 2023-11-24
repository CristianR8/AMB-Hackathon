from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import torch
from torchvision import transforms
import matplotlib.pyplot as plt
import os

def load_model(model_path, device):
    model = torch.load(model_path, map_location=device)
    model.eval()
    return model

MODEL_PATH = 'deepbeauyAlldata_model'
model = load_model(os.path.join(MODEL_PATH + '.pth'), device='cpu')


app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        if file:
            content = file.read()
            image = Image.open(io.BytesIO(content)).convert('RGB')
            image = np.array(image)

            preprocess = transforms.Compose([
                transforms.Resize((500, 500)),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
                transforms.ToTensor(),
            ])
            input_tensor = preprocess(image)

            input_batch = input_tensor.unsqueeze(0) 
            with torch.no_grad():
                output = model(input_batch)

            output_image = output.squeeze().cpu().numpy()
            output_image = np.transpose(output_image, (1, 2, 0))
            output_image = (output_image - output_image.min()) / (output_image.max() - output_image.min())
            plt.imsave('/tmp/output.png', output_image)

            return send_file('/tmp/output.png', mimetype='image/png')

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
	app.run(debug=True)