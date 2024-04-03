from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017, username="hobbygator", password="yomomma")
hg_database = client.flask_db
users_db = client.users
forums_db = client.forums

from api import routes

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


