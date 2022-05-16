export const fetchData = () => {
  let data;

  if (localStorage.getItem("user") !== "undefined") {
    data = localStorage.getItem("user");
  } else {
    data = localStorage.clear();
  }

  return JSON.parse(data);
};
