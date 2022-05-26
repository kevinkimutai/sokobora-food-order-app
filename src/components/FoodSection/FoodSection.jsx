import React, { useRef } from "react";
import { useSelector } from "react-redux";

import "./FoodSection.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { motion } from "framer-motion";
import { RowItems } from "..";
const FoodSection = () => {
  const items = useSelector((state) => state.foodItems.foodItems);
  const scrollRef = useRef();

  const fruits = items?.filter((item) => item.category === "fruits");

  const scroll = (val) => {
    scrollRef.current.scrollLeft += val;
  };

  return (
    <section className="food-section">
      <div className="food-section__header">
        <div className="food-section__title">
          <h1>our fresh & healthy fruits</h1>
          <div />
        </div>
        <div className="food-section__buttons">
          <motion.button
            whileTap={{ scale: 0.65 }}
            onClick={() => {
              scroll(-200);
            }}
          >
            <MdChevronLeft className="buttons__scroll-icon" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.65 }}
            onClick={() => {
              scroll(200);
            }}
          >
            <MdChevronRight className="buttons__scroll-icon" />
          </motion.button>
        </div>
      </div>

      <RowItems flag="true" items={fruits} ref={scrollRef} />
    </section>
  );
};

export default FoodSection;
