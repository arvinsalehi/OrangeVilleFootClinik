from flask import Flask
from flask import render_template
from . import email_blueprint

@email_blueprint.route("/emailService")
def emails():
    return render_template("emails.html")