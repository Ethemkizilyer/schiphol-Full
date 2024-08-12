import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import car from "../car.jpeg";
import hotels from "../hotelss.jpg";
import travel from "../travelPackages.png";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FlightCard from "./FlightCard";
import PromoCard from "./PromoCard";

const FlightBooking = () => {
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    origin: "",
    destination: "",
    status: "",
    route: "",
    searchDateTimeField: "",
    airline: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/flights/schiphol-flights"
        );
        setFlights(response?.data?.flights);
        console.log("Flights:", response.data.flights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = [];

    if (formData.flightNumber)
      queryParams.push(`flightNumber=${formData.flightNumber}`);
    if (formData.departureDate)
      queryParams.push(`departureDate=${formData.departureDate}`);
    if (formData.departureTime)
      queryParams.push(`departureTime=${formData.departureTime}`);
    if (formData.arrivalTime)
      queryParams.push(`arrivalTime=${formData.arrivalTime}`);
    if (formData.origin) queryParams.push(`origin=${formData.origin}`);
    if (formData.fromDateTime)
      queryParams.push(`fromDateTime=${formData.fromDateTime}:24`);
    if (formData.toDateTime)
      queryParams.push(`toDateTime=${formData.toDateTime}:24`);
    if (formData.destination)
      queryParams.push(`destination=${formData.destination}`);
    if (formData.status) queryParams.push(`status=${formData.status}`);
    if (formData.sort) queryParams.push(`sort=${formData.sort}`);
    if (formData.flightDirection)
      queryParams.push(`flightDirection=${formData.flightDirection}`);
    if (formData.airline) queryParams.push(`airline=${formData.airline}`);
    if (formData.searchDateTimeField)
      queryParams.push(`searchDateTimeField=${formData.searchDateTimeField}`);

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    try {
      const response = await axios.get(
        `http://localhost:5000/api/flights/schiphol-flights${queryString}`
      );

      setFlights(response.data.flights);
      toast.success("Flight data fetched successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  const [selectedTrip, setSelectedTrip] = useState("roundTrip");

  const handleTripChange = (i) => {
    setSelectedTrip(i);
  };
  return (
    <div className="bg-purple-50 min-h-screen  p-3">
      <header className="flex justify-between items-center py-4">
        <div className="text-xl font-bold text-purple-800">PLANE SCAPE</div>
        <div className="flex items-center space-x-4">
          <span
            className="text-white shadow-lg cursor-pointer p-1 rounded-lg bg-purple-500 hover:bg-purple-100 hover:text-purple-600"
            onClick={() => navigate("/my-flights")}
          >
            My Book
          </span>
          <span className="text-purple-600">Discover</span>
          <div className="flex items-center space-x-2">
            <AiOutlineUser size={24} className="text-purple-800" />
            <span className="text-purple-800">Ethem KIZILYER</span>
          </div>
        </div>
      </header>

      <div className="flex space-x-6 flex-wrap">
        {/* Flight Search Form */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4 ">BOOK YOUR FLIGHT</h2>
            <div className="flex space-x-1 mb-6">
              <div
                className={`flex items-center space-x-2 border rounded-tl-3xl p-4 rounded-bl-3xl cursor-pointer ${
                  selectedTrip === "roundTrip" ? "bg-purple-600" : "bg-white"
                }`}
                onClick={() => handleTripChange("roundTrip")}
              >
                <button
                  className={`${
                    selectedTrip === "roundTrip"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600"
                  }`}
                >
                  Round Trip
                </button>
              </div>
              <div
                className={`flex items-center space-x-2 border rounded-tr-3xl p-4 rounded-br-3xl cursor-pointer ${
                  selectedTrip === "oneWay" ? "bg-purple-600" : "bg-white"
                }`}
                onClick={() => handleTripChange("oneWay")}
              >
                <button
                  className={`${
                    selectedTrip === "oneWay"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600"
                  }`}
                >
                  One Way
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-1">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Airline"
                className="p-2 border rounded-2xl"
                name="airline"
                value={formData.airline}
                onChange={handleChange}
              />
            </div>
            <div className="flex col-span-2 gap-1">
              <div className="relative">
                <FaPlaneDeparture
                  size={16}
                  className="text-purple-500 absolute top-[25%] left-2"
                />
                <input
                  type="text"
                  placeholder="From"
                  className="col-span-1 py-2 border rounded-tl-2xl ps-7 rounded-bl-2xl"
                />
              </div>
              <div className="relative">
                <FaPlaneArrival
                  size={16}
                  className="text-purple-500 absolute top-[25%] left-2"
                />
                <input
                  type="text"
                  placeholder="To"
                  className="col-span-1 py-2 border rounded-tr-2xl ps-7 rounded-br-2xl"
                />
              </div>
            </div>
            <div className="flex col-span-2 gap-1">
              <input
                type="datetime-local"
                name="fromDateTime"
                className="col-span-1 p-2 border rounded-tl-2xl rounded-bl-2xl"
                onChange={handleChange}
              />
              <input
                type="datetime-local"
                name="toDateTime"
                className="col-span-1 p-2 border rounded-tr-2xl rounded-br-2xl"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white mt-4 px-6 py-2 rounded-md"
          >
            Show Flights
          </button>
          <div className="flex flex-col lg:flex-row lg:space-x-6 overflow-hidden h-[59vh]">
            {/* Flight Cards */}
            <div className="space-y-8 flex-1 bg-white rounded-xl p-6 shadow-lg overflow-y-auto order-last sm:order-last md:order-last lg:order-last xl:order-first">
              {flights.length > 0 ? (
                flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))
              ) : (
                <p>No flights available for the selected criteria.</p>
              )}
            </div>
            {/* Filter & Sort Section */}
            <div className="flex justify-start items-start flex-col w-full lg:w-1/5 space-y-1  order-first md:order-first  lg:order-last sm:order-first xs:order-first xl:order-last">
              <div className="flex items-start gap-1 flex-col justify-start p-2 w-full">
                <span className="text-gray-600">Sort by:</span>
                <select
                  name="sort"
                  value={formData.scheduleTime}
                  onChange={handleChange}
                  className="border rounded-md w-full"
                >
                  <option value=""></option>
                  <option value="+scheduleTime">Schedule Time</option>
                  <option value="+lastUpdatedAt">Last Update At</option>
                  <option value="+actualLandingTime">
                    Actual Landing Time
                  </option>
                </select>
              </div>

              <div className="flex items-start gap-1 flex-col justify-start p-2 w-full">
                <span className="text-gray-600">Flight Direction:</span>
                <select
                  name="flightDirection"
                  value={formData.flightDirection}
                  onChange={handleChange}
                  className="border rounded-md w-full"
                >
                  <option value=""></option>
                  <option value="A">Arrival</option>
                  <option value="D">Departure</option>
                </select>
              </div>

              <div className="flex items-start gap-1 flex-col justify-start p-2 w-full">
                <span className="text-gray-600">Search Date Time Field:</span>
                <select
                  name="searchDateTimeField"
                  value={formData.searchDateTimeField}
                  onChange={handleChange}
                  className="border rounded-md w-full"
                >
                  <option value=""></option>
                  <option value="estimatedLandingTime">
                    Estimated Landing Time
                  </option>
                  <option value="actualLandingTime">Actual Landing Time</option>
                  <option value="expectedTimeBoarding">
                    Expected Time Boarding
                  </option>
                  <option value="expectedTimeGateClosing">
                    Expected Time Gate Closing
                  </option>
                  <option value="expectedTimeGateOpen">
                    Expected Time Gate Open
                  </option>
                  <option value="lastUpdatedAt">Last Updated At</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Section */}
        <div className="w-1/6 space-y-6">
          <PromoCard title="CAR RENTALS" image={car} />
          <PromoCard title="HOTELS" image={hotels} />
          <PromoCard title="TRAVEL PACKAGES" image={travel} />
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
