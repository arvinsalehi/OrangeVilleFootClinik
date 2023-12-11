from ..db.db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    bookings_id = db.Column(db.Integer, unique=True)

    def __repr__(self):
        return f'<User {self.username}>'


class Bookings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appointment_type = db.Column(db.Integer, nullable=False)
    starts_at = db.Column(db.String(30), nullable=False)
    ends_at = db.Column(db.String(30), nullable=False)
    updated_at = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f"Appointment type {self.appointment_type}"


class EmailsSent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bookingsID = db.Column(db.Integer, nullable=False)
    userID = db.Column(db.Integer, nullable=False)


class EmailTemplates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    color = db.Column(db.String(25), nullable=False)
