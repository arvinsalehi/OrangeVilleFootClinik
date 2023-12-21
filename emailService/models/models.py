from ..db.db import db
from sqlalchemy.orm import validates


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    bookings_id = db.Column(db.String(120), unique=True)
    cliniko_id = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'


class Bookings(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    appointment_type_ID = db.Column(db.String(500), nullable=False)
    starts_at = db.Column(db.String(30), nullable=False)
    ends_at = db.Column(db.String(30), nullable=False)
    updated_at = db.Column(db.String(30), nullable=False)
    cliniko_id = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.String(120), unique=True)
    appointment_type_str = db.Column(db.String(250), nullable=False)
    db.Column(db.Boolean(), nullable=True, default=False)

    def __repr__(self):
        return f"Appointment type {self.appointment_type}"


class Emails(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    isShown = db.Column(db.Boolean(), nullable=True, default=False)
    template = db.Column(db.String(80), nullable=False)
    content = db.Column(db.TEXT, nullable=True)
    username = db.Column(db.String(80), nullable=False)
    user_cliniko_id = db.Column(db.String(120), nullable=False)
    booking_cliniko_id = db.Column(db.String(120), nullable=True)
    template_color_code = db.Column(db.String(80), nullable=True)
    date = db.Column(db.String(80), nullable=False)
    isSent = db.Column(db.Boolean(), nullable=False, default=False)


class EmailTemplates(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    content = db.Column(db.TEXT, nullable=False)
    color = db.Column(db.String(25), nullable=False, default="#e38901")

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name cannot be empty")
        return name

    @validates('content')
    def validate_description(self, key, description):
        # Add more complex validation logic if needed
        if not description:
            raise ValueError("Content cannot be empty")

        return description
