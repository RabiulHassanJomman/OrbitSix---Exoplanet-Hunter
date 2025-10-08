// Lightweight API client for backend connectivity
// If REACT_APP_API_BASE_URL is not set, use relative URLs and rely on CRA proxy in development.

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function manualPredict(payload) {
  const url = API_BASE_URL
    ? `${API_BASE_URL}/manual-predict`
    : "/manual-predict";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`manual-predict failed: ${res.status}`);
  return res.json();
}

export async function uploadRaw(file) {
  const form = new FormData();
  form.append("file", file);
  const url = API_BASE_URL ? `${API_BASE_URL}/raw-data` : "/raw-data";
  const res = await fetch(url, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`raw-data failed: ${res.status}`);
  return res.json();
}

export async function fetchReason(id) {
  const base = API_BASE_URL || "";
  const res = await fetch(`${base}/reason?id=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`reason fetch failed: ${res.status}`);
  return res.json();
}

export function lightcurveImageUrl(id) {
  const base = API_BASE_URL || "";
  return `${base}/lightcurve?id=${encodeURIComponent(id)}`;
}

export async function deleteLightcurve(id) {
  const base = API_BASE_URL || "";
  const res = await fetch(`${base}/lightcurve?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`lightcurve delete failed: ${res.status}`);
  return res.json();
}

export async function uploadCSV(file) {
  const form = new FormData();
  form.append("file", file);
  const url = API_BASE_URL ? `${API_BASE_URL}/predict-csv` : "/predict-csv";
  const res = await fetch(url, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`predict-csv failed: ${res.status}`);
  return res.json();
}
