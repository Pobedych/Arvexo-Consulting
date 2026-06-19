# CI/CD Pipeline

## Pipeline overview

```
Push / PR
    │
    ├── 🔍 frontend-lint      ──┐
    ├── 🔷 frontend-typecheck ──┼──► 📦 frontend-build
    └── 🐍 backend-lint       ──┘
                                        │
                                        ▼
                                  ✅ ci-summary
                                        │
                            (only on push to main)
                                        │
                                        ▼
                                 🌐 deploy → ai.arvexo.ru
```

## Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description | Example |
|---|---|---|
| `SSH_PRIVATE_KEY` | Private key for VPS SSH access | `-----BEGIN OPENSSH...` |
| `SSH_HOST` | VPS IP address or hostname | `95.217.x.x` |
| `SSH_USER` | SSH user on the VPS | `ubuntu` |
| `SSH_PORT` | SSH port (optional, default 22) | `22` |
| `DEPLOY_PATH` | Absolute path to the project on VPS | `/opt/arvexo-consulting` |

## GitHub Environment

Create a **`production`** environment in **Settings → Environments**:
- Add protection rules (optional: require reviewer before deploy)
- Environment URL: `https://ai.arvexo.ru`

## First-time VPS setup

```bash
# On the VPS:
git clone https://github.com/your-org/arvexo-consulting.git /opt/arvexo-consulting
cd /opt/arvexo-consulting
cp .env.example .env
# Fill in real values in .env
docker compose up --build -d
```

After that, every push to `main` deploys automatically.

## SSH key setup

```bash
# Generate a deploy key (no passphrase):
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/arvexo_deploy -N ""

# Add public key to VPS:
ssh-copy-id -i ~/.ssh/arvexo_deploy.pub user@your-vps

# Add private key content to GitHub Secret SSH_PRIVATE_KEY:
cat ~/.ssh/arvexo_deploy
```
