from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from models.index import User
from func.token import token_required
from shared.index import api_secret
from flask import request, jsonify, make_response
from flask import json

from flask import Blueprint

from models.index import db

userRoute = Blueprint('user', __name__, )


@userRoute.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        output.append(user_data)

    return jsonify({'users': output})


@userRoute.route('/user/<id>', methods=['GET'])
@token_required
def get_one_user(current_user, id):
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {}
    user_data['id'] = user.id
    user_data['name'] = user.name
    user_data['password'] = user.password
    user_data['admin'] = user.admin

    return jsonify({'user': user_data})


@userRoute.route('/user/create', methods=['POST'])
def create_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(name=data['name'],
                    password=hashed_password,
                    admin=0,
                    recoveryhash="",
                    surname=data["surname"],
                    credit=5,
                    email=data["email"],
                    invalidattemptcount=0
                    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"isSuccess": 1,'message': 'New user created!'})


@userRoute.route('/user/<id>', methods=['PUT'])
@token_required
def promote_user(current_user, id):
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user.admin = True
    db.session.commit()

    return jsonify({'message': 'The user has been promoted!'})


@userRoute.route('/user/<id>', methods=['DELETE'])
@token_required
def delete_user(current_user, id):
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'The user has been deleted!'})


@userRoute.route('/login',methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data['email'] or not data['password']:
        return make_response('Could not verify1', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return make_response(jsonify({"message": "Could not verify2", "isSuccess": 0}), 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                           api_secret)
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['admin'] = user.admin
        return jsonify({'token': token.decode('UTF-8'), "isSuccess": 1,"message":"Login successful","user":user_data})

    return make_response('Could not verify3', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
