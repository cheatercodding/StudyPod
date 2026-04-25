const API_BASE_URL = "http://127.0.0.1:5050";

export async function generateNote(topic) {
  const response = await fetch(API_BASE_URL + "/api/notes/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Not oluþturulamadý.");
  }

  return data;
}

export async function assistNote(text) {
  const response = await fetch(API_BASE_URL + "/api/notes/assist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Not düzenlenemedi.");
  }

  return data;
}
