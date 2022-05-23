import React from "react";

import "./MainSection.css";

const foodsData = [
  {
    image: "i1.png",
    category: "ice cream",
    name: "chocolate moose",
    price: 350,
  },
  {
    image: "f3.png",
    category: "vegetables",
    name: "avocado",
    price: 350,
  },
  {
    image: "fi5.png",
    category: "snawitch",
    name: "ham",
    price: 350,
  },
  {
    image: "r3.png",
    category: "fruits",
    name: "strawberrys",
    price: 350,
  },
];

const MainSection = () => {
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
          {foodsData.map((food, index) => (
            <div className="main__food-item" key={index}>
              <img src={`/images/${food.image}`} alt="food 1" />
              <div>
                <p className="food-item__category">{food.category}</p>
                <p className="food-item__name">{food.name}</p>
                <p className="food-item__price">
                  <span>kshs</span>
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
