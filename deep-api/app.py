from flask import Flask, request, redirect, jsonify
import magic

app = Flask(__name__)
IMG_EX = ['JPG', 'JPEG', 'GIF', 'PNG']


@app.route('/predict', methods=["GET", "POST"])
def predict():
    data = {}
    data['isImg'] = False
    if request.method == 'POST':
        if request.files.get("my_image"):
            postImage = request.files["my_image"].read()
            extension = magic.from_buffer(postImage).split()[0].upper()
            if extension in IMG_EX:
                # img면 분석 진행
                data['isImg'] = True
                # 색상, 채도, 명도등 줘야함
                return jsonify(data)  # 분석결과 리턴
            else:
                # not img
                return jsonify(data)
        else:
            return "upsup"
