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
