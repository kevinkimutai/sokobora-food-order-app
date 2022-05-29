import { React, useState } from "react";
import { HeadingTitle, RowItems } from "..";
import { useSelector } from "react-redux";

import { MdFastfood } from "react-icons/md";

import { motion } from "framer-motion";
import { categories } from "../../utils/data";

import "./FilterSection.css";

const FilterSection = () => {
  const [category, setCategory] = useState("chicken");
  const items = useSelector((state) => state.foodItems.foodItems);

  return (
    <div className="filter-section">
      <div className="filter-section__header">
        <HeadingTitle title={"Our hot dishes"} />
      </div>
      <div className="filter-section__buttons ">
        {categories.map((item) => (
          <motion.div
            whileTap={{ scale: 0.85 }}
            className={`filter-section__button ${
              category === item.urlParamName ? "active" : ""
            }`}
            key={item.id}
            onClick={() => {
              setCategory(item.urlParamName);
            }}
          >
            <div>
              <MdFastfood className="filter-section__button-icon" />
            </div>
            <p>{item.urlParamName}</p>
          </motion.div>
        ))}
      </div>
      <div className="w">
        <RowItems
          flag="false"
          items={items?.filter((item) => item.category === category)}
        />
      </div>
    </div>
  );
};

export default FilterSection;
