"""add sprint2 fields to leads

Revision ID: 202606240001
Revises: 202606230001
Create Date: 2026-06-24 00:00:00.000000
"""

import sqlalchemy as sa

from alembic import op

revision = "202606240001"
down_revision = "202606230001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("leads", sa.Column("service_type", sa.String(50), nullable=True))
    op.add_column("leads", sa.Column("urgency", sa.String(20), nullable=True))
    op.add_column("leads", sa.Column("status_updated_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("leads", sa.Column("admin_notes", sa.Text, nullable=True))


def downgrade() -> None:
    op.drop_column("leads", "admin_notes")
    op.drop_column("leads", "status_updated_at")
    op.drop_column("leads", "urgency")
    op.drop_column("leads", "service_type")
