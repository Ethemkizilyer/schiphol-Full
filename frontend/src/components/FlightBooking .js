import React, { useEffect, useReducer } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FlightCard from "./FlightCard";
import PromoCard from "./PromoCard";
import car from "../car.jpeg";
import hotels from "../hotelss.jpg";
import travel from "../travelPackages.png";
import useFlights from "../hooks/useFlights";

const initialState = {
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
  flights: [],
  selectedTrip: "roundTrip",
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_FLIGHTS":
      return {
        ...state,
        flights: action.payload,
      };
    case "SET_SELECTED_TRIP":
      return {
        ...state,
        selectedTrip: action.payload,
      };
    default:
      return state;
  }
}

const FlightBooking = () => {
  const { flights, fetchFlights } = useFlights("http://localhost:5000/api/flights/schiphol-flights");
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  useEffect(() => {
    dispatch({ type: "SET_FLIGHTS", payload: flights });
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = Object.entries(state)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    await fetchFlights(queryParams ? `?${queryParams}` : "");
  };

  const handleTripChange = (tripType) => {
    dispatch({ type: "SET_SELECTED_TRIP", payload: tripType });
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
                  state.selectedTrip === "roundTrip" ? "bg-purple-600" : "bg-white"
                }`}
                onClick={() => handleTripChange("roundTrip")}
              >
                <button
                  className={`${
                    state.selectedTrip === "roundTrip"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600"
                  }`}
                >
                  Round Trip
                </button>
              </div>
              <div
                className={`flex items-center space-x-2 border rounded-tr-3xl p-4 rounded-br-3xl cursor-pointer ${
                  state.selectedTrip === "oneWay" ? "bg-purple-600" : "bg-white"
                }`}
                onClick={() => handleTripChange("oneWay")}
              >
                <button
                  className={`${
                    state.selectedTrip === "oneWay"
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
                value={state.airline}
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
            <div className="flex justify-start items-start flex-col w-full lg:w-1/5 space-y-1  order-first md:order-first  lg:order-last sm:order-first  xl:order-last">
              <div className="flex items-start gap-1 flex-col justify-start p-2 w-full">
                <span className="text-gray-600">Sort by:</span>
                <select
                  name="sort"
                  value={state.scheduleTime}
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
                  value={state.flightDirection}
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
                  value={state.searchDateTimeField}
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
        <div className="xl:w-1/6 lg:w-1/6 md:w-1/6 space-y-6 w-full">
          <PromoCard title="CAR RENTALS" image={car} />
          <PromoCard title="HOTELS" image={hotels} />
          <PromoCard title="TRAVEL PACKAGES" image={travel} />
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
