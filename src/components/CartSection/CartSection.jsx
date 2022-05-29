import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdAdd, MdArrowBack, MdDelete, MdRemove } from "react-icons/md";

import { AnimatePresence, motion } from "framer-motion";
import { showCartActions } from "../../app/showCartSlice";

import "./CartSection.css";
import { cartActions } from "../../app/cartItemsReducer";

const DELIVERY_FEE = 2.5;

const CartSection = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const user = useSelector((state) => state.user.user);

  const calculateTotal = (arr) => {
    const sum = arr?.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.qty * +currentValue.price;
    }, 0);
    setTotalPrice(sum);
  };

  useEffect(() => {
    calculateTotal(cartItems);

    return calculateTotal;
  }, [cartItems]);

  const addQty = (item) => {
    let data = [];
    data = JSON.parse(localStorage.getItem("cart")) || [];

    const matchedIndx = data.findIndex((cart) => cart.name === item.name);

    console.log(matchedIndx);
    const matched = data.find((cart) => cart.name === item.name);
    matched.qty++;

    data[matchedIndx] = matched;

    localStorage.setItem("cart", JSON.stringify(data));

    dispatch(cartActions.addToCart());
  };
  const reduceQty = (item) => {
    let data = [];
    data = JSON.parse(localStorage.getItem("cart")) || [];

    console.log(data);
    const matchedIndx = data.findIndex((cart) => cart.name === item.name);
    const matched = data.find((cart) => cart.name === item.name);

    if (+item.qty === 1) {
      console.log(data);
      console.log(data.splice(matchedIndx, 1));

      localStorage.setItem("cart", JSON.stringify(data.splice(matchedIndx, 1)));
    } else {
      matched.qty--;
      data[matchedIndx] = matched;

      localStorage.setItem("cart", JSON.stringify(data));
    }
    dispatch(cartActions.addToCart());
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("quantity");

    dispatch(cartActions.addToCart());
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="cart-section"
      >
        <div className="cart-header">
          <motion.div
            whileTap={{ scale: 0.7 }}
            onClick={() => {
              dispatch(showCartActions.show());
            }}
          >
            <MdArrowBack className="cart-header__icon" />
          </motion.div>

          <h2>cart</h2>
          <motion.div whileTap={{ scale: 0.7 }} onClick={clearCart}>
            clear
            <MdDelete className="cart-header__icon" />
          </motion.div>
        </div>
        {cartItems && cartItems.length > 0 ? (
          <div className="cart-section__items-container">
            <div className="cart-section__items">
              {cartItems &&
                cartItems.map((cart, indx) => (
                  <div className="cart-section__item" key={indx}>
                    <div className="cart-section__item-details">
                      <img src={cart.imageUrl} alt="" />
                      <div>
                        <p>{cart.name}</p>
                        <p>
                          <span>$</span> {cart.price}
                        </p>
                      </div>
                    </div>
                    <div className="cart-section__item-quantity">
                      <MdRemove
                        className="quantity-icon"
                        onClick={() => {
                          reduceQty(cart);
                        }}
                      />
                      {cart.qty}
                      <MdAdd
                        className="quantity-icon"
                        onClick={() => {
                          addQty(cart);
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="total-container">
              <div className="total__total-fee">
                <h2>Sub-total</h2>
                <p>
                  <span>$</span>
                  {totalPrice}
                </p>
              </div>
              <div className="total__total-fee">
                <h2>Delivery-total</h2>
                <p>
                  <span>$</span>
                  {DELIVERY_FEE}
                </p>
              </div>
              <div className="total">
                <div className="total__details">
                  <h1>TOTAL</h1>
                  <p>${totalPrice + DELIVERY_FEE}</p>
                </div>

                <motion.button whileTap={{ scale: 0.75 }}>
                  {user ? "Checkout" : "Login to checkout"}
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-section__image">
            <img src="images/NotFound.svg" alt="" />
            <p>No Items in your cart,continue shopping</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartSection;
