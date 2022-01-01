from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from models.index import User
from models.index import UserMeetup,UserService,Meetup,Service
from func.token import token_required
from shared.index import api_secret
from flask import request, jsonify, make_response

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
        user_data['surname'] = user.surname
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        output.append(user_data)

    return jsonify({'users': output})


@userRoute.route('/user/get/<id>', methods=['GET'])
def get_one_user( id):

    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {}
    user_data['id'] = user.id
    user_data['name'] = user.name
    user_data['surname'] = user.surname
    user_data['description'] = user.description
    user_data['email'] = user.email
    user_data['profileImg'] = user.profileImg
    user_data['credit'] = user.credit
    user_data['admin'] = user.admin

    meetups = []

    for meetup in user.meetups:

        comments = []
        for comment in meetup.comments:
            commentvalue = {"id":comment.id,"date":comment.createdDate,"comment":comment.comment, "rate":comment.rate,
                            "owner":{"name":comment.user.name,"surname":comment.user.surname}}

            comments.append(commentvalue)



        value = {'title': meetup.title,
                 "userId": meetup.userId,
                 'capacity': meetup.capacity, 'address': meetup.address, 'imageUrl': meetup.imageUrl,
                 'duration': meetup.duration, "id": meetup.id, "comments": comments,
                 'date': meetup.date}
        meetups.append(value)
    user_data['meetups'] = meetups

    services = []

    for service in user.services:
        value = {'title': service.title, 'description': service.description,
                 "credit": service.credit, "userId": service.userId,
                 'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
              "id": service.id,"comments": comments,
                 'date': service.date}
        services.append(value)

        comments = []
        for comment in service.comments:
            commentvalue = {"id":comment.id,"date":comment.createdDate,"comment":comment.comment, "rate":comment.rate,
                            "owner":{"name":comment.user.name,"surname":comment.user.surname}}

            comments.append(commentvalue)

    user_data['services'] = services

    return jsonify({'data': user_data,"isSuccess":1})


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
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           api_secret)
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['admin'] = user.admin
        user_data['credit'] = user.credit

        meetups = []

        for meetup in user.meetups:
            value = {'title': meetup.title, 'description': meetup.description,
                     "userId": meetup.userId,
                     'capacity': meetup.capacity, 'address': meetup.address, 'imageUrl': meetup.imageUrl,
                     'duration': meetup.duration, "id": meetup.id,
                     'date': meetup.date}
            meetups.append(value)
        user_data['meetups'] = meetups

        services = []

        for service in user.services:
            value = {'title': service.title, 'description': service.description,
                     "credit": service.credit, "userId": service.userId,
                     'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
                     "id": service.id,
                     'date': service.date}
            services.append(value)

        user_data['services'] = services
        return jsonify({'token': token.decode('UTF-8'), "isSuccess": 1,"message":"Login successful","user":user_data})

    return make_response(jsonify({"message": "Could not verify2", "isSuccess": 0}), 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


@userRoute.route('/user/deleteRegisteredMeetup/<id>', methods=['DELETE'])
@token_required
def delete_user_meetup(current_user, id):

    userMeetup = UserMeetup.query.filter_by(id=id).first()

    if not userMeetup:
        return jsonify({'message': 'No userMeetup found!'})

    db.session.delete(userMeetup)
    db.session.commit()

    return jsonify({'message': 'The userMeetup has been deleted!',"isSuccess":1})


@userRoute.route('/user/registerMeetup', methods=['POST'])
@token_required
def save_user_meetup(current_user):
    data = request.get_json()
    user_meetup = UserMeetup(
        userId=data['userId'],
        meetupId=data['meetupId'],
        status=0,
        isUserCompleted=False,
        isOwnerCompleted=False,
        serviceStatus=1,
        createdDate=datetime.datetime.now(),
    )
    db.session.add(user_meetup)
    db.session.commit()

    return jsonify({"isSuccess": 1, 'message': 'New appointment created!'})


@userRoute.route('/user/getRegisteredMeetup/<id>', methods=['GET'])
@token_required
def get_registered_meetup(current_user,id):
        userMeetup = UserMeetup.query.filter_by(userId=id)
        data = []

        for usermeetup in userMeetup:
            value = {'status': usermeetup.status,
                     "userId": usermeetup.userId,
                     "id": usermeetup.id,
                     "name": usermeetup.user.name,
                     "surname": usermeetup.user.surname,
                     'meetupId': usermeetup.meetupId}
            data.append(value)

        return jsonify({'data': data, "isSuccess": 1})


@userRoute.route('/user/getMeetupAttendees/<id>', methods=['GET'])
@token_required
def get_meetup_attendees(current_user,id):
        userMeetup = UserMeetup.query.filter_by(meetupId=id)
        data = []

        for usermeetup in userMeetup:
            value = {'status': usermeetup.status,
                     "userId": usermeetup.userId,
                     "id": usermeetup.id,
                     "isUserCompleted": usermeetup.isUserCompleted,
                     "isOwnerCompleted": usermeetup.isOwnerCompleted,
                     "name": usermeetup.user.name,
                     "surname": usermeetup.user.surname,
                     'meetupId': usermeetup.meetupId}
            data.append(value)

        return jsonify({'data': data, "isSuccess": 1})


@userRoute.route('/user/update/<id>', methods=['POST'])
@token_required
def update_user(current_user,id):
    data = request.get_json()

    user: object = User.query.filter_by(id=id).first()

    user_data = {}
    user.name = data["name"]
    user.surname = data["surname"]
    user.description = data["description"]
    user.email = data["email"]
    user.profileImg = data["profileImg"]
    hashed_password = generate_password_hash(data['password'], method='sha256')
    user.password = hashed_password

    db.session.commit()

    return jsonify({'message': 'User updated!', "isSuccess": 1})


@userRoute.route('/user/acceptRegisteredMeetup/<id>', methods=['POST'])
@token_required
def update_meetup(current_user,id):
    data = request.get_json()

    meetup: object = UserMeetup.query.filter_by(id=id).first()

    meetup.status = True

    db.session.commit()

    return jsonify({'message': 'Meetup request is accepted!', "isSuccess": 1})


@userRoute.route('/user/registerService', methods=['POST'])
@token_required
def save_user_service(current_user):
    data = request.get_json()
    user_service = UserService(
        userId=data['userId'],
        serviceId=data['serviceId'],
        credit=data['credit'],
        status=False,
        createdDate=datetime.datetime.now(),
    )
    user = User.query.filter_by(id=data['userId']).first()
    user.credit = user.credit - data['credit']

    db.session.add(user_service)
    db.session.commit()

    return jsonify({"isSuccess": 1, 'message': 'New service request is created!'})


@userRoute.route('/user/deleteRegisteredService/<id>', methods=['DELETE'])
@token_required
def delete_user_service(current_user, id):

    userService = UserService.query.filter_by(id=id).first()

    user = User.query.filter_by(id=userService.userId).first()

    user.credit = user.credit + userService.credit

    if not userService:
        return jsonify({'message': 'No userService found!'})

    db.session.delete(userService)
    db.session.commit()

    return jsonify({'message': 'The userService has been deleted!', "isSuccess": 1})


@userRoute.route('/user/getServiceAttendees/<id>', methods=['GET'])
@token_required
def get_service_attendees(current_user,id):
        userService = UserService.query.filter_by(serviceId=id)
        data = []

        for userservice in userService:
            value = {'status': userservice.status,
                     "userId": userservice.userId,
                     "id": userservice.id,
                     "name": userservice.user.name,
                     "surname": userservice.user.name,
                     'serviceId': userservice.serviceId}
            data.append(value)

        return jsonify({'data': data, "isSuccess": 1})


@userRoute.route('/user/acceptRegisteredService/<id>', methods=['POST'])
@token_required
def update_service(current_user,id):
    data = request.get_json()

    userservice: object = UserService.query.filter_by(id=id).first()

    userservice.status = True
    service = Service.query.filter_by(id=userservice.serviceId).first()
    user = User.query.filter_by(id = service.userId).first()
    user.credit = user.credit + service.credit
    db.session.commit()

    return jsonify({'message': 'Service request is accepted!', "isSuccess": 1})


@userRoute.route('/user/search', methods=['POST'])
def search():
        data = request.get_json()

        meetups = Meetup.query.filter(Meetup.title.contains(data['keyword']))
        services = Service.query.filter(Service.title.contains(data['keyword']))

        data_service = []

        for service in services:
            value = {'title': service.title, 'description': service.description,
                     "credit": service.credit, "userId": service.userId,
                     'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
                     "id": service.id,
                     'date': service.date}
            data_service.append(value)

        data_meetup = []

        for meetup in meetups:
            value = {'imageUrl': meetup.imageUrl, 'title': meetup.title, "description": meetup.description,
                     'address': meetup.address,
                     'duration': meetup.duration, 'userId': meetup.userId,
                     'capacity': meetup.capacity, "id": meetup.id,
                     'date': meetup.date}
            data_meetup.append(value)

        return jsonify({'dataMeetup': data_meetup,'dataService': data_service, "isSuccess": 1})

