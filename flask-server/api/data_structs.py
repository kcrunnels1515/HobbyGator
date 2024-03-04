import json

class User:
    def __init__(self):
        self.username = ""
        self.passwd = ""

    def to_json(self):
        return json.dumps({"username": self.username, "passwd": self.passwd})
