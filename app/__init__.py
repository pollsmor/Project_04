from flask import Flask, render_template
from utl import getdata

app = Flask(__name__)

@app.route("/")
def home():
    dict = getdata.getData()
    return render_template("index.html", dict = dict.items());

if __name__ == "__main__":
    app.debug = True
    app.run()
