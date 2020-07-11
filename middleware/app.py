import configparser

from flask import Flask
from flask import jsonify
from flask import request
from bson.json_util import dumps
from flask_pymongo import PyMongo

# CONFIG

print(" * loading config ...")

config = configparser.ConfigParser()
config.read("app.cfg")

host = config.get("mongodb", "host")
port = config.get("mongodb", "port")
db = config.get("mongodb", "db")

mongodbURI = "mongodb://" + host + ":" + port + "/" + db

flaskHost = config.get("flask", "host")
flaskPort = config.get("flask", "port")


# RsST API - INIT
print(" * starting app ...")

app = Flask(__name__)

print(" * connecting to mongodb: " + mongodbURI)
app.config["MONGO_URI"] = mongodbURI
mongo = PyMongo(app)

# ReST API - GET ROUTES
@app.route("/getTechPosts")
def getTechPosts():
    posts = mongo.db.tech.find({"visible": True})
    return jsonify(dumps(posts))

@app.route("/getOtherPosts")
def getOtherPosts():
    posts = mongo.db.other.find({"visible": True})
    return jsonify(dumps(posts))

# ReST API - POST ROUTES
@app.route("/addTechPost/", methods=["POST"])
def addTechPost():
    metadata = {
        "creator": request.form["creator"],
        "date": request.form["date"],
        "likes": request.form["likes"]
    }
    data = {
        "metadata": metadata,
        "title": request.form["title"],
        "content": request.form["content"],
        "visible": request.form["visible"] == "true"
    }
    mongo.db.tech.insert_one(data)

@app.route("/addOtherPost/", methods=["POST"])
def addOtherPost():
    metadata = {
        "creator": request.form["creator"],
        "date": request.form["date"],
        "likes": request.form["likes"]
    }
    data = {
        "metadata": metadata,
        "title": request.form["title"],
        "content": request.form["content"],
        "visible": request.form["visible"] == "true"
    }
    mongo.db.other.insert_one(data)

if __name__ == '__main__':
    app.run(host=flaskHost, port=flaskPort)