import { useEffect, useMemo, useState } from 'react'
import { getDownloadUrl, getFiles, uploadFile } from './api/uploads'
import './index.css'

function formatDate(value) {
  if (!value) return 'Süresiz'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function App() {
  const [file, setFile] = useState(null)
  const [expire, setExpire] = useState('')
  const [status, setStatus] = useState('Bir dosya seç ve yükle.')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [filesLoading, setFilesLoading] = useState(true)

  const selectedFileText = useMemo(() => {
    if (!file) return 'Henüz dosya seçilmedi'
    return `${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB`
  }, [file])

  async function loadFiles() {
    try {
      setFilesLoading(true)
      const items = await getFiles()
      setFiles(items)
    } catch {
      setStatus('Dosya listesi alınırken bir hata oluştu.')
    } finally {
      setFilesLoading(false)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  async function handleUpload() {
    if (!file) {
      setStatus('Önce bir dosya seç.')
      return
    }

    try {
      setLoading(true)
      setStatus('Yükleniyor...')
      await uploadFile(file, expire)
      setStatus('Yükleme başarılı 🎉')
      setFile(null)
      setExpire('')
      await loadFiles()
    } catch (error) {
      setStatus(error.message || 'Bir hata oldu ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <header className="hero-card">
        <div>
          <span className="badge">StudyPod • upload modülü</span>
          <h1>Dosya yükleme alanı</h1>
          <p>
            Bu sürüm, senin mevcut projeni daha temiz hale getirilmiş frontend + backend
            yapısına çevirir. Upload bug düzeltildi, CORS eklendi ve dosya listesi bağlandı.
          </p>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Dosya yükle</h2>
          <p className="muted">İzin verilen türler: png, jpg, jpeg, gif, webp, mp3</p>

          <label className="input-label">
            Dosya seç
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>

          <div className="file-preview">{selectedFileText}</div>

          <label className="input-label">
            Silinme süresi
            <select value={expire} onChange={(event) => setExpire(event.target.value)}>
              <option value="">Süresiz sakla</option>
              <option value="2">2 gün sonra sil</option>
              <option value="7">7 gün sonra sil</option>
            </select>
          </label>

          <button className="primary-button" onClick={handleUpload} disabled={loading}>
            {loading ? 'Yükleniyor...' : 'Dosyayı yükle'}
          </button>

          <p className="status-text">{status}</p>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Yüklenen dosyalar</h2>
            <button className="ghost-button" onClick={loadFiles} disabled={filesLoading}>
              Yenile
            </button>
          </div>

          {filesLoading ? (
            <p className="muted">Dosyalar yükleniyor...</p>
          ) : files.length === 0 ? (
            <p className="muted">Henüz yüklenmiş dosya yok.</p>
          ) : (
            <ul className="file-list">
              {files.map((item) => (
                <li key={item.filename} className="file-item">
                  <div>
                    <strong>{item.original_name}</strong>
                    <div className="meta-row">
                      <span>Yüklenme: {formatDate(item.uploaded_at)}</span>
                      <span>Silinme: {formatDate(item.delete_at)}</span>
                    </div>
                  </div>
                  <a className="download-link" href={getDownloadUrl(item.filename)}>
                    İndir
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
