import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import { CarCard } from "../components/CarCard";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All vehicles");
  const [loading, setLoading] = useState(false);

  const fetchCars = async (category) => {
    setLoading(true);
    try {
      const url =
        category && category !== "All vehicles"
          ? `https://json-api.uz/api/project/fn44-amaliyot/cars?type=${category}`
          : "https://json-api.uz/api/project/fn44-amaliyot/cars";

      const res = await axios.get(url);
      setCars(res.data.data);
      setActiveCategory(category);
    } catch (err) {
      console.error(err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(activeCategory);
  }, []);

  const handleCategoryChange = (category) => {
    fetchCars(category);
  };

  return (
    <>
      <Header />
      <SelectCategory
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="all-cars">
        <div className="max-w-7xl mx-auto px-4 pb-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-xl font-semibold">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars?.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
