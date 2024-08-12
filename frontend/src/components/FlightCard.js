import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";
import axios from "axios";
import cities from "../cities.json";
import TimeDifferenceCalculator from "../lib/DateCalculator";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const FlightCard = ({ flight }) => {
    const [convertedCity, setConvertedCity] = useState("");
    const navigate = useNavigate();
    // origin="Milano"
    // destination="Madrid"
    // departureTime="7:30 AM"
    // arrivalTime="9:55 AM"
    // price="$200"
    // flightDuration="2h 25m"
    const countryConverter = (code) => {
      setConvertedCity(
        cities.filter((city) => {
          return city?.code === code;
        })
      );
    };
  
    useEffect(() => {
      countryConverter(flight?.route?.destinations[0]);
    }, []);
  
    const handleBookFlight = async () => {
      const flightDate = new Date(flight?.scheduleTime);
      const currentDate = new Date();
  
      if (flightDate < currentDate) {
        alert("You cannot book a flight for a past date.");
        return;
      }
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/flights/book-flight",
          flight
        );
  
        if (response.data.success) {
          toast.success("Flight booked successfully!", {
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
          navigate("/my-flights");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message, {
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
  
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg relative">
        <div className="flex flex-col justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              {flight?.flightDirection !== "A" && "Schiphol Zuid - "}
              {convertedCity.length > 0
                ? convertedCity[0]?.city.replace(/\d/g, "")
                : flight?.route?.destinations[0]}{" "}
              {flight?.flightDirection === "A" && " - Schiphol Zuid"}
            </h3>
          </div>
          <div className="flex space-x-6 justify-between items-center">
            <div className="text-center flex flex-col justify-center items-center">
              <FaPlaneDeparture size={24} className="text-purple-500" />
              <p className="text-sm">
                {moment(flight?.estimatedLandingTime).format(
                  "DD.MM.YYYY hh:mm:ss"
                )}
              </p>
            </div>
            <div className="w-full h-[2px] bg-purple-400"></div>
            <div className="text-center flex flex-col justify-center items-center">
              <FaPlane size={24} className="text-purple-500" />
              <p className="text-sm text-gray-500">
                <TimeDifferenceCalculator
                  estimatedLandingTime={flight?.estimatedLandingTime}
                  expectedTimeOnBelt={flight?.expectedTimeOnBelt}
                />
              </p>
            </div>
            <div className="w-full h-[2px] bg-purple-400"></div>
            <div className="text-center flex flex-col justify-center items-center">
              <FaPlaneArrival size={24} className="text-purple-500 text-center" />
              <p className="text-sm">
                {moment(flight?.expectedTimeOnBelt).format("DD.MM.YYYY hh:mm:ss")}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap">
            <div className="text-right">
              <p className="text-lg text-purple-600 font-bold">Price:$200</p>
              <p className="text-sm text-gray-500">Round Trip</p>
            </div>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-md"
              onClick={handleBookFlight}
            >
              Book Flight
            </button>
          </div>
        </div>
        <span className="absolute cursor-pointer -bottom-8 left-0 bg-purple-400 px-2 pt-0.5 pb-2 rounded-bl-2xl rounded-br-2xl text-white">
          <u>Check the details</u>
        </span>
      </div>
    );
  };

  export default FlightCard