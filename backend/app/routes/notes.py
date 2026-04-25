from flask import Blueprint, jsonify, request

notes_bp = Blueprint("notes", __name__, url_prefix="/api/notes")


def build_study_note(topic: str) -> str:
    return f"""# {topic}

## Kısa Tanım
{topic} konusu, öğrencinin düzenli ve sınav odaklı not çıkarabilmesi için temel kavramlarla ele alınmalıdır.

## Temel Mantık
- Konunun ana fikri belirlenir.
- Önemli kavramlar başlıklandırılır.
- Gereksiz detaylar ayıklanır.
- Öğrencinin tekrar edebileceği kısa not formatına çevrilir.

## Sınav İçin Dikkat
- Tanımları net bil.
- Örnekleri ayırt et.
- Konuyla ilgili temel soru tiplerini çöz.

## Mini Özet
{topic} için önce tanım, sonra örnek, sonra soru çözümü yapılmalıdır.
"""


@notes_bp.post("/generate")
def generate_note():
    data = request.get_json(silent=True) or {}
    topic = (data.get("topic") or "").strip()

    if not topic:
        return jsonify({"error": "Konu boş olamaz."}), 400

    note = build_study_note(topic)
    return jsonify({"note": note, "mode": "mock"}), 200


@notes_bp.post("/assist")
def assist_note():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()

    if not text:
        return jsonify({"error": "Düzenlenecek not boş olamaz."}), 400

    improved = f"""# Düzenlenmiş Not

## Temizlenmiş Hali
{text}

## AI Önerisi
Bu notu daha iyi hale getirmek için:
- Başlık ekle
- Anahtar kavramları ayır
- Tanım ve örnekleri ayrı yaz
- En sona kısa özet koy
"""

    return jsonify({"note": improved, "mode": "mock"}), 200