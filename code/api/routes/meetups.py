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


@meetupRoute.route('/meetup/getAll/<id>', methods=['GET'])
@token_required
def get_all_meetups(current_user, id):
    print(id)
    meetups = Meetup.query.filter_by(userId=id)

    data = []

    for meetup in meetups:
        value = {'imageUrl': meetup.imageUrl, 'title': meetup.title,"description":meetup.description,
                 'address': meetup.address,
                 'duration': meetup.duration,'userId': meetup.userId,
                 'capacity': meetup.capacity,"id": meetup.id,
                 'date': meetup.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})


@meetupRoute.route('/meetup/get/<id>', methods=['GET'])
@token_required
def get_one_meetup(current_user,id):
    meetup = Meetup.query.filter_by(id=id).first()

    if not meetup:
        return jsonify({'message': 'No meetup found!', "isSuccess": 0})

    value = { 'title': meetup.title, 'description': meetup.description,
             'duration': meetup.duration,"id": meetup.id,"userId":meetup.userId,
             'capacity': meetup.capacity, 'address': meetup.address, 'imageUrl': meetup.imageUrl,
             'date': meetup.date}

    return jsonify({'data': value, "isSuccess": 1})


@meetupRoute.route('/meetup/create', methods=['POST'])
@token_required
def create_meetup(current_user):
    data = request.get_json()
    print(current_user.id)
    new_meetup = Meetup(
        title=data['title'],
        description=data['title'],
        capacity=data['capacity'],
        duration=data['duration'],
        address=data['address'],
        imageUrl=data['imageUrl'],
        date=datetime.now(),
        userId=current_user.id,
        createddate=datetime.now()
    )
    db.session.add(new_meetup)
    db.session.commit()

    return jsonify({'message': 'New meetup created!', "isSuccess": 1})


@meetupRoute.route('/meetup/update/<id>', methods=['POST'])
@token_required
def update_meetup(current_user,id):
    data = request.get_json()

    meetup: object = Meetup.query.filter_by(id=id).first()

    meetup.title = data['title'],
    meetup.description = data['title'],
    meetup.capacity = data['capacity'],
    meetup.address = data['address'],
    meetup.imageUrl = data['imageUrl'],
    meetup.date = datetime.now(),
    meetup.duration = data['duration'],

    db.session.commit()

    return jsonify({'message': 'New meetup updated!', "isSuccess": 1})


@meetupRoute.route('/meetup/delete/<id>', methods=['DELETE'])
@token_required
def delete_meetup(current_user, id):
    meetup = Meetup.query.filter_by(id=id).first()

    if not meetup:
        return jsonify({'message': 'No user found!', "isSuccess": 0})

    db.session.delete(meetup)
    db.session.commit()

    return jsonify({'message': 'The meetup has been deleted!', "isSuccess": 1})


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