import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image, Button } from "antd";
import useAxios from "../hooks/useAxios";
import Header from "../components/header/Header";
import { HashLoader } from "react-spinners";
import { notification } from "antd";

const CarDetail = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, { description }) => {
    api[type]({ description });
  };

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  const getSingleCar = async (id) => {
    setLoading(true);
    try {
      let data = await axios({ url: `cars/${id}` });
      if (data && data.data) {
        setCar(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  async function handleDelete(id) {
    await axios({ url: `cars/${id}`, method: "DELETE" });

    openNotificationWithIcon("success", {
      description: "Car deleted successfully",
    });

    setTimeout(() => navigate(-1), 1500);
  }

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!car) return null;

  return (
    <>
      <Header />
      {contextHolder}

      <div className="min-h-screen bg-white pb-10 pt-6">
        <div className="max-w-7xl mx-auto px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-lg text-white bg-blue-600 border border-blue-600 px-4 py-1 rounded-xl shadow-sm hover:bg-blue-700 transition"
          >
            ← Back
          </button>

          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 mt-6 space-y-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {car.name}
              </h1>
              <p className="text-5xl font-extrabold text-blue-600">
                ${car.pricePerDay}
              </p>
              <p className="text-gray-500 text-2xl -mt-2">per day</p>
            </div>

            <div className="rounded-3xl overflow-hidden relative border border-gray-100 shadow-md group">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-72 object-cover transition-all duration-300 group-hover:brightness-75"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
              <Image.PreviewGroup>
                {car.gallery?.filter(Boolean).map((img, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-200"
                  >
                    <Image
                      src={img}
                      alt="#"
                      className="w-full !h-24 object-cover"
                    />
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate(`/edit/${id}`)}
                className="w-1/2 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(id)}
                className="w-1/2 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                ["Gear Box", car.details?.gearbox],
                ["Fuel", car.details?.fuel],
                ["Doors", car.details?.doors],
                ["Air Conditioner", car.details?.airConditioner],
                ["Seats", car.details?.seats],
                ["Distance", car.details?.distance],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-5 text-center shadow-inner border border-gray-100"
                >
                  <p className="font-semibold text-gray-900 text-lg">{label}</p>
                  <p className="text-gray-600 text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ...(car.equipment?.safety || []),
                ...(car.equipment?.comfort || []),
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-inner"
                >
                  <span className="text-green-600 text-xl">✔</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
