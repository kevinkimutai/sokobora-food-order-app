import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

import "./RowItems.css";

const RowItems = React.forwardRef(({ flag, items }, ref) => {
  return (
    <div
      ref={ref}
      className={`row ${flag === "true" ? "overflow" : "not-overflow"}`}
    >
      {items?.map((item, indx) => (
        <div className="item" key={indx}>
          <div className="item-image">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={item?.imageUrl}
              alt=""
            />
            <div>
              <MdShoppingBasket className="item-image__icon" />
            </div>
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
      ))}
    </div>
  );
});

export default RowItems;
