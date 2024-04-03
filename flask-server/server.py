from flask import Flask
from pymongo import MongoClient
from api import routes

app = Flask(__name__)
client = MongoClient('localhost', 27017, username="hobbygator", password="yomomma")
hg_database = client.flask_db
users_db = client.users
forums_db = client.forums

@app.route('/', methods=('GET', 'POST'))
def index():
    return "Hello"

#@app.route('/signup/', methods=('POST'))
#def signup():


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


