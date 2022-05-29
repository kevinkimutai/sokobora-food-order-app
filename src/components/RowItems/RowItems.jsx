import React from "react";

import { useDispatch } from "react-redux";

import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

import "./RowItems.css";
import { cartActions } from "../../app/cartItemsReducer";

const RowItems = React.forwardRef(({ flag, items }, ref) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    //set cart item to local Storage
    let data = [];
    data = JSON.parse(localStorage.getItem("cart")) || [];

    const matched = data.filter((items) => items.name === item.name);

    if (matched.length > 0) {
      localStorage.setItem("cart", JSON.stringify(data));
    } else {
      data.push(item);
      localStorage.setItem("cart", JSON.stringify(data));
    }

    //set quantity to localStorage
    const updatedData = JSON.parse(localStorage.getItem("cart"));
    const qty = updatedData.length;

    localStorage.setItem("quantity", JSON.stringify(qty));

    //set data into redux store
    dispatch(cartActions.addToCart(item));
  };

  return (
    <div
      ref={ref}
      className={`row ${flag === "true" ? "overflow" : "not-overflow"}`}
    >
      {items && items.length > 0 ? (
        items?.map((item, indx) => (
          <div className="item" key={indx}>
            <div className="item-image">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={item?.imageUrl}
                alt=""
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => {
                  addToCartHandler(item);
                }}
              >
                <MdShoppingBasket className="item-image__icon" />
              </motion.div>
            </div>

            <div className="item-details">
              <h2>{item?.name}</h2>
              <h3>/per kg</h3>
              <p>
                <span>$</span>
                {item?.price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="row__not-found">
          <img src="/images/NotFound.svg" alt="not found" />
          <p>Sorry, no items for now. Try again soon!</p>
        </div>
      )}
    </div>
  );
});

export default RowItems;
