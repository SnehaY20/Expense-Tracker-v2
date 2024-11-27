import React from "react";

const Category = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <label>Category</label>
      <select value={selectedCategory} onChange={onCategoryChange}>
        <option value="food">Food</option>
        <option value="travel">Travelling</option>
        <option value="shopping">Shopping</option>
        <option value="entertainment">Entertainment</option>
        <option value="healthcare">Healthcare</option>
        <option value="skincare">Skincare</option>
        <option value="groceries">Groceries</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default Category;
