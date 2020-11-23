from flask import Flask, request, redirect, jsonify, render_template, url_for, json
import magic
import numpy as np
import cv2
import base64
from sklearn.cluster import KMeans

app = Flask(__name__)
IMG_EX = ["JPG", "JPEG", "GIF", "PNG"]


####
def centroid_histogram(clt):
    numLabels = np.arange(0, len(np.unique(clt.labels_)) + 1)
    (hist, _) = np.histogram(clt.labels_, bins=numLabels)

    hist = hist.astype("float")
    hist /= hist.sum()

    return hist


def plot_colors(hist, centroids):
    bar = np.zeros((50, 300, 3), dtype="uint8")
    startX = 0
    avg = dict()
    idx = 0
    for (percent, color) in zip(hist, centroids):
        endX = startX + (percent * 300)
        cv2.rectangle(
            bar, (int(startX), 0), (int(endX), 50), color.astype("uint8").tolist(), -1
        )
        avg[idx] = color.astype("uint8").tolist()
        idx += 1
        startX = endX

    return avg


def image_color_cluster(extracted_image, k=5):
    image = extracted_image
    #
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = image.reshape((image.shape[0] * image.shape[1], 3))

    clt = KMeans(n_clusters=k)
    clt.fit(image)

    hist = centroid_histogram(clt)
    bar = plot_colors(hist, clt.cluster_centers_)

    res = [0, 0, 0]
    color = ""
    cnt = 0
    maxval = [0 * 3]
    minval = [1e9 * 3]
    for b in bar.values():
        if b[0] == 0:
            continue
        if b[0] > maxval[0]:
            maxval = b
        elif b[0] < minval[0]:
            minval = b
        cnt += 1
        res[0] += b[0]
        res[1] += b[1]
        res[2] += b[2]

    for i in range(3):
        res[i] -= maxval[i]

    res = list(map(lambda x: x / (cnt - 1), res))
    print(bar)
    if res[0] >= 100:
        color = "Agtron95"
    elif res[0] >= 90:
        color = "Agtron85"
    elif res[0] >= 85:
        color = "Agtron75"
    elif res[0] >= 79:
        color = "Agtron65"
    elif res[0] >= 65:
        color = "Agrton55"
    else:
        color = "파악불가"

    print(res)
    print(color)

    return color


def rgbToHsv(rgb):
    pixel = np.uint8([[rgb]])  # 한 픽셀로 구성된 이미지로 변환
    hsv = cv2.cvtColor(pixel, cv2.COLOR_BGR2HSV)
    # cvtColor 함수를 이용하여 hsv 색공간으로 변환
    hsv = hsv[0][0]  # 픽셀 값을 가져옴

    return hsv


@app.route("/extraction", methods=("GET", "POST"))
def analysis():
    if request.method == "GET":
        return render_template("image_upload.html")
    else:
        if request.files.get("file"):
            # read image file string data
            filestr = request.files["file"].read()
            # convert string data to numpy array
            npimg = np.fromstring(filestr, np.uint8)
            # convert numpy array to image
            img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

            # img = cv2.imread(request.files.get("file"))  # 이미지 파일을 컬러로 불러옴
            img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

            # Brown의 HSV 범위 정의
            lower_brown = np.array([2, 107, 66])
            upper_brown = np.array([9, 163, 103])

            # # 커피의 색만을 뽑아내기 위해 HSV 이미지의 범위 정하기
            img_mask = cv2.inRange(img_hsv, lower_brown, upper_brown)
            res = cv2.bitwise_and(img, img, mask=img_mask)
            cv2.imwrite("result.jpg", res)  # 커피색만 추출한 이미지 저장
            print("res저장@@@@@@@@@@@@@@@@@@@@@@@")
            result = image_color_cluster(res)
            print("res저장@@@@@@@@@@@@@@@@@@@@@@@")
            return result

        else:
            return jsonify({"res": "이미지없음"})

    return jsonify({"res": "failed"})


app.run(port=5999)