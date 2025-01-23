# server.py
from flask import Flask, render_template, send_file

app = Flask(__name__, static_folder="./", template_folder="./")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<path:filename>")
def assets(filename):
    return send_file(f"./{filename}")

if __name__ == "__main__":
    app.run()