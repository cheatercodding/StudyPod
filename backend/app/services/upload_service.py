from __future__ import annotations

import os
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

from flask import Flask

from ..db import get_connection


def is_allowed_file(filename: str, allowed_extensions: set[str]) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


def build_expire_date(expire: str | None, uploaded_at: datetime) -> datetime | None:
    if expire == "2":
        return uploaded_at + timedelta(days=2)
    if expire == "7":
        return uploaded_at + timedelta(days=7)
    return None


def save_upload(app: Flask, file_storage: Any, expire: str | None) -> dict[str, str | None]:
    ext = file_storage.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}_{int(datetime.now().timestamp())}.{ext}"

    upload_dir = Path(app.root_path).parent / app.config["UPLOAD_FOLDER"]
    upload_dir.mkdir(parents=True, exist_ok=True)
    file_path = upload_dir / unique_name
    file_storage.save(file_path)

    uploaded_at = datetime.now()
    delete_at = build_expire_date(expire, uploaded_at)

    with get_connection(app) as conn:
        conn.execute(
            """
            INSERT INTO uploads (filename, original_name, uploaded_at, delete_at)
            VALUES (?, ?, ?, ?)
            """,
            (
                unique_name,
                file_storage.filename,
                uploaded_at.isoformat(),
                delete_at.isoformat() if delete_at else None,
            ),
        )
        conn.commit()

    return {
        "filename": unique_name,
        "original_name": file_storage.filename,
        "uploaded_at": uploaded_at.isoformat(),
        "delete_at": delete_at.isoformat() if delete_at else None,
    }


def list_uploads(app: Flask) -> list[dict[str, str | None]]:
    with get_connection(app) as conn:
        rows = conn.execute(
            """
            SELECT filename, original_name, uploaded_at, delete_at
            FROM uploads
            ORDER BY uploaded_at DESC
            """
        ).fetchall()

    return [
        {
            "filename": row[0],
            "original_name": row[1],
            "uploaded_at": row[2],
            "delete_at": row[3],
        }
        for row in rows
    ]


def upload_exists(app: Flask, filename: str) -> bool:
    with get_connection(app) as conn:
        row = conn.execute(
            "SELECT 1 FROM uploads WHERE filename = ?",
            (filename,),
        ).fetchone()
    return row is not None


def delete_expired_uploads(app: Flask) -> None:
    now = datetime.now()
    upload_dir = Path(app.root_path).parent / app.config["UPLOAD_FOLDER"]

    with get_connection(app) as conn:
        rows = conn.execute(
            """
            SELECT id, filename, delete_at
            FROM uploads
            WHERE delete_at IS NOT NULL
            """
        ).fetchall()

        for row_id, filename, delete_at in rows:
            if datetime.fromisoformat(delete_at) <= now:
                file_path = upload_dir / filename
                if file_path.exists():
                    os.remove(file_path)
                conn.execute("DELETE FROM uploads WHERE id = ?", (row_id,))
        conn.commit()
