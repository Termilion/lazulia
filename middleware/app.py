import configparser

from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin
from bson.json_util import dumps
from flask_pymongo import PyMongo

# CONFIG

print(" * loading config ...")

config = configparser.ConfigParser()
config.read("app.cfg")

host = config.get("mongodb", "host")
port = config.get("mongodb", "port")
db = config.get("mongodb", "db")

username = config.get("mongodb", "username")
password = config.get("mongodb", "password")

mongodbURI = "mongodb://%s:%s@%s:%s/%s" % (username, password, host, port, db)

flaskHost = config.get("flask", "host")
flaskPort = config.get("flask", "port")


# RsST API - INIT
print(" * starting app ...")

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

print(" * connecting to mongodb")
app.config["MONGO_URI"] = mongodbURI
mongo = PyMongo(app)

# ReST API - GET ROUTES
@app.route("/getTechPosts")
@cross_origin()
def getTechPosts():
    posts = mongo.db.tech.find({"visible": True})
    return jsonify(dumps(posts))

@app.route("/getOtherPosts")
@cross_origin()
def getOtherPosts():
    posts = mongo.db.other.find({"visible": True})
    return jsonify(dumps(posts))

# ReST API - POST ROUTES
@app.route("/addTechPost/", methods=["POST"])
@cross_origin()
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
    return ""

@app.route("/addOtherPost/", methods=["POST"])
@cross_origin()
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
    return ""

@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    app.run(host=flaskHost, port=flaskPort)