function putUserInfo(userInfo) {
  return localStorage.setItem("userInfo", userInfo);
}
function getUserInfo() {
  return localStorage.getItem("userInfo");
}

function formatDate(date) {
  return date.toLocaleDateString("in", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export { putUserInfo, getUserInfo, formatDate };
