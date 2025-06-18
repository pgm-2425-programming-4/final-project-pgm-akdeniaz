export function saveToLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Failed saving to localStorage", err);
  }
}

export function getLocalData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed reading from localStorage", err);
    return null;
  }
}

export function removeFromLocal(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Failed removing from localStorage", err);
  }
}