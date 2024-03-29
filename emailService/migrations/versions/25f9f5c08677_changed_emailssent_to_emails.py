"""Changed EmailsSent to Emails

Revision ID: 25f9f5c08677
Revises: 01d05d156d23
Create Date: 2023-12-19 02:15:35.887954

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '25f9f5c08677'
down_revision = '01d05d156d23'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('emails_sent')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('emails_sent',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('isShown', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('template', mysql.VARCHAR(length=80), nullable=False),
    sa.Column('content', mysql.TEXT(), nullable=True),
    sa.Column('user_cliniko_id', mysql.VARCHAR(length=120), nullable=False),
    sa.Column('booking_cliniko_id', mysql.VARCHAR(length=120), nullable=True),
    sa.Column('username', mysql.VARCHAR(length=80), nullable=False),
    sa.Column('template_color_code', mysql.VARCHAR(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###
