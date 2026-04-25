const API_BASE_URL = "http://127.0.0.1:5050";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_BASE_URL + "/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Dosya yüklenemedi.");
  }

  return data;
}

export async function getUploadedFiles() {
  const response = await fetch(API_BASE_URL + "/files");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Dosyalar alýnamadý.");
  }

  return data;
}

export function getDownloadUrl(filename) {
  return API_BASE_URL + "/download/" + filename;
}
