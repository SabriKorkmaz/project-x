from datetime import datetime
from models.index import Service,User,UserServiceComment
from func.token import token_required
from flask import request, jsonify
from werkzeug.utils import secure_filename
from flask import Blueprint

from models.index import db

serviceRoute = Blueprint('service', __name__, )


@serviceRoute.route('/service/latest', methods=['GET'])
def get_latest():
    services =db.session.query(Service).order_by(Service.id.desc()).limit(3)
    data = []

    for service in services:
        value = {'title': service.title, 'description': service.description,
                 "credit": service.credit,"userId": service.userId,
                 'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
                  "id": service.id,"longitude":service.longitude,"latitude":service.latitude,
                 'date': service.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})


@serviceRoute.route('/service/getAll/<id>', methods=['GET'])
@token_required
def get_all_services(current_user, id):
    services = Service.query.filter_by(userId=id)
    data = []

    for service in services:
        value = {'title': service.title, 'description': service.description,
                 "credit": service.credit,"userId": service.userId,
                 'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
                 "id": service.id,"longitude":service.longitude,"latitude":service.latitude,
                 'date': service.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})


@serviceRoute.route('/service/get/<id>', methods=['GET'])
def get_one_service(id):
    service = Service.query.filter_by(id=id).first()
    user = User.query.filter_by(id=service.userId).first()
    if not service:
        return jsonify({'message': 'No service found!', "isSuccess": 0})

    value = {'title': service.title, 'description': service.description, 'credit': service.credit,
             'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
             "owner": {"id": user.id, "name": user.name, "surname": user.surname},
              "id":service.id,"longitude":service.longitude,"latitude":service.latitude,
             'date': service.date}

    return jsonify({'data': value, "isSuccess": 1})


@serviceRoute.route('/service/create', methods=['POST'])
@token_required
def create_service(current_user):
    data = request.get_json()

    new_service = Service(
        title=data['title'],
        description=data['description'],
        capacity=data['capacity'],
        address=data['address'],
        imageUrl=data['imageUrl'],
        longitude=data['longitude'],
        latitude=data['latitude'],
        credit=data['credit'],
        date=data['date'],
        userId=current_user.id,
        createdDate=datetime.now()
    )
    db.session.add(new_service)
    db.session.commit()

    return jsonify({'message': 'New service created!', "isSuccess": 1})


@serviceRoute.route('/service/update/<id>', methods=['POST'])
@token_required
def update_service(current_user,id):
    data = request.get_json()

    service: object = Service.query.filter_by(id=id).first()

    service.title = data['title'],
    service.description = data['description'],
    service.capacity = data['capacity'],
    service.address = data['address'],
    service.longitude = data['longitude'],
    service.latitude = data['latitude'],
    service.imageUrl = data['imageUrl'],
    service.date = data['date'],
    service.credit = data['credit'],
    service.userId = data['userId'],

    db.session.commit()

    return jsonify({'message': 'New service created!', "isSuccess": 1})


@serviceRoute.route('/service/delete/<id>', methods=['DELETE'])
@token_required
def delete_service(current_user, id):
    service = Service.query.filter_by(id=id).first()

    if not service:
        return jsonify({'message': 'No user found!', "isSuccess": 0})

    db.session.delete(service)
    db.session.commit()

    return jsonify({'message': 'The service has been deleted!', "isSuccess": 1})


@serviceRoute.route('/service/upload', methods=['POST', 'GET'])
@token_required
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
        return jsonify({'message': 'File successfully uploaded!', "isSuccess": 1})


@serviceRoute.route('/service/createComment', methods=['POST'])
@token_required
def create_meetup_comment(current_user):
    data = request.get_json()
    new_meetup_comment = UserServiceComment(
        serviceId=data['serviceId'],
        userId=current_user.id,
        rate=data['rate'],
        commentStatus=1,
        createdDate= datetime.now(),
        comment=data['comment'],
    )
    db.session.add(new_meetup_comment)
    db.session.commit()

    return jsonify({'message': 'Thanks for your review!', "isSuccess": 1})


@serviceRoute.route('/service/updateComment/<id>', methods=['POST'])
@token_required
def update_meetup_comment(current_user,id):
    data = request.get_json()
    comment: object = UserServiceComment.query.filter_by(id=id).first()
    comment.commentStatus = data['commentStatus']
    db.session.commit()

    return jsonify({'message': 'Comment updated!', "isSuccess": 1})


@serviceRoute.route('/service/deleteComment/<id>', methods=['DELETE'])
@token_required
def delete_meetup_comment(current_user, id):
    comment = UserServiceComment.query.filter_by(id=id).first()

    if not comment:
        return jsonify({'message': 'No comment found!', "isSuccess": 0})

    db.session.delete(comment)
    db.session.commit()

    return jsonify({'message': 'The comment has been deleted!', "isSuccess": 1})


@serviceRoute.route('/service/getAllComment/<id>', methods=['GET'])
@token_required
def get_all_meetups_comment(current_user, id):
    print(id)
    comments = UserServiceComment.query.filter_by(userId=id)

    data = []

    for comment in comments:
        value = {'serviceId': comment.meetupId,
                 'createdDate': comment.createdDate,
                 "comment":comment.comment,
                 'rate': comment.rate,
                 "id": comment.id,
                 "owner":{"name":comment.user.name,
                          "surname":comment.user.name,
                          "id":comment.user.id},
                 'date': comment.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})
