from flask import Flask
from pymongo import MongoClient
from api.data_structs import User
from server import app

#@app.route("/members")
#
#def members():
#    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/api/login', methods=["POST"])
def login():
    return jsonify({}), 200

@app.route('/register/', methods=('GET', 'POST'))
def register_user():
    if request.method == 'GET':
        return jsonify({}), 200
    if request.method == 'POST':
        return User().signup()
