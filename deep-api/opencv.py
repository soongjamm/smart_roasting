# -*- coding: utf-8 -*-

# Agtron No.95 ~ 55 까지 추출

# 11월 21일. 해야할 것
# 사진 올리는 페이지 제작, 사진 올리고 submit ( get, post localhost:5000/ )
# 사진에서 커피의 색깔만 추출한 뒤 colab 서버로 post - 색깔의 평균을 내서 json으로 RGB로 이루어진 배열 리턴
# RGB값 중 검정색은 걸러내고 커피색 일 수 있는 것만 로스팅 단계 검사

# inRange
import numpy as np
import cv2

img = cv2.imread("3.png")  # 이미지 파일을 컬러로 불러옴
print(type(img))
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
# print("shape: ", img.shape)

# Brown의 HSV 범위 정의
lower_brown = np.array([2, 107, 66])
upper_brown = np.array([9, 163, 103])
# 커피의 색만을 뽑아내기 위해 HSV 이미지의 범위 정하기
img_mask = cv2.inRange(img_hsv, lower_brown, upper_brown)

# print(img_mask)

# 바이너리 이미지를 마스크로 사용하여 원본이미지에서 범위값에 해당하는 부분을 획득
res = cv2.bitwise_and(img, img, mask=img_mask)
