const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export async function uploadFile(file, expire = '') {
  const formData = new FormData()
  formData.append('file', file)
  if (expire) {
    formData.append('expire', expire)
  }

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Yükleme sırasında hata oluştu.')
  }

  return data
}

export async function getFiles() {
  const response = await fetch(`${API_URL}/files`)
  if (!response.ok) {
    throw new Error('Dosyalar alınamadı.')
  }
  return response.json()
}

export function getDownloadUrl(filename) {
  return `${API_URL}/download/${filename}`
}
