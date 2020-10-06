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
                # 색상(hue), 채도(saturation), 명도(brightness)등과 로스팅 레벨 결과값을 줘야함
                # 일단 임시로
                data['hue'] = 255
                data['saturation'] = 255
                data['brightness'] = 255
                data['roasting_level'] = 'Full City'
                return jsonify(data)  # 분석결과 리턴
            else:
                # not img
                return jsonify(data)
        else:
            return "upsup"
