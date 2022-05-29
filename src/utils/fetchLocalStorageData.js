export const fetchData = () => {
  let data;

  if (localStorage.getItem("user") !== "undefined") {
    data = localStorage.getItem("user");
  } else {
    data = localStorage.clear();
  }

  return JSON.parse(data);
};

//Fetch Cart Data

export const fetchCart = () => {
  let data;

  if (localStorage.getItem("cart") !== "undefined") {
    data = localStorage.getItem("cart");
  } else {
    data = localStorage.removeItem("cart");
  }

  return JSON.parse(data);
};

export const fetchQty = () => {
  let data;

  if (localStorage.getItem("quantity") !== "undefined") {
    data = localStorage.getItem("quantity");
  } else {
    data = localStorage.removeItem("quantity");
  }

  return JSON.parse(data);
};
