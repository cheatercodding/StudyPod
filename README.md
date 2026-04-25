# StudyPod

Düzenlenmiş sürüm:
- frontend ve backend ayrıldı
- upload bug düzeltildi (`image` -> `file`)
- CORS eklendi
- backend modüler hale getirildi
- veritabanı ve upload klasörü backend içinde toplandı
- `node_modules`, `uploads`, `studypod.db` repodan çıkarıldı

## Klasör yapısı

```text
StudyPod/
  frontend/
  backend/
  .gitignore
  README.md
```

## Backend kurulumu

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Sunucu varsayılan olarak `http://127.0.0.1:5000` adresinde açılır.

## Frontend kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend varsayılan olarak `http://127.0.0.1:5173` adresinde açılır.

## Ortam değişkeni

İstersen frontend içinde `.env` dosyası açıp API adresini değiştirebilirsin:

```env
VITE_API_URL=http://127.0.0.1:5000
```
