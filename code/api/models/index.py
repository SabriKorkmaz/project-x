from db.index import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=False)
    name = db.Column(db.String(120), unique=False)
    surname = db.Column(db.String(120), unique=False)
    password = db.Column(db.String(120), unique=False)
    recoveryHash = db.Column(db.String(120), unique=False)
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
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False)
    description = db.Column(db.String(420), unique=False)
    capacity = db.Column(db.Integer, unique=False)
    address = db.Column(db.String(120), unique=False)
    duration = db.Column(db.String(120),unique=False)
    credit = db.Column(db.Integer, unique=False)
    imageUrl = db.Column(db.String(120), unique=False)
    date = db.Column(db.DateTime, unique=False)
    userId = db.Column(db.Integer, unique=False)
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


class Meetup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False)
    description = db.Column(db.String(420), unique=False)
    capacity = db.Column(db.Integer, unique=False)
    address = db.Column(db.String(120), unique=False)
    duration = db.Column(db.String(120), unique=False)
    imageUrl = db.Column(db.String(120), unique=False)
    date = db.Column(db.DateTime, unique=False)
    userId = db.Column(db.Integer, unique=False)
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
