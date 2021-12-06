from datetime import datetime
import os
from models.index import Meetup
from func.token import token_required
from flask import request, jsonify, url_for
from werkzeug.utils import secure_filename
from flask import Blueprint
from flask import send_from_directory
from models.index import db
from shared.index import UPLOAD_FOLDER

meetupRoute = Blueprint('meetup', __name__, )


@meetupRoute.route('/meetups', methods=['GET'])
@token_required
def get_all_meetups():
    meetups = Meetup.query.all()

    data = []

    for meetup in meetups:
        value = {'name': meetup.name, 'title': meetup.title, 'description': meetup.description,
                 'duration': meetup.duration,
                 'attendeeLimit': meetup.attendeeLimit, 'address': meetup.address, 'imageUrl': meetup.imageUrl,
                 'date': meetup.date}
        data.append(value)

    return jsonify({'meetups': data, "isSuccess": 1})


@meetupRoute.route('/meetup/get/<id>', methods=['GET'])
@token_required
def get_one_meetup(id):
    meetup = Meetup.query.filter_by(id=id).first()

    if not meetup:
        return jsonify({'message': 'No meetup found!', "isSuccess": 0})

    value = {'name': meetup.name, 'title': meetup.title, 'description': meetup.description,
             'duration': meetup.duration,
             'attendeeLimit': meetup.attendeeLimit, 'address': meetup.address, 'imageUrl': meetup.imageUrl,
             'date': meetup.date}

    return jsonify({'meetup': value, "isSuccess": 1})


@meetupRoute.route('/meetup/create', methods=['POST'])
@token_required
def create_meetup(current_user):
    data = request.get_json()
    print(current_user.id)
    new_meetup = Meetup(
        name=data['name'],
        title=data['title'],
        description=data['title'],
        attendeeLimit=data['attendeeLimit'],
        duration=data['duration'],
        address=data['address'],
        imageUrl=data['imageUrl'],
        credit=data['credit'],
        date=datetime.now(),
        userId=current_user.id,
        createddate=datetime.now()
    )
    db.session.add(new_meetup)
    db.session.commit()

    return jsonify({'message': 'New meetup created!', "isSuccess": 1})


@meetupRoute.route('/meetup/edit/<id>', methods=['POST'])
@token_required
def update_meetup(current_user,id):
    data = request.get_json()

    meetup: object = Meetup.query.filter_by(id=id).first()

    meetup.name = data['name'],
    meetup.title = data['title'],
    meetup.description = data['title'],
    meetup.attendeeLimit = data['attendeeLimit'],
    meetup.address = data['address'],
    meetup.imageUrl = data['imageUrl'],
    meetup.date = data['date'],
    meetup.duration = data['duration'],
    meetup.credit = data['credit'],
    meetup.userId = current_user.id,
    meetup.createddate = datetime.datetime.date()

    db.session.commit()

    return jsonify({'message': 'New meetup created!', "isSuccess": 1})


@meetupRoute.route('/meetup/delete/<id>', methods=['DELETE'])
@token_required
def delete_user(id):
    meetup = Meetup.query.filter_by(id=id).first()

    if not meetup:
        return jsonify({'message': 'No user found!', "isSuccess": 0})

    db.session.delete(meetup)
    db.session.commit()

    return jsonify({'message': 'The user has been deleted!', "isSuccess": 1})


@meetupRoute.route('/meetup/upload', methods=['POST', "GET"])
@token_required
def upload_file(current_user):
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)
        print(filename)
        f.save(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify(
            {'message': 'File successfully uploaded!',
             "url": url_for('download_file', name=filename),
             'path': os.path.join(UPLOAD_FOLDER, filename),
             "isSuccess": 1})


@meetupRoute.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(os.path.join(UPLOAD_FOLDER), name)