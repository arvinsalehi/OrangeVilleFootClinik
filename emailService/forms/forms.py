from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length


class NewTemplate(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255)],
                        render_kw={"class": "form-control template-name"})
    content = TextAreaField('Content', validators=[DataRequired()],
                            render_kw={"class": "form-control template-content"})
