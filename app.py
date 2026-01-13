import os
import sqlite3
from datetime import datetime, timedelta
from flask import Flask, request, render_template, redirect

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
DB_NAME = "studypod.db"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def db_baglantisi():
    return sqlite3.connect(DB_NAME)


def tabloyu_olustur():
    with db_baglantisi() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                uploaded_at TEXT NOT NULL,
                delete_at TEXT
            )
        """)
        conn.commit()


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        foto = request.files.get("image")
        expire = request.form.get("expire")

        if not foto or foto.filename == "":
            return "Foto seçilmedi", 400

        dosya_adi = foto.filename
        kayit_yolu = os.path.join(app.config["UPLOAD_FOLDER"], dosya_adi)
        foto.save(kayit_yolu)

        yuklenme = datetime.now()
        silinme = None

        if expire == "2":
            silinme = yuklenme + timedelta(days=2)
        elif expire == "7":
            silinme = yuklenme + timedelta(days=7)

        with db_baglantisi() as conn:
            conn.execute(
                "INSERT INTO uploads (filename, uploaded_at, delete_at) VALUES (?, ?, ?)",
                (
                    dosya_adi,
                    yuklenme.isoformat(),
                    silinme.isoformat() if silinme else None
                )
            )
            conn.commit()

        return redirect("/")

    return render_template("index.html")


def suresi_dolanlari_sil():
    simdi = datetime.now()

    with db_baglantisi() as conn:
        cursor = conn.execute(
            "SELECT id, filename, delete_at FROM uploads WHERE delete_at IS NOT NULL"
        )

        for kayit_id, dosya_adi, delete_at in cursor.fetchall():
            if datetime.fromisoformat(delete_at) <= simdi:
                dosya_yolu = os.path.join(UPLOAD_FOLDER, dosya_adi)

                if os.path.exists(dosya_yolu):
                    os.remove(dosya_yolu)

                conn.execute("DELETE FROM uploads WHERE id = ?", (kayit_id,))
        conn.commit()


if __name__ == "__main__":
    tabloyu_olustur()
    suresi_dolanlari_sil()
    app.run(debug=True)