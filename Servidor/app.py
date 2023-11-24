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

MODEL_PATH = 'deepbeautyDIOSBENDIGO_model'
#model = load_model(os.path.join(MODEL_PATH + '.pth'), device='cpu')


app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    print('uploading file')
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        if file:
            content = file.read()
            image = Image.open(io.BytesIO(content)).convert('RGB')
            image = np.array(image)

            #save image in folder as png
            plt.imsave('input.png', image)

            #execute command
            os.system('python predict.py --image_path input --model_path deepbeautyDIOSBENDIGO_model')

            return send_file('input_prediction.png', mimetype='image/png')

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
	app.run(debug=True, port=5001)