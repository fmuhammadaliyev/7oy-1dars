import { Car } from "lucide-react";
import { Link } from "react-router-dom";

export const CarCard = ({ car }) => {
  return (
    <Link to={`/car/${car.id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
        <div className="relative h-48 flex items-center justify-center overflow-hidden group">
          {car.image ? (
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <Car className="w-32 h-32 text-gray-300" />
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {car.name}
              </h3>
              <p className="text-sm text-gray-500">{car.type}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-indigo-600">
                ${car.pricePerDay}
              </span>
              <p className="text-sm text-gray-500">per day</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
