from flask import Flask, jsonify, request
from passlib.hash import pbkdf2_sha256
from server import hg_database as db
import uuid

class User:
    def signup(self):
        user = {
                "_id": uuid.uuid4().hex,
                "username": request.form.get('username')
		"passwd": request.form.get('passwd')
        }
        user['passwd'] = pbkdf2_sha256.encrypt(user['passwd'])

        if db.users.find_one({ "username": user["username"] }):
            return jsonify({"error": "Username already in use" }), 400
        if db.users.insert_one(user):
            return jsonify(user), 200
        return jsonify({"error": "Signup failed"}), 200
