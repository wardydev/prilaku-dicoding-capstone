function putUserInfo(userInfo) {
  return localStorage.setItem("userInfo", userInfo);
}
function getUserInfo() {
  return localStorage.getItem("userInfo");
}

export { putUserInfo, getUserInfo };
