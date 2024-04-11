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
posts_db = hg_database.posts

class User:
    def signup(self):
        # 200 -> success, 201 -> user exists, 202 -> passwords don't match
        #breakpoint()
        req_data = request.get_json()
        user = {
                "email": req_data['email'],
                "username": req_data['username'],
                "passwd": req_data['passwd'],
                "confirmpasswd": req_data['confirmpasswd'],
        }
        response = make_response(
            jsonify(
                {"message": "password_no_matchy"}
            ),
            202,
        )
        
        if (user['passwd'] != user['confirmpasswd']):
            return response

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

class Forum:
    def create(self):
        req_data = request.get_json()
        forum = {
            "title": req_data['title'],
            "name": "".join([ c.lower() if c.isalnum() else "_" for c in req_data["title"] ]),
            "tags": req_data['categories'],
            "info_block": req_data['info_block'],
            "posts": [],
        }
        response = make_response(
            jsonify(
                {"message": "forum_name_exists"}
            ),
            202
        )
        if (forums_db.find_one({ "name": forum["name"] }) == None):
            response = make_response(
                jsonify(
                    {"message": "error_creating_forum"}
                ),
                201
            )
            if forums_db.insert_one(forum):
                response = make_response(
                    jsonify(
                        {"message": forum["name"]}
                    ),
                    200
                )
        return response
    def delete(self):
        req_data = request.get_json()
        result = forums_db.find_one({"name": req_data['name']})
        response = make_response(
            jsonify(
                {"message": "forum_not_found"}
            ),
            201,
        )
        if (result):
            response = make_response(
                jsonify(
                    {"message": "deleted_success"}
                ),
                200,
            )
            forums_db.delete_one(result)
        return response
    def post(self):
        req_data = request.get_json()
        post = {
            "title": req_data['title'],
            "username": req_data['username'],
            "name": "".join([ c.lower() if c.isalnum() else "_" for c in req_data["title"] ]) + '_' + str(uuid.uuid4().hex[0:6]),
            "forum_name": req_data['forum_name'],
            "post_body": req_data['post_body'],
            "replies": [],
        }
        response = make_response(
            jsonify(
                {"message": "forum_no_exist"}
            ),
            202
        )
        if forums_db.find_one({"name": post['forum_name']}):
            my_post = Post().create(post)
            if my_post.acknowledged:
                response = make_response(
                    jsonify(
                        {"message": "post_insert_failed"}
                    ),
                    201
                )
                if forums_db.find_one_and_update({ 'name': post["forum_name"] }, { '$push': { 'posts': my_post.inserted_id } }):
                    response = make_response(
                        jsonify(
                            {"message": post["name"]}
                        ),
                        200
                    )
        return response
    def retrieve(self):
        req_data = request.get_json()
        response = make_response(
            jsonify(
                {"message": "forum_no_existy"}
            ),
            201
        )
        if (forum_obj := forums_db.find_one({"name": req_data['forum_name']})):
            pipeline = [
                {'$match': {'_id': {'$in': forum_obj['posts']}}},
                {'$project': {
                    '_id': {"$toString": "$_id"},
                    'title': 1,
                    'username': 1,
                    'name': 1,
                    'forum_name': 1,
                    'post_body': 1,
                    'replies': 1,
                }}
            ]
            forum = {
                "title": forum_obj['title'],
                "name": forum_obj['name'],
                "tags": forum_obj['tags'],
                "info_block": forum_obj['info_block'],
                "posts": list(posts_db.aggregate(pipeline)),
            }
            response = make_response(
                jsonify(forum),
                200
            )
        return response

class Post:
    def create(self, post_struct):
        return posts_db.insert_one(post_struct)
    def edit(self):
        return jsonify('ok'), 200
    def delete(self):
        return jsonify('ok'), 200
    def retreive(self):
        return jsonify('ok'), 200
    def vote(self):
        return jsonify('ok'), 200
    def comment(self):
        return jsonify('ok'), 200

#########
# USERS #
#########
@app.route('/user/login', methods=["POST"])
def login():
    return User().login()

@app.route('/user/signup', methods=["POST"])
def signup():
    return User().signup()

@app.route('/user/delete', methods=["POST"])
def delete():
    return User().delete()

##########
# FORUMS #
##########
@app.route('/forum/create', methods=["POST"])
def forum_create():
    return Forum().create()

@app.route('/forum/delete', methods=["POST"])
def forum_delete():
    return Forum().delete()

@app.route('/forum/post', methods=["POST"])
def forum_post():
    return Forum().post()

@app.route('/forum/retrieve', methods=["GET"])
def forum_retrieve():
    return Forum().retrieve()

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
