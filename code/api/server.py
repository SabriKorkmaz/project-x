from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:swe573573@localhost/ProjectX'
db = SQLAlchemy(app)
pymysql.install_as_MySQLdb()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False)
    email = db.Column(db.String(120), unique=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


admin = User('admin', 'admin@example.com')

db.create_all()  # In case user table doesn't exists already. Else remove it.

db.session.add(admin)

db.session.commit()  # This is needed to write the changes to database


@app.route('/')
def index():
    return {"message": 'hello world'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
