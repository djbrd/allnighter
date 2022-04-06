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
    if (response.data.error) {
      setError("form", {
        type: "manual",
        message: response.data.error,
      });
    } else {
      for (const fieldKey in response.data) {
        console.log(fieldKey);
        const msg = response.data[fieldKey];
        setError(fieldKey, { type: "manual", message: msg });
      }
    }
  } else if (response.status === 401) {
    console.log("401: ", response);
    setError("form", { type: "manual", message: "Not authorized" });
  } else if (response.status === 500) {
    console.log("500: ", response);
    setError("form", {
      type: "manual",
      message: "500 error. Please try again later.",
    });
  } else if (response.status === 404) {
    console.log("404: ", response);
    setError("form", {
      type: "manual",
      message: "404 error. Please try again later.",
    });
  } else {
    console.log("WHAT? ", response);
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
