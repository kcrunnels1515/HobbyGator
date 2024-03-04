from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017, username="hobbygator", password="yomomma")
hg_database = client.flask_db
users_db = client.users
forums_db = client.forums

#@app.route("/members")
#
#def members():
#    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/', methods=('GET', 'POST'))
def index():
    return "Hello"

@app.route('/register', methods=('POST'))
def register_user():
    users_db.insert_one( { 'username': request.json["username"], 'passwd': request.json["passwd"] } )


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
