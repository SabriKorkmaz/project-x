import os
from flask_cors import CORS
import pymysql
from flask import Flask
from routes.user import userRoute
from db.index import db
app = Flask(__name__)


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:swe573573@localhost/ProjectX'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.register_blueprint(userRoute)

pymysql.install_as_MySQLdb()
db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(userRoute)


@app.route("/")
def main():
    return "Api initialized"


if __name__=="__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 4444)))
