from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        if file:
            # Attempt the processing logic
            print(file)
            
            return jsonify({"message": "File received", "filename": file.filename}), 200
    except Exception as e:
        # If any error occurs, print it to the console and return a 500 error
        print(e)
        return jsonify({"error": str(e)}), 500
