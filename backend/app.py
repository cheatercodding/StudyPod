import os
import sqlite3
import uuid
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory, abort

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
DB_NAME = "studypod.db"

# Ayarlar
MAX_FILE_SIZE_MB = 10
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp", "mp3"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE_MB * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -------------------- DB --------------------

def db_baglantisi():
    return sqlite3.connect(DB_NAME)


def tabloyu_olustur():
    with db_baglantisi() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                original_name TEXT NOT NULL,
                uploaded_at TEXT NOT NULL,
                delete_at TEXT
            )
        """)
        conn.commit()


# -------------------- HELPERS --------------------

def izinli_mi(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# -------------------- API --------------------

@app.route("/upload", methods=["POST"])
def upload_api():
    file = request.files.get("file")
    expire = request.form.get("expire")

    if not file or file.filename == "":
        return jsonify({"error": "Dosya seçilmedi"}), 400

    if not izinli_mi(file.filename):
        return jsonify({"error": "Bu dosya türüne izin yok"}), 400

    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}_{int(datetime.now().timestamp())}.{ext}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_name)

    file.save(file_path)

    yuklenme = datetime.now()
    silinme = None

    if expire == "2":
        silinme = yuklenme + timedelta(days=2)
    elif expire == "7":
        silinme = yuklenme + timedelta(days=7)

    with db_baglantisi() as conn:
        conn.execute("""
            INSERT INTO uploads (filename, original_name, uploaded_at, delete_at)
            VALUES (?, ?, ?, ?)
        """, (
            unique_name,
            file.filename,
            yuklenme.isoformat(),
            silinme.isoformat() if silinme else None
        ))
        conn.commit()

    return jsonify({
        "message": "Yükleme başarılı",
        "file": unique_name
    })


@app.route("/files", methods=["GET"])
def dosyalari_listele():
    with db_baglantisi() as conn:
        cursor = conn.execute("""
            SELECT filename, original_name, uploaded_at, delete_at
            FROM uploads
            ORDER BY uploaded_at DESC
        """)
        files = [
            {
                "filename": f[0],
                "original_name": f[1],
                "uploaded_at": f[2],
                "delete_at": f[3]
            }
            for f in cursor.fetchall()
        ]

    return jsonify(files)


@app.route("/download/<filename>")
def dosya_indir(filename):
    with db_baglantisi() as conn:
        cursor = conn.execute(
            "SELECT 1 FROM uploads WHERE filename = ?",
            (filename,)
        )
        if not cursor.fetchone():
            abort(404)

    return send_from_directory(
        UPLOAD_FOLDER,
        filename,
        as_attachment=True
    )


# -------------------- CLEANER --------------------

def suresi_dolanlari_sil():
    simdi = datetime.now()

    with db_baglantisi() as conn:
        cursor = conn.execute("""
            SELECT id, filename, delete_at
            FROM uploads
            WHERE delete_at IS NOT NULL
        """)

        for kayit_id, dosya_adi, delete_at in cursor.fetchall():
            if datetime.fromisoformat(delete_at) <= simdi:
                dosya_yolu = os.path.join(UPLOAD_FOLDER, dosya_adi)

                if os.path.exists(dosya_yolu):
                    os.remove(dosya_yolu)

                conn.execute(
                    "DELETE FROM uploads WHERE id = ?",
                    (kayit_id,)
                )
        conn.commit()


# -------------------- RUN --------------------

if __name__ == "__main__":
    tabloyu_olustur()
    suresi_dolanlari_sil()
    app.run(debug=True)
