from datetime import datetime,timezone
import os
from models.index import Meetup, User,UserMeetupComment
from func.token import token_required
from flask import request, jsonify, url_for
from werkzeug.utils import secure_filename
from flask import Blueprint
from flask import send_from_directory
from models.index import db
from shared.index import UPLOAD_FOLDER

meetupRoute = Blueprint('meetup', __name__, )


@meetupRoute.route('/meetup/latest', methods=['GET'])
def get_latest():
    meetups = db.session.query(Meetup).order_by(Meetup.id.desc()).limit(3)

    data = []

    for meetup in meetups:
        value = {'imageUrl': meetup.imageUrl, 'title': meetup.title,"description":meetup.description,
                 'address': meetup.address,
                 "longitude": meetup.longitude,
                 "latitude": meetup.latitude,

                 'duration': meetup.duration,'userId': meetup.userId,
                 'capacity': meetup.capacity,"id": meetup.id,
                 'date': meetup.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})


@meetupRoute.route('/meetup/getAll/<id>', methods=['GET'])
@token_required
def get_all_meetups(current_user, id):
    print(id)
    meetups = Meetup.query.filter_by(userId=id)

    data = []

    for meetup in meetups:
        value = {'imageUrl': meetup.imageUrl, 'title': meetup.title,"description":meetup.description,
                 'address': meetup.address,
                 "longitude": meetup.longitude,
                 "latitude": meetup.latitude,
                 'duration': meetup.duration,'userId': meetup.userId,
                 'capacity': meetup.capacity,"id": meetup.id,
                 'date': meetup.date}
        data.append(value)

    return jsonify({'data': data, "isSuccess": 1})


@meetupRoute.route('/meetup/get/<id>', methods=['GET'])
def get_one_meetup(id):
    meetup = Meetup.query.filter_by(id=id).first()
    user = User.query.filter_by(id=meetup.userId).first()
    if not meetup:
        return jsonify({'message': 'No meetup found!', "isSuccess": 0})

    value = { 'title': meetup.title, 'description': meetup.description,
              "longitude": meetup.longitude,
              "latitude": meetup.latitude,
              "owner": {"id":user.id, "name":user.name, "surname":user.surname},
              'duration': meetup.duration,"id": meetup.id,"userId":meetup.userId,
              'capacity': meetup.capacity, 'address': meetup.address, 'imageUrl': meetup.imageUrl,
              'date': meetup.date}

    return jsonify({'data': value, "isSuccess": 1})


@meetupRoute.route('/meetup/delete/<id>', methods=['DELETE'])
@token_required
def delete_meetup(current_user, id):
    meetup = Meetup.query.filter_by(id=id).first()

    if not meetup:
        return jsonify({'message': 'No meetup found!', "isSuccess": 0})

    db.session.delete(meetup)
    db.session.commit()

    return jsonify({'message': 'The meetup has been deleted!', "isSuccess": 1})


@meetupRoute.route('/meetup/create', methods=['POST'])
@token_required
def create_meetup(current_user):
    data = request.get_json()
    print(current_user.id)
    new_meetup = Meetup(
        title=data['title'],
        description=data['description'],
        capacity=data['capacity'],
        duration=data['duration'],
        address=data['address'],
        longitude=data['longitude'],
        latitude=data['latitude'],
        imageUrl=data['imageUrl'],
        date=data['date'],
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
    meetup.description = data['description'],
    meetup.capacity = data['capacity'],
    meetup.address = data['address'],
    meetup.imageUrl = data['imageUrl'],
    meetup.date = data['date'],
    meetup.duration = data['duration'],

    db.session.commit()

    return jsonify({'message': 'Meetup updated!', "isSuccess": 1})




@meetupRoute.route('/meetup/upload', methods=['POST', "GET"])
def upload_file():
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


@meetupRoute.route('/meetup/createComment', methods=['POST'])
@token_required
def create_meetup_comment(current_user):
    data = request.get_json()
    new_meetup_comment = UserMeetupComment(
        meetupId=data['meetupId'],
        userId=current_user.id,
        rate=data['rate'],
        commentStatus=1,
        createdDate= datetime.now(),
        comment=data['comment'],
    )
    db.session.add(new_meetup_comment)
    db.session.commit()

    return jsonify({'message': 'Thanks for your review!', "isSuccess": 1})


@meetupRoute.route('/meetup/updateComment/<id>', methods=['POST'])
@token_required
def update_meetup_comment(current_user,id):
    data = request.get_json()
    comment: object = UserMeetupComment.query.filter_by(id=id).first()
    comment.commentStatus = data['commentStatus']
    db.session.commit()

    return jsonify({'message': 'Comment updated!', "isSuccess": 1})


@meetupRoute.route('/meetup/deleteComment/<id>', methods=['DELETE'])
@token_required
def delete_meetup_comment(current_user, id):
    comment = UserMeetupComment.query.filter_by(id=id).first()

    if not comment:
        return jsonify({'message': 'No comment found!', "isSuccess": 0})

    db.session.delete(comment)
    db.session.commit()

    return jsonify({'message': 'The comment has been deleted!', "isSuccess": 1})


@meetupRoute.route('/meetup/getAllComment/<id>', methods=['GET'])
@token_required
def get_all_meetups_comment(current_user, id):
    print(id)
    comments = UserMeetupComment.query.filter_by(userId=id)

    data = []

    for comment in comments:
        value = {'meetupId': comment.meetupId,
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