function putJsonToken(token) {
  return localStorage.setItem("TOKEN", token);
}
function getJsonToken() {
  return localStorage.getItem("TOKEN");
}
function putUserInfo(users) {
  return localStorage.setItem("DATAUSERS", users);
}
function getUserInfo() {
  return localStorage.getItem("DATAUSERS");
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
