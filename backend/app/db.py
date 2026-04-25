from pathlib import Path
import sqlite3
from flask import Flask


def get_db_path(app: Flask) -> Path:
    instance_path = Path(app.root_path).parent / "instance"
    instance_path.mkdir(parents=True, exist_ok=True)
    return instance_path / app.config["DB_NAME"]


def get_connection(app: Flask) -> sqlite3.Connection:
    return sqlite3.connect(get_db_path(app))


def init_db(app: Flask) -> None:
    uploads_path = Path(app.root_path).parent / app.config["UPLOAD_FOLDER"]
    uploads_path.mkdir(parents=True, exist_ok=True)

    with get_connection(app) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                original_name TEXT NOT NULL,
                uploaded_at TEXT NOT NULL,
                delete_at TEXT
            )
            """
        )
        conn.commit()
