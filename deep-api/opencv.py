# -*- coding: utf-8 -*-

# Agtron No.95 ~ 55 까지 추출


# inRange
import numpy as np
import cv2

# # RGB 구해서 HSV로 변환
# one = np.uint8([[[37, 56, 103]]])
# two = np.uint8([[[33, 37, 66]]])
# hsv1 = cv2.cvtColor(one, cv2.COLOR_BGR2HSV)
# hsv2 = cv2.cvtColor(two, cv2.COLOR_BGR2HSV)
# print(hsv1, hsv2)

img = cv2.imread("3.jpg")  # 이미지 파일을 컬러로 불러옴
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
print("shape: ", img.shape)

# Brown의 HSV 범위 정의
lower_brown = np.array([2, 107, 66])
upper_brown = np.array([9, 163, 103])
# lower_brown = np.array([6, 139, 77])
# upper_brown = np.array([14, 180, 130])
# 커피의 색만을 뽑아내기 위해 HSV 이미지의 범위 정하기
img_mask = cv2.inRange(img_hsv, lower_brown, upper_brown)

# 바이너리 이미지를 마스크로 사용하여 원본이미지에서 범위값에 해당하는 부분을 획득
res = cv2.bitwise_and(img, img, mask=img_mask)
cv2.imshow("img_origin", img)
cv2.imshow("img_mask", img_mask)
cv2.imshow("img_color", res)
cv2.waitKey(0)
cv2.destroyAllWindows()
