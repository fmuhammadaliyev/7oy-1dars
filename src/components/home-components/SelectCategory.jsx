import axios from "axios";
import { useEffect, useState } from "react";

const SelectCategory = ({
  onCategoryChange,
  activeCategory,
  setActiveCategory,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://json-api.uz/api/project/fn44-amaliyot/cars"
        );
        const cars = res.data.data;
        const uniqueTypes = [
          "All vehicles",
          ...new Set(cars.map((car) => car.type)),
        ];
        setCategories(uniqueTypes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="category">
      <div className="mycon flex flex-col gap-4 py-8">
        <h5 className="text-center text-3xl">Select a vehicle group</h5>
        <div className="w-full md:w-[80%] mx-auto flex flex-wrap items-center justify-center gap-3">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-3 rounded-3xl font-semibold transition duration-300
  ${
    activeCategory === category
      ? "bg-purple-500 text-white"
      : "bg-[#c0c0c0] text-black hover:bg-[#5937e0] hover:text-white"
  }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectCategory;
