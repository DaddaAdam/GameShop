import React from "react";

const Rating = ({ value, text }) => {
  return (
    <>
      <div className="rating">
        <span>
          <i
            className={
              value >= 1
                ? "fa-solid fa-star"
                : value >= 0.5
                ? "fa-solid fa-star-half-alt"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 2
                ? "fa-solid fa-star"
                : value >= 0.5
                ? "fa-solid fa-star-half-alt"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 3
                ? "fa-solid fa-star"
                : value >= 0.5
                ? "fa-solid fa-star-half-alt"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 4
                ? "fa-solid fa-star"
                : value >= 0.5
                ? "fa-solid fa-star-half-alt"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 5
                ? "fa-solid fa-star"
                : value >= 0.5
                ? "fa-solid fa-star-half-alt"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>{text && text}</span>
      </div>
    </>
  );
};

export default Rating;
