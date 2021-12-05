import datetime
from models.index import Service
from func.token import token_required
from flask import request, jsonify
from werkzeug.utils import secure_filename
from flask import Blueprint

from models.index import db

serviceRoute = Blueprint('service', __name__, )


@serviceRoute.route('/services', methods=['GET'])
@token_required
def get_all_services():
    services = Service.query.all()

    data = []

    for service in services:
        value = {'name': service.name, 'title': service.title, 'description': service.description,
                 "credit": service.credit,
                 'attendeeLimit': service.attendeeLimit, 'address': service.address, 'imageUrl': service.imageUrl,
                 'duration': service.duration,
                 'date': service.date}
        data.append(value)

    return jsonify({'services': data, "isSuccess": 1})


@serviceRoute.route('/service/<id>', methods=['GET'])
@token_required
def get_one_service(id):
    service = Service.query.filter_by(id=id).first()

    if not service:
        return jsonify({'message': 'No service found!', "isSuccess": 0})

    value = {'name': service.name, 'title': service.title, 'description': service.description, 'credit': service.credit,
             'attendeeLimit': service.attendeeLimit, 'address': service.address, 'imageUrl': service.imageUrl,
             'duration': service.duration,
             'date': service.date}

    return jsonify({'service': value, "isSuccess": 1})


@serviceRoute.route('/service/create', methods=['POST'])
@token_required
def create_service():
    data = request.get_json()

    new_service = Service(
        name=data['name'],
        title=data['title'],
        description=data['title'],
        attendeeLimit=data['attendeeLimit'],
        address=data['address'],
        duration=data['duration'],
        imageUrl=data['img'],
        credit=data['creadit'],
        date=data['date'],
        userId=data['userId'],
        createdDate=datetime.datetime
    )
    db.session.add(new_service)
    db.session.commit()

    return jsonify({'message': 'New service created!', "isSuccess": 1})


@serviceRoute.route('/service/edit/<id>', methods=['POST'])
@token_required
def update_service(id):
    data = request.get_json()

    service: object = Service.query.filter_by(id=id).first()

    service.name = data['name'],
    service.title = data['title'],
    service.description = data['title'],
    service.attendeeLimit = data['attendeeLimit'],
    service.address = data['address'],
    service.imageUrl = data['img'],
    service.date = data['date'],
    service.credit = data['credit'],
    service.duration = data['duration'],
    service.userId = data['userId'],
    service.createddate = datetime.datetime

    db.session.commit()

    return jsonify({'message': 'New service created!', "isSuccess": 1})


@serviceRoute.route('/service/delete/<id>', methods=['DELETE'])
@token_required
def delete_service(id):
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
