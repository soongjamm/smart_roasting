from flask import Flask, request, redirect, jsonify
import magic
import numpy as np
import cv2

app = Flask(__name__)
IMG_EX = ['JPG', 'JPEG', 'GIF', 'PNG']


def rgbToHsv(rgb):
    pixel = np.uint8([[rgb]])  # 한픽셀로 구성된 이미지로 변환

    hsv = cv2.cvtColor(pixel, cv2.COLOR_BGR2HSV)
    # cvtColor 함수를 이용하여 hsv 색공간으로 변환

    hsv = hsv[0][0]  # 픽셀값을 가져옴
    print(hsv[0], type(hsv))

    return hsv


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
                # RGB 추출
                tmp_rgb = [100, 150, 200]  # 임의 값
                # RGB to HSV
                hsv = rgbToHsv(tmp_rgb)
                # 색상(hue), 채도(saturation), 명도(brightness)등과 로스팅 레벨 결과값을 줘야함
                data['hue'] = int(hsv[0])
                data['saturation'] = int(hsv[1])
                data['value'] = int(hsv[2])
                # predict. 임시
                data['roasting_level'] = 'Full City(test)'
                return jsonify(data)  # 분석결과 리턴
            else:
                # not img
                return jsonify(data)
        else:
            return "no image"
