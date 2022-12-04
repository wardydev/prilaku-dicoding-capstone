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
  return date.toLocaleDateString("en-UK", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function subtractDays(numOfDays, date) {
  date.setDate(date.getDate() - numOfDays);

  return date.toLocaleString();
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function formatterDateToObject(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return {
    day: parseInt(dd),
    month: mm,
    year: yyyy,
  };
}

export {
  putJsonToken,
  getJsonToken,
  formatDate,
  putUserInfo,
  getUserInfo,
  subtractDays,
  getWindowSize,
  formatterDateToObject,
};
