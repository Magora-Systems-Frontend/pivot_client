export function writeToLocalState(key, state): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    throw e;
  }
}

export function getFromLocalState(key: string): any {
  let state;

  try {
    state = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    state = {};
  }

  return state;
}

export function clearLocalState(key): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw e;
  }
}
