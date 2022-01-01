from db.index import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=False)
    name = db.Column(db.String(120), unique=False)
    description = db.Column(db.String(240),unique=False)
    surname = db.Column(db.String(120), unique=False)
    password = db.Column(db.String(120), unique=False)
    profileImg =db.Column(db.String(120), unique=False)
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
    description = db.Column(db.String(840), unique=False)
    capacity = db.Column(db.Integer, unique=False)
    longitude = db.Column(db.String(120), unique=False)
    latitude = db.Column(db.String(120), unique=False)
    address = db.Column(db.String(1120), unique=False)
    credit = db.Column(db.Integer, unique=False)
    imageUrl = db.Column(db.String(120), unique=False)
    date = db.Column(db.String(120), unique=False)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    createdDate = db.Column(db.DateTime, unique=False)
    comments = db.relationship('UserServiceComment', backref='Service', lazy='dynamic')

    def __init__(self, title, description, longitude, latitude, capacity, credit, address, imageUrl, date,
                 userId, createdDate):
        self.title = title
        self.description = description
        self.capacity = capacity
        self.longitude = longitude
        self.latitude = latitude
        self.credit = credit
        self.address = address
        self.imageUrl = imageUrl
        self.date = date
        self.userId = userId
        self.createdDate = createdDate


class UserService(db.Model):
    __tablename__ = 'userService'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    serviceId = db.Column(db.Integer, db.ForeignKey('service.id'))
    isUserCompleted = db.Column(db.Boolean, unique=False, default=False)
    isOwnerCompleted = db.Column(db.Boolean, unique=False, default=False)
    status = db.Column(db.Boolean, unique=False, default=False)
    user = db.relationship('User', backref='UserService', lazy=True, uselist=False)
    createdDate = db.Column(db.DateTime, unique=False)
    serviceStatus = db.Column(db.Integer, unique=False)

    def __init__(self, userId, serviceId, credit, status, isUserCompleted,isOwnerCompleted,createdDate, serviceStatus):
        self.userId = userId
        self.isUserCompleted = isUserCompleted
        self.isOwnerCompleted = isOwnerCompleted
        self.serviceStatus = serviceStatus
        self.serviceId = serviceId
        self.status = status
        self.credit = credit
        self.createdDate = createdDate


class UserMeetup(db.Model):
    __tablename__ = 'userMeetup'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    meetupId = db.Column(db.Integer, db.ForeignKey('meetup.id'))
    isUserCompleted = db.Column(db.Boolean, unique=False, default=False)
    isOwnerCompleted = db.Column(db.Boolean, unique=False, default=False)
    status = db.Column(db.Boolean, unique=False, default=False)
    user = db.relationship('User', backref='UserMeetup', lazy=True, uselist=False)
    createdDate = db.Column(db.DateTime, unique=False)
    serviceStatus = db.Column(db.Integer, unique=False)

    def __init__(self, userId, meetupId, status, createdDate, serviceStatus,isUserCompleted,isOwnerCompleted):
        self.userId = userId
        self.meetupId = meetupId
        self.serviceStatus = serviceStatus
        self.isUserCompleted = isUserCompleted
        self.isOwnerCompleted = isOwnerCompleted
        self.status = status
        self.createdDate = createdDate


class UserServiceComment(db.Model):
    __tablename__ = 'userServiceComment'

    id = db.Column(db.Integer, primary_key=True)
    serviceId = db.Column(db.Integer, db.ForeignKey('service.id'))
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship('User', backref='UserServiceComment', lazy=True, uselist=False)
    createdDate = db.Column(db.DateTime, unique=False)
    comment = db.Column(db.String(240),unique=False)
    commentStatus = db.Column(db.Integer, unique=False)
    rate = db.Column(db.Integer,unique=False)
    def __init__(self,rate,userId,serviceId, createdDate, commentStatus,comment):
        self.commentStatus = commentStatus
        self.serviceId = serviceId
        self.createdDate = createdDate
        self.userId = userId
        self.comment = comment
        self.rate = rate


class UserMeetupComment(db.Model):
    __tablename__ = 'userMeetupComment'

    id = db.Column(db.Integer, primary_key=True)
    meetupId = db.Column(db.Integer, db.ForeignKey('meetup.id'))
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    createdDate = db.Column(db.DateTime, unique=False)
    comment = db.Column(db.String(240),unique=False)
    user = db.relationship('User', backref='UserMeetupComment', lazy=True, uselist=False)
    commentStatus = db.Column(db.Integer, unique=False)
    rate = db.Column(db.Integer, unique=False)
    def __init__(self, rate, userId, meetupId, commentStatus,comment, createdDate):
        self.userId = userId
        self.commentStatus = commentStatus
        self.meetupId = meetupId
        self.rate = rate
        self.comment = comment
        self.createdDate = createdDate


class Meetup(db.Model):
    __tablename__ = 'meetup'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False)
    description = db.Column(db.String(840), unique=False)
    capacity = db.Column(db.Integer, unique=False)
    longitude = db.Column(db.String(120), unique=False)
    latitude = db.Column(db.String(120), unique=False)
    address = db.Column(db.String(1120), unique=False)
    duration = db.Column(db.String(120), unique=False)
    imageUrl = db.Column(db.String(120), unique=False)

    date = db.Column(db.String(120), unique=False)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    createdDate = db.Column(db.DateTime, unique=False)
    comments = db.relationship('UserMeetupComment', backref='Meetup', lazy='dynamic')
    def __init__(self, title, description, duration, longitude, latitude, capacity, address, imageUrl, date, userId,
                 createddate):
        self.title = title
        self.description = description
        self.capacity = capacity
        self.duration = duration
        self.longitude = longitude
        self.latitude = latitude
        self.address = address
        self.imageUrl = imageUrl
        self.date = date
        self.userId = userId
        self.createdDate = createddate
