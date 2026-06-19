from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "development"
    database_url: str = "postgresql+asyncpg://arvexo:change_me_password@localhost:5432/arvexo_ai"
    telegram_bot_token: str | None = None
    telegram_chat_id: str | None = None
    cors_origins: str = "http://localhost:3000,https://ai.arvexo.ru"
    trusted_proxy_ips: str = "127.0.0.1,::1,172.16.0.0/12,10.0.0.0/8,192.168.0.0/16"

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
