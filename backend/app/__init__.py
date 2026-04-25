from flask import Flask, jsonify
from flask_cors import CORS

from .db import init_db
from .routes.uploads import uploads_bp
from.routes.notes import notes_bp
from .services.upload_service import delete_expired_uploads


def create_app() -> Flask:
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        UPLOAD_FOLDER="uploads",
        DB_NAME="studypod.db",
        MAX_FILE_SIZE_MB=10,
        MAX_CONTENT_LENGTH=10 * 1024 * 1024,
        ALLOWED_EXTENSIONS={"png", "jpg", "jpeg", "gif", "webp", "mp3"},
    )

    CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}})

    init_db(app)
    delete_expired_uploads(app)

    @app.get("/health")
    def health_check():
        return jsonify({"status": "ok"})

    app.register_blueprint(uploads_bp)
    app.register_blueprint(notes_bp)
    return app
