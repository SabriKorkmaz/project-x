from db.index import db


class User(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=False)
    name = db.Column(db.String(120), unique=False)
    surname = db.Column(db.String(120), unique=False)
    password = db.Column(db.String(120), unique=False)
    recoveryHash = db.Column(db.String(120), unique=False)
    meetups = db.relationship('Meetup', backref='User', lazy='dynamic')
    services = db.relationship('Service', backref='User', lazy='dynamic')
    credit = db.Column(db.Integer, unique=False)
    invalidAttemptCount = db.Column(db.Integer, unique=False)
    admin = db.Column(db.Boolean)

    def __init__(self, email, name, surname, password, recoveryhash, credit, invalidattemptcount, admin):
        self.email = email
        self.surname = surname
        self.name = name
        self.password = password
        self.recoveryhash = recoveryhash
        self.credit = credit
        self.invalidattemptcount = invalidattemptcount
        self.admin = admin


class Service(db.Model):

    __tablename__ = 'service'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False)
    description = db.Column(db.String(420), unique=False)
    capacity = db.Column(db.Integer, unique=False)
    address = db.Column(db.String(120), unique=False)
    duration = db.Column(db.String(120),unique=False)
    credit = db.Column(db.Integer, unique=False)
    imageUrl = db.Column(db.String(120), unique=False)
    date = db.Column(db.String(120), unique=False)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    createdDate = db.Column(db.DateTime, unique=False)

    def __init__(self,  title, description,duration, capacity, credit, address, imageUrl, date, userId,createdDate):
        self.title = title
        self.description = description
        self.capacity = capacity
        self.credit = credit
        self.address = address
        self.imageUrl = imageUrl
        self.date = date
        self.userId = userId
        self.duration = duration
        self.createdDate = createdDate


class UserService(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    serviceId = db.Column(db.Integer, db.ForeignKey('service.id'))
    status = db.Column(db.Boolean, unique=False, default=False)
    credit = db.Column(db.Integer, unique=False)
    user = db.relationship('User', backref='UserService', lazy=True, uselist=False)
    createdDate = db.Column(db.DateTime, unique=False)

    def __init__(self,  userId, serviceId,  credit,status, createdDate):
        self.userId = userId
        self.serviceId = serviceId
        self.status = status
        self.credit = credit
        self.createdDate = createdDate


class UserMeetup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    meetupId = db.Column(db.Integer, db.ForeignKey('meetup.id'))
    status = db.Column(db.Boolean, unique=False,default=False)
    user = db.relationship('User', backref='UserMeetup', lazy=True, uselist=False)
    createdDate = db.Column(db.DateTime, unique=False)

    def __init__(self,  userId, meetupId,  status, createdDate):
        self.userId = userId
        self.meetupId = meetupId
        self.status = status
        self.createdDate = createdDate


class Meetup(db.Model):

    __tablename__ = 'meetup'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False)
    description = db.Column(db.String(420), unique=False)
    capacity = db.Column(db.Integer, unique=False)
    address = db.Column(db.String(120), unique=False)
    duration = db.Column(db.String(120), unique=False)
    imageUrl = db.Column(db.String(120), unique=False)
    date = db.Column(db.String(120), unique=False)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    createdDate = db.Column(db.DateTime, unique=False)

    def __init__(self, title, description,duration, capacity, address, imageUrl, date, userId,createddate):
        self.title = title
        self.description = description
        self.capacity = capacity
        self.duration = duration
        self.address = address
        self.imageUrl = imageUrl
        self.date = date
        self.userId = userId
        self.createdDate = createddate



