from config import db


class User(db.Model):
    # we need to ask the SQL for our user model so this basically defines the necessary parameters we need for a new user
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    confirm_password = db.Column(db.String(80), unique=False, nullable=False)
    
    # this helps jsonify the user values into usable dictionary by the frontend 
    def to_json(self):
        return {
            "id": self.id,
            "userName": self.user_name,
            "email": self.email,
            "password": self.password
        }