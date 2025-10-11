// Lightweight API client for backend connectivity
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function manualPredict(payload) {
  const url = `${API_BASE_URL}/manual-predict`;
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
  const url = `${API_BASE_URL}/predict-csv`;
  const res = await fetch(url, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`predict-csv failed: ${res.status}`);
  return res.json();
}

export const getReasoning = async (predictionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reason?id=${predictionId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("reasoning:", data.reason);
    return data.reason;
  } catch (error) {
    console.error("Error fetching reasoning:", error);
    return null;
  }
};

export async function getNameSuggestion(mission, nameQuery) {
  const url = `${API_BASE_URL}/name-suggestion?mission=${encodeURIComponent(
    mission
  )}&name_query=${encodeURIComponent(nameQuery)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`name-suggestion failed: ${res.status}`);
  return res.json();
}

export async function getDatasetPrediction(mission, nameQuery) {
  const url = `${API_BASE_URL}/dataset-prediction?mission=${encodeURIComponent(
    mission
  )}&name_query=${encodeURIComponent(nameQuery)}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Planet data not found");
    }
    throw new Error(`dataset-prediction failed: ${res.status}`);
  }
  return res.json();
}
