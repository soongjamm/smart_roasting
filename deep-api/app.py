from flask import Flask, request, redirect, jsonify
import magic
import numpy as np
import cv2
import base64

app = Flask(__name__)
IMG_EX = ["JPG", "JPEG", "GIF", "PNG"]


def rgbToHsv(rgb):
    pixel = np.uint8([[rgb]])  # 한 픽셀로 구성된 이미지로 변환
    hsv = cv2.cvtColor(pixel, cv2.COLOR_BGR2HSV)
    # cvtColor 함수를 이용하여 hsv 색공간으로 변환
    hsv = hsv[0][0]  # 픽셀 값을 가져옴

    return hsv


@app.route("/predict", methods=["GET", "POST"])
def predict():
    data = {}
    if request.method == "POST":
        if request.files.get("my_image"):
            postImage = request.files["my_image"].read()
            extension = magic.from_buffer(postImage).split()[0].upper()
            # 이미지 파일이면 분석 진행
            if extension in IMG_EX:
                # 이미지에서 RGB 추출후 HSV로 변환한다.
                # HSV값을 토대로 로스팅 레벨을 분석한다.
                tmp_rgb = [100, 150, 200]  # 임의의 RGV값
                hsv = rgbToHsv(tmp_rgb)
                data["isImg"] = True
                data["hue"] = int(hsv[0])
                data["saturation"] = int(hsv[1])
                data["value"] = int(hsv[2])
                data["roasting_level"] = "Full City"  # 임의의 로스팅 레벨
                return jsonify(data)
            else:
                return jsonify(data)

        # 이미지 파일이 아니면 'no image' 문자 리턴
        else:
            return "no image"
