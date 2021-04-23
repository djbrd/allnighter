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