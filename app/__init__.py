from flask import Flask, render_template
from utl import getdata

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("intro.html");


@app.route("/page")
def page():
    dict = getdata.getData()
    return render_template("index.html", data = dict);

if __name__ == "__main__":
    app.debug = True
    app.run()
