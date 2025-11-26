import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, notification } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Edit() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, { description }) => {
    api[type]({ description });
  };

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const axios = useAxios();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [drive, setDrive] = useState(null);
  const [gearbox, setGearbox] = useState(null);

  const getSingleCar = async (id) => {
    let data = await axios({ url: `cars/${id}` });
    if (data && data.data) {
      setCar(data.data);
      setGallery(data.data.gallery || []);
      setDrive(data.data.drive);
      setGearbox(data.data.gearbox);
    }
  };

  async function editCar(carData) {
    await axios({
      url: `cars/${id}`,
      method: "PATCH",
      body: carData,
    });

    openNotificationWithIcon("success", {
      description: "Car data updated successfully",
    });

    setTimeout(() => navigate(-1), 1500);
  }

  function addImage() {
    const img = prompt("Enter image URL");
    try {
      new URL(img);
      setGallery((prev) => [...prev, img]);
    } catch (error) {
      alert("Invalid image URL");
    }
  }

  function handleGallery(url) {
    setGallery(gallery.filter((el) => el !== url));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const result = { gearbox, drive, gallery };

    formData.forEach((value, key) => {
      result[key] = value;
    });

    editCar(result);
  }

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  if (!car) return null;

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen py-12">
      {contextHolder}
      <div className="container mx-auto px-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          ← Back
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 space-y-10 transition-transform hover:-translate-y-1"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Edit Car Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="font-semibold mb-2 text-gray-700"
              >
                Car Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={car.name}
                placeholder="Car Name"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="pricePerDay"
                className="font-semibold mb-2 text-gray-700"
              >
                Daily Rent ($)
              </label>
              <input
                type="number"
                name="pricePerDay"
                id="pricePerDay"
                defaultValue={car.pricePerDay}
                min={1}
                max={1000}
                placeholder="Price per day"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fuel"
                className="font-semibold mb-2 text-gray-700"
              >
                Fuel Type
              </label>
              <input
                type="text"
                name="fuel"
                id="fuel"
                defaultValue={car.fuel}
                placeholder="Fuel Type"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="drive"
                className="font-semibold mb-2 text-gray-700"
              >
                Drive Type
              </label>
              <select
                name="drive"
                id="drive"
                value={drive}
                onChange={(e) => setDrive(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
              >
                <option value="AWD">AWD</option>
                <option value="RWD">RWD</option>
                <option value="FWD">FWD</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="gearbox"
                className="font-semibold mb-2 text-gray-700"
              >
                Gearbox Type
              </label>
              <select
                name="gearbox"
                id="gearbox"
                value={gearbox}
                onChange={(e) => setGearbox(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold mb-3 block text-gray-700">
              Gallery Images
            </label>
            <div className="flex flex-wrap gap-4">
              {gallery.map((el, index) => (
                <div
                  key={index}
                  className="relative w-28 h-28 rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 transition"
                >
                  <img
                    src={el}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleGallery(el)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                  >
                    <TrashIcon className="w-6 h-6 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition transform hover:scale-105"
              >
                <PlusCircledIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            className="w-full md:w-64 py-3 rounded-2xl text-lg font-semibold mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 shadow-lg transition-all duration-300 flex justify-center"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
