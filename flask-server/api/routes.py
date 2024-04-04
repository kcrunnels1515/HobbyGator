from flask import Flask
from pymongo import MongoClient
from api.data_structs import User
from server import app

@app.route('/api/login', methods=["POST"])
def login():
    return User().login()

@app.route('/api/signup', methods=["POST"])
def signup():
    return User().signup()

@app.route('/api/delete', methods=["POST"])
def delete():
    return User().delete()
