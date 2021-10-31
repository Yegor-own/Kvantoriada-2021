import cv2

""" Пример показывает работу порогового фильтра и создания трэкбаров для подбора параметров"""

image = cv2.imread("image.jpg")
image = cv2.resize(image, (0, 0), fx=0.5, fy=0.5)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imshow('gray_image', gray_image)

ret, threshold_image = cv2.threshold(gray_image, thresh, 255, cv2.THRESH_BINARY)
cv2.imshow('result', threshold_image)


cv2.waitKey(0)