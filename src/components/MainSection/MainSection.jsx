import { motion } from "framer-motion";
import { React, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./MainSection.css";

const MainSection = () => {
  const [randomFood, setRandomFood] = useState();
  const items = useSelector((state) => state.foodItems.foodItems);

  const getRandomFoodItems = (arr) => {
    if (arr) {
      let foodItems = [];
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * arr?.length);
        const item = arr[randomIndex];
        if (foodItems.find((food) => food.name === item.name)) {
          const randomIndex = Math.floor(Math.random() * arr?.length);
          const uniqueItem = arr[randomIndex];
          foodItems.push(uniqueItem);
        } else {
          foodItems.push(item);
        }
      }
      setRandomFood(foodItems);
    } else {
      return;
    }
  };

  useEffect(() => {
    getRandomFoodItems(items);

    return getRandomFoodItems;
  }, [items]);

  return (
    <div className="main">
      <div className="main__title-container">
        <div className="main__delivery">
          <p>Bike delivery</p>
          <div className="main__delivery-img">
            <img src="/images/delivery.png" alt="delivery" />
          </div>
        </div>
        <h1 className="main__heading">
          The Fastest Delivery in <span>your city</span>
        </h1>
        <p className="main-heading-paragraph">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and ...
        </p>
        <button>order now</button>
      </div>
      <div className="main__food-items-container">
        <div className="main__food-items-img ">
          <img src="/images/heroBg.png" alt=""></img>
        </div>
        <div className="main__foods-container">
          {randomFood &&
            randomFood?.map((food, index) => (
              <div className="main__food-item" key={index}>
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={food.imageUrl}
                  alt=""
                />
                <div>
                  <p className="food-item__category">{food.category}</p>
                  <p className="food-item__name">{food.name}</p>
                  <p className="food-item__price">
                    <span>$</span>
                    {food.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
