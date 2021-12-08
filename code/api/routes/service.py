from datetime import datetime
from models.index import Service
from func.token import token_required
from flask import request, jsonify
from werkzeug.utils import secure_filename
from flask import Blueprint

from models.index import db

serviceRoute = Blueprint('service', __name__, )


@serviceRoute.route('/service/getAll/<id>', methods=['GET'])
@token_required
def get_all_services(current_user, id):
    services = Service.query.filter_by(userId=id)
    data = []

    for service in services:
        value = {'title': service.title, 'description': service.description,
                 "credit": service.credit,"userId": service.userId,
                 'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
                 'duration': service.duration, "id": service.id,
                 'date': service.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})


@serviceRoute.route('/service/get/<id>', methods=['GET'])
@token_required
def get_one_service(current_user,id):
    service = Service.query.filter_by(id=id).first()

    if not service:
        return jsonify({'message': 'No service found!', "isSuccess": 0})

    value = {'title': service.title, 'description': service.description, 'credit': service.credit,
             'capacity': service.capacity, 'address': service.address, 'imageUrl': service.imageUrl,
             'duration': service.duration, "id":service.id,
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
        duration=data['duration'],
        imageUrl=data['imageUrl'],
        credit=data['credit'],
        date=datetime.now(),
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
    service.imageUrl = data['imageUrl'],
    service.date = datetime.now(),
    service.credit = data['credit'],
    service.duration = data['duration'],
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
