import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdAdd, MdArrowBack, MdDelete, MdRemove } from "react-icons/md";

import { AnimatePresence, motion } from "framer-motion";
import { showCartActions } from "../../app/showCartSlice";

import "./CartSection.css";

const CartSection = () => {
  const dispatch = useDispatch();

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
          <motion.div whileTap={{ scale: 0.7 }}>
            clear
            <MdDelete className="cart-header__icon" />
          </motion.div>
        </div>
        <div className="cart-section__items-container">
          <div className="cart-section__items">
            <div className="cart-section__item">
              <div className="cart-section__item-details">
                <img src="/images/r1.png" alt="" />
                <div>
                  <p>Chocolate Vanilla</p>
                  <p>
                    <span>$</span> 43
                  </p>
                </div>
              </div>
              <div className="cart-section__item-quantity">
                <MdRemove className="quantity-icon" />4
                <MdAdd className="quantity-icon" />
              </div>
            </div>
          </div>
          <div className="total-container">
            <div className="total__total-fee">
              <h2>Sub-total</h2>
              <p>
                <span>$</span>
                40
              </p>
            </div>
            <div className="total__total-fee">
              <h2>Delivery-total</h2>
              <p>
                <span>$</span>
                40
              </p>
            </div>
            <div className="total">
              <div className="total__details">
                <h1>TOTAL</h1>
                <p>$40</p>
              </div>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartSection;
