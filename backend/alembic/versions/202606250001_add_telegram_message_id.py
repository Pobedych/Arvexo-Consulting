"""add telegram_message_id to leads

Revision ID: 202606250001
Revises: 202606240001
Create Date: 2026-06-25 00:00:00.000000
"""

import sqlalchemy as sa

from alembic import op

revision = "202606250001"
down_revision = "202606240001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("leads", sa.Column("telegram_message_id", sa.BigInteger(), nullable=True))


def downgrade() -> None:
    op.drop_column("leads", "telegram_message_id")
