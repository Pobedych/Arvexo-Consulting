from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "development"
    database_url: str = "postgresql+asyncpg://arvexo:change_me_password@localhost:5432/arvexo_ai"
    telegram_bot_token: str | None = None
    telegram_chat_id: str | None = None
    cors_origins: str = "http://localhost:3000,https://ai.arvexo.ru"
    trusted_proxy_ips: str = "127.0.0.1,::1,172.16.0.0/12,10.0.0.0/8,192.168.0.0/16"

    # Arvexo Account SSO integration
    account_api_url: str = "http://localhost:9100"
    account_sso_url: str = "http://localhost:9100"
    account_client_id: str = "arvexo-consulting"
    account_client_secret: str = "dev_consulting_secret"
    account_redirect_uri: str = "http://localhost:8000/api/auth/callback"

    # Session JWT (short-lived, used as consulting-side session)
    session_secret: str = "change_me_session_secret_32chars"
    session_cookie_name: str = "consulting_session"
    session_ttl_minutes: int = 60
    session_cookie_secure: bool = False
    frontend_url: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [item.strip() for item in self.cors_origins.split(",") if item.strip()]

    @property
    def trusted_proxy_ip_list(self) -> list[str]:
        return [item.strip() for item in self.trusted_proxy_ips.split(",") if item.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
