from flask import Flask, request
import flask

app = Flask(__name__)


@app.route('/predict', methods=["GET", "POST"])
def predict():
    if request.method == 'POST':
        return "testg"


def preprocessing():
    pass
