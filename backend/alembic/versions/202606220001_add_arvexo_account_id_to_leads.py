"""add arvexo_account_id to leads

Revision ID: 202606220001
Revises: 202606110001
Create Date: 2026-06-22

"""

import sqlalchemy as sa

from alembic import op

revision = "202606220001"
down_revision = "202606110001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "leads",
        sa.Column("arvexo_account_id", sa.String(36), nullable=True),
    )
    op.create_index("ix_leads_arvexo_account_id", "leads", ["arvexo_account_id"])


def downgrade() -> None:
    op.drop_index("ix_leads_arvexo_account_id", table_name="leads")
    op.drop_column("leads", "arvexo_account_id")
