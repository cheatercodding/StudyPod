from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify, request, send_from_directory

from ..services.upload_service import (
    is_allowed_file,
    list_uploads,
    save_upload,
    upload_exists,
)

uploads_bp = Blueprint("uploads", __name__)


@uploads_bp.post("/upload")
def upload_file():
    file = request.files.get("file")
    expire = request.form.get("expire")

    if not file or file.filename == "":
        return jsonify({"error": "Dosya seçilmedi."}), 400

    if not is_allowed_file(file.filename, current_app.config["ALLOWED_EXTENSIONS"]):
        return jsonify({"error": "Bu dosya türüne izin yok."}), 400

    saved_file = save_upload(current_app, file, expire)
    return jsonify({"message": "Yükleme başarılı.", "file": saved_file}), 201


@uploads_bp.get("/files")
def get_files():
    return jsonify(list_uploads(current_app))


@uploads_bp.get("/download/<filename>")
def download_file(filename: str):
    if not upload_exists(current_app, filename):
        abort(404)

    upload_dir = Path(current_app.root_path).parent / current_app.config["UPLOAD_FOLDER"]
    return send_from_directory(upload_dir, filename, as_attachment=True)
