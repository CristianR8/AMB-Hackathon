import torch
import argparse
import os
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from torchvision import transforms
import albumentations as A
from albumentations.pytorch import ToTensorV2
import matplotlib.image as im

def load_model(model_path, device):
    # Carga tu modelo aquí
    model = torch.load(os.path.join(model_path + '.pth'), map_location=device)
    model.eval()
    return model

def predict_image(model, image_path, device):
    # Procesar la imagen y hacer predicciones
    image = Image.open(image_path).convert('RGB')
    
    # Transformaciones, asegúrate de usar las mismas que en tu modelo de entrenamiento
    transform = A.Compose([
        A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
        ToTensorV2()
    ])

    image = transform(image=np.array(image))['image']
    image = image.unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(image)
        # Aplica cualquier post-procesamiento necesario aquí
        return output


def get_image(mask):
    print(mask.shape)
    mask = mask.squeeze()
    preds = torch.argmax(mask, dim=0)
    print(preds.shape)
    preds = preds.float()
        
    return preds


def save_prediction(output, save_path):
    # Guardar la imagen de salida
    output = get_image(output)
    im.imsave(save_path, output.cpu())



parser = argparse.ArgumentParser()
parser.add_argument('--image_path', type=str, default="recorte_89.png", help='Ruta de la imagen PNG para hacer la predicción')
parser.add_argument('--model_path', type=str, default='deepbeautyDIOSBENDIGO_model', help='Ruta del modelo')
parser.add_argument('--save_dir', type=str, default='.', help='Directorio donde guardar la imagen de salida')
args = parser.parse_args()

device = 'cpu'
model = load_model(args.model_path, device)

output = predict_image(model, args.image_path + '.png', device)

if not os.path.exists(args.save_dir):
    os.makedirs(args.save_dir)

save_path = args.image_path + '_prediction.png'
save_prediction(output, save_path)
