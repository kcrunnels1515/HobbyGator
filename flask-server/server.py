from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import sys
import pdb
import uuid
from flask_jwt_extended import JWTManager,create_access_token,jwt_required, get_jwt_identity
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

##############
# STRUCTS   ##
##############

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
                "forums": [],
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
        req_data = request.get_json()
        user = {
                "username": req_data["username"],
                "passwd": req_data["passwd"]
        }
        result = users_db.find_one({ "username": user["username"] })
        response = make_response(
            jsonify(
                {"message": "user not found"}
            ),
            202,
        )
        if result:
            response = make_response(
                jsonify(
                    {"message": "password incorrect"}
                ),
                201,
            )
            if (check_password_hash(result['passwd'], user['passwd'])):
                token = generate_token(str(result['_id']))
                response = make_response(
                    jsonify(
                        {
                            "token": token,
                            "forums": [str(i) for i in result["forums"]],
                         }
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
    def add_forum(self):
        req_data = request.get_json()
        user = {
                "username": req_data['username'],
                "forum_name": req_data['forum_name']
        }
        response = make_response(
            jsonify(
                {"message": "forum_no_existy"}
            ),
            202,
        )
        forum = forums_db.find_one({"name": user['forum_name']})
        if forum:
            response = make_response(
                jsonify(
                    {"message": "failed_adding_forum"}
                ),
                201,
            )
            if users_db.find_one_and_update({ 'username': user['username'] }, { '$push': {'forums': forum['_id']} }):
                 response = make_response(
                     jsonify(
                         {"message": "added_forum"}
                     ),
                     200,
                 )
        return response
    def get_user_by_id(self, id):
        result = users_db.find_one({ "_id": ObjectId(id) })
        if result:
            return {
                "email": result["email"],
                "username": result["username"],
                "forums": result["forums"],
            }
        return None

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
                # needs username param to work
#                result = user_db.find_one
#                if users_db.find_one_and_update({ 'username': user['username'] }, { '$push': {'forums': forum['_id']} }):
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
            "forum_name": req_data['forum_name'],
            "post_body": req_data['post_body'],
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

        forum_name = req_data['forum_name']

        if (forum_obj := forums_db.find_one({"name": forum_name})):
            forum = {
                "title": forum_obj['title'],
                "name": forum_obj['name'],
                "tags": forum_obj['tags'],
                "info_block": forum_obj['info_block'],
                "posts": Post().retrieve(forum_obj['posts']),
            }
            response = make_response(
                jsonify(forum),
                200
            )
        return response

class Post:
    def create(self, data):
        data['name'] = "".join([ c.lower() if c.isalnum() else "_" for c in data["title"] ]) + '_' + str(uuid.uuid4().hex[0:6])
        data['replies'] = []
        data['votes'] = 0
        return posts_db.insert_one(data)
    def edit(self):
        req_data = request.get_json()
        post = {
            '_id': req_data['_id'],
            'post_body': req_data['post_body']
        }
        response = make_response(
            jsonify(
                {"message": "incorrect_id"}
            ),
            201
        )

        if posts_db.find_one_and_update({ '_id': ObjectId(post['_id']) },
                                        { '$push': { 'post_body': post['post_body'] } }):
            response = make_response(
                jsonify(
                    {"message": "post_modified"}
                ),
                200
            )
        return response
    def delete(self):
        req_data = request.get_json()
        post = {
            '_id': req_data['_id'],
            'forum_name': req_data['forum_name']
        }
        response = make_response(
            jsonify(
                {"message": "post_not_found"}
            ),
            202
        )
        if forums_db.find_one_and_update({"name": post['forum_name']}, { '$pull': {'posts': ObjectId(post['_id'])} }):
            response = make_response(
                jsonify(
                    {"message": "post_not_deleted"}
                ),
                201
            )
            if posts_db.find_one_and_delete({'_id': ObjectId(post['_id'])}):
                response = make_response(
                    jsonify(
                        {"message": "post_deleted"}
                    ),
                    200
                )
        return response
    def retrieve(self, post_ids):
        pipeline = [
            {'$match': {'_id': {'$in': post_ids}}},
            {'$project': {
                '_id': {"$toString": "$_id"},
                'title': 1,
                'username': 1,
                'name': 1,
                'forum_name': 1,
                'post_body': 1,
                'replies': 1,
                'votes': 1,
            }}
        ]
        posts = list(posts_db.aggregate(pipeline))
        for post in posts:
            post['replies'] = Post().retrieve(post['replies'])
        return posts
    def vote(self):
        req_data = request.get_json()
        response = make_response(
            jsonify(
                {"message": "post_not_found"}
            ),
            202,
        )
        post = posts_db.find_one({"_id": ObjectId(req_data['_id'])})
        if post:
            response = make_response(
                jsonify(
                    {"message": "voting_failed"}
                ),
                201,
            )
            if req_data['vote'] == 1:
                posts_db.update_one({'_id': ObjectId(req_data['_id'])}, { '$inc': { 'votes': 1 } })
                response = make_response(
                    jsonify(
                        {"message": "voting_succeeded"}
                    ),
                    200,
                )
            else:
                posts_db.update_one({'_id': ObjectId(req_data['_id'])}, { '$inc': { 'votes': -1 } })
                response = make_response(
                    jsonify(
                        {"message": "voting_succeeded"}
                    ),
                    200,
                )
        return response
    def reply(self):
        req_data = request.get_json()
        parent_post = req_data['parent_post']
        data = {
            "title": req_data['title'],
            "username": req_data['username'],
            "forum_name": req_data['forum_name'],
            "post_body": req_data['post_body'],
        }
        response = make_response(
            jsonify(
                {"message": "reply_creation_failed"}
            ),
            202,
        )
        new_reply = Post().create(data)
        if new_reply.acknowledged:
            response = make_response(
                jsonify(
                    {"message": "reply_insert_failed"}
                ),
                201
            )
            if posts_db.find_one_and_update({'_id': ObjectId(parent_post)},
                                { '$push': { 'replies': new_reply.inserted_id } }):
                response = make_response(
                    jsonify(
                        {"message": "reply_success"}
                    ),
                    200
                )
        return response

#############
# FUNCTIONS #
#############

def generate_token(user_id):
    access_token = create_access_token(identity=user_id)
    return access_token

def token_req(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.get_json()['token']
        if not token:
            return jsonify({'alert': 'token missing'}), 403
        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'alert': 'token invalid'}), 403

###############
# OTHER STUFF #
###############
@app.errorhandler(401)
def custom_401(error):
    return jsonify({"message": "Token has expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'message': 'Invalid Token', 'error': str(error)}), 422



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

#@jwt_required()
@app.route('/user/add_forum', methods=["POST"])
def add_forum():
    return User().add_forum()

##########
# FORUMS #
##########
@app.route('/forum/create', methods=["POST"])
#@token_req()
def forum_create():
    return Forum().create()

@app.route('/forum/delete', methods=["POST"])
#@token_req()
def forum_delete():
    return Forum().delete()

@app.route('/forum/post', methods=["POST"])
#@token_req()
def forum_post():
    return Forum().post()

@app.route('/forum/retrieve', methods=["POST"])
#@token_req()
def forum_retrieve():
    return Forum().retrieve()

@app.route('/post/vote', methods=["POST"])
#@token_req()
def post_vote():
    return Post().vote()

@app.route('/post/reply', methods=["POST"])
#@token_req()
def post_reply():
    return Post().reply()

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
