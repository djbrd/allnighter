export const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = resolve;
    script.onerror = reject;
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  });
};

export const setErrorsFromResponse = (response, setError) => {
  if (response.status === 422) {
    for (const fieldKey in response.data) {
      const msg = response.data[fieldKey];
      setError(fieldKey, { type: "manual", message: msg });
    }
  } else if (response.status === 401) {
    // TODO: set error on form
    // setError("password", { type: "manual", message: "Invalid password" });
    console.log("401: ", response);
  } else if (response.status === 500) {
    // TODO - show a snackbar?
    console.log("500: ", response);
  }
};

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // do nothing
  }
};

export const clearState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // do nothing
  }
};
