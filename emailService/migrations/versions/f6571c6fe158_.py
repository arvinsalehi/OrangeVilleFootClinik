"""empty message

Revision ID: f6571c6fe158
Revises: 
Create Date: 2023-12-10 16:42:41.674633

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6571c6fe158'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('email_templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.String(length=500), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('email_templates', schema=None) as batch_op:
        batch_op.drop_column('content')

    # ### end Alembic commands ###
