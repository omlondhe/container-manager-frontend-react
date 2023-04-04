export function getDomain() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ""
    : "https://127.0.0.1:5000";
}
