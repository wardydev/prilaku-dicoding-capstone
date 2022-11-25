function putJsonToken(token) {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem("TOKEN", token);
  }
}
function getJsonToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("TOKEN");
  }
}
function putUserInfo(users) {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem("DATAUSERS", users);
  }
}
function getUserInfo() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("DATAUSERS");
  }
}

function formatDate(date) {
  return date.toLocaleDateString("in", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export { putJsonToken, getJsonToken, formatDate, putUserInfo, getUserInfo };
