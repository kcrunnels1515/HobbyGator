from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from server import hg_database as db
import uuid

class User:
    def signup(self):
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

    def login(self):
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

    def delete(self):
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
    
