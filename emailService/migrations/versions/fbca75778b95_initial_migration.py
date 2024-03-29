"""Initial migration

Revision ID: fbca75778b95
Revises: 
Create Date: 2023-12-12 17:17:10.455400

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbca75778b95'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('email_templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.String(length=1500), nullable=False))

    with op.batch_alter_table('emails_sent', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.String(length=1500), nullable=True))
        batch_op.drop_index('template')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('emails_sent', schema=None) as batch_op:
        batch_op.create_index('template', ['template'], unique=False)
        batch_op.drop_column('content')

    with op.batch_alter_table('email_templates', schema=None) as batch_op:
        batch_op.drop_column('content')

    # ### end Alembic commands ###
