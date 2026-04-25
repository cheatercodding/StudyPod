import { useEffect, useState } from "react";
import { assistNote, generateNote } from "./api/notes";
import { getDownloadUrl, getUploadedFiles, uploadFile } from "./api/uploads";
import "./index.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [topic, setTopic] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [aiNote, setAiNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadFiles() {
    try {
      const files = await getUploadedFiles();
      setUploadedFiles(files);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function handleUpload(event) {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Önce bir dosya seçmelisin.");
      return;
    }

    try {
      setFileLoading(true);
      setMessage("");
      await uploadFile(selectedFile);
      setSelectedFile(null);
      await loadFiles();
      setMessage("Dosya başarıyla yüklendi.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setFileLoading(false);
    }
  }

  async function handleGenerateNote() {
    if (!topic.trim()) {
      setMessage("Not oluşturmak için bir konu yaz.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const result = await generateNote(topic);
      setAiNote(result.note);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAssistNote() {
    if (!draftNote.trim()) {
      setMessage("Düzenlemek için önce not alanına bir şey yaz.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const result = await assistNote(draftNote);
      setAiNote(result.note);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">StudyPod AI</p>
          <h1>Akıllı Not Asistanı</h1>
          <p className="hero-text">
            Konu yaz, notunu düzenlet, kaynak dosyalarını yükle. Bu sürümde AI not
            endpointleri test modunda çalışıyor.
          </p>
        </div>
      </section>

      {message && <div className="message-box">{message}</div>}

      <section className="grid-layout">
        <div className="panel">
          <h2>AI ile Not Oluştur</h2>
          <p className="muted">Bir konu yaz, StudyPod sana sınav odaklı taslak not çıkarsın.</p>

          <input
            className="text-input"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Örn: Parabol, Isı Alışverişi, DNA Eşlenmesi"
          />

          <button className="primary-button" onClick={handleGenerateNote} disabled={loading}>
            {loading ? "Oluşturuluyor..." : "AI ile Not Oluştur"}
          </button>

          <hr />

          <h2>Notunu Düzenlet</h2>
          <textarea
            className="note-area"
            value={draftNote}
            onChange={(event) => setDraftNote(event.target.value)}
            placeholder="Dağınık notunu buraya yaz. StudyPod bunu düzenli ders notuna çevirecek."
          />

          <button className="secondary-button" onClick={handleAssistNote} disabled={loading}>
            {loading ? "Düzenleniyor..." : "AI ile Düzenle"}
          </button>
        </div>

        <div className="panel result-panel">
          <h2>AI Çıktısı</h2>
          {aiNote ? (
            <pre className="ai-output">{aiNote}</pre>
          ) : (
            <p className="muted">Henüz not oluşturulmadı. Sol taraftan bir konu gir.</p>
          )}
        </div>
      </section>

      <section className="grid-layout">
        <div className="panel">
          <h2>Kaynak Dosyası Yükle</h2>
          <p className="muted">
            Şimdilik yükleme sistemi aktif. Sonraki adımda bu dosyalardan metin çıkaracağız.
          </p>

          <form onSubmit={handleUpload} className="upload-form">
            <input
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            />

            <button className="primary-button" type="submit" disabled={fileLoading}>
              {fileLoading ? "Yükleniyor..." : "Dosyayı Yükle"}
            </button>
          </form>
        </div>

        <div className="panel">
          <h2>Yüklenen Dosyalar</h2>

          {uploadedFiles.length === 0 ? (
            <p className="muted">Henüz dosya yüklenmedi.</p>
          ) : (
            <ul className="file-list">
              {uploadedFiles.map((file) => (
                <li key={file.id || file.filename}>
                  <span>{file.original_name || file.filename}</span>
                  <a href={getDownloadUrl(file.filename)} target="_blank" rel="noreferrer">
                    İndir
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
