from flask import request, jsonify
from config import app, db
from models import User

# get a jsonified list of users when submitting a GET function to it
@app.route("/users", methods=["GET"])
def get_Users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users})


# create a user when sending a json and a POST
@app.route("/create_user", methods=["POST"])
def create_user():
    # this establishes all of the variables through using request to get them from front end
    user_name = request.json.get("userName")
    email = request.json.get("email")
    password = request.json.get("password")
    confirm_password = request.json.get("confirmPassword")

    # making sure everything is passed in to us that we need to create a user
    if not user_name or not password or not confirm_password or not email:
        return (
            jsonify({"message": "You must include a user name, email, password, and a confirmation password"}),
            400,
        )

    # creates a new user with the given parameters
    new_user = User(user_name=user_name, password=password, email=email, confirm_password=confirm_password)
    try:
        # adds the user to the backend if created sucessfully or fails and tells us why it failed
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    #tells us user was successfully created
    return jsonify({"message": "User created!"}), 201


# update a user based on the passed in ID
@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    # gets the user based on the ID that we gave it to use
    user = User.query.get(user_id)
    # if there is not a user with that given ID then we just tell them user not found
    if not user:
        return jsonify({"message": "User not found"}), 404

    # jsonify the data and reassign all of the information to be put out
    data = request.json
    user.user_name = data.get("userName", user.user_name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.confirm_password = data.get("password", user.confirm_password)

    # commits the changes to the backend
    db.session.commit()

    return jsonify({"message": "User updated."}), 200


#delete a user based on the passed in ID
@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    # gets user based on ID
    user = User.query.get(user_id)
    # make sure user is real
    if not user:
        return jsonify({"message": "User not found"}), 404
    # delete user and commit
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)