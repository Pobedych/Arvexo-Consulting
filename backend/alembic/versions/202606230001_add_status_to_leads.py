"""add status to leads

Revision ID: 202606230001
Revises: 202606220001
Create Date: 2026-06-23 00:00:00.000000
"""

import sqlalchemy as sa

from alembic import op

revision = "202606230001"
down_revision = "202606220001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "leads",
        sa.Column(
            "status",
            sa.String(30),
            nullable=False,
            server_default="new",
        ),
    )


def downgrade() -> None:
    op.drop_column("leads", "status")
