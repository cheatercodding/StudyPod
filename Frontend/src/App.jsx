import { useState } from "react"

function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")

  function handleFileChange(e) {
    setFile(e.target.files[0])
  }

  async function handleUpload() {
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    setStatus("Yükleniyor...")

    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData
    })

    if (response.ok) {
      setStatus("Yükleme başarılı 🎉")
    } else {
      setStatus("Bir hata oldu ❌")
    }
  }

  return (
    <div style={{ background: "#0f0f0f", color: "#eee", minHeight: "100vh", padding: "2rem" }}>
      <h1>StudyPod 🎧</h1>

      <input type="file" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload}>Yükle</button>

      {status && <p>{status}</p>}
    </div>
  )
}

export default App
