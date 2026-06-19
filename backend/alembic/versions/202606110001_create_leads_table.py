"""create leads table

Revision ID: 202606110001
Revises:
Create Date: 2026-06-11 00:00:01
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "202606110001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("contact", sa.String(length=150), nullable=False),
        sa.Column("company", sa.String(length=150), nullable=True),
        sa.Column("task", sa.Text(), nullable=False),
        sa.Column("budget", sa.String(length=50), nullable=True),
        sa.Column("source", sa.String(length=100), nullable=False, server_default="ai.arvexo.ru"),
        sa.Column("ip_address", sa.String(length=100), nullable=True),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column("privacy_consent", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("telegram_status", sa.String(length=30), nullable=False, server_default="pending"),
        sa.Column("telegram_error", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("leads")
