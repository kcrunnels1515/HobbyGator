from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import sys
import pdb
import uuid
from flask_jwt_extended import JWTManager,create_access_token,jwt_required
from datetime import timedelta


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = '�cҾK�K�f3��(ֲ/�eѲizv!X�}T�cS	w2TUiOb|�32k2�-'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
client = MongoClient('mongodb://hobbygator:yomomma@localhost/flask_db')
jwt = JWTManager(app)
hg_database = client.flask_db
users_db = hg_database.users
forums_db = hg_database.forums

@app.route('/', methods=["GET"])
def root():
    return jsonify('ok'), 200 #User().login()

@app.route('/api/login', methods=["POST"])
def login():
    # returns 200 on success, 201 on invalid password, 202 on user not found
    user = {
            "username": request.form.get('username'),
            "passwd": request.form.get('passwd'),
    }
    result = users_db.find_one({ "username": user["username"] })
    response = make_response(
        jsonify(
            {"message": "user not found"}
        ),
        202,
    )
    response.headers["Content-Type"] = "application/json"
    if (result):
        response = make_response(
            jsonify(
                {"message": "password incorrect"}
            ),
            201,
        )
        if (check_password_hash(result['passwd'], user['passwd'])):
            response = make_response(
                jsonify(
                    {"message": "logged in"}
                ),
                200,
            )
    return response

@app.route('/api/signup', methods=["POST"])
def signup():
    # 200 -> success, 201 -> user exists, 202 -> passwords don't match
    #breakpoint()
    req_data = request.get_json()
    user = {
            "_id": uuid.uuid4().hex,
            "email": req_data['email'],
            "username": req_data['username'],
            "passwd": req_data['passwd'],
            "confirmpasswd": req_data['confirmpasswd'],
    }
    print("username: {}, email: {}, password: {}, confirm: {}".format(user["username"], user["email"], user["passwd"], user["confirmpasswd"]), file=sys.stderr)
    response = make_response(
        jsonify(
            {"message": "password_no_matchy"}
        ),
        202,
    )

    if (user['passwd'] == user['confirmpasswd']):
        user['passwd'] = generate_password_hash(user["passwd"])
        del user['confirmpasswd']
        response = make_response(
            jsonify(
                {"message": "user_exists"}
            ),
            201,
        )

    if users_db.find_one({ "username": user["username"] }):
        return response
    if users_db.insert_one(user):
        response = make_response(
            jsonify(
                {"message": "user_created"}
            ),
            200,
        )
    return response

@app.route('/api/delete', methods=["POST"])
def delete():
    # returns 200 on success, 201 on non-existent user
    # 202 on invalid authentication
    req_data = request.get_json()
    user = {
            "username": req_data['username'],
            "passwd": req_data['passwd'],
    }
    #breakpoint()
    result = users_db.find_one({ "username": user["username"] })
    response = make_response(
        jsonify(
            {"message": "user_not_found"}
        ),
        201,
    )
    response.headers["Content-Type"] = "application/json"
    if (result):
        response = make_response(
            jsonify(
                {"message": "incorrect_password"}
            ),
            202,
        )
        if (check_password_hash(result['passwd'], user['passwd'])):
            response = make_response(
                jsonify(
                    {"message": "deleted_success"}
                ),
                200,
            )
            response.delete_cookie('HGLoggedIn')
            users_db.delete_one(result)
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
