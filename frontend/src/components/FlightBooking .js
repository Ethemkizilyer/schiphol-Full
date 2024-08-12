import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import car from "../car.jpeg";
import hotels from "../hotelss.jpg";
import travel from "../travelPackages.png";
import cities from "../cities.json";
import TimeDifferenceCalculator from "../lib/DateCalculator";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const FlightBooking = () => {
  const [flights, setFlights] = useState([]);

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
  });

  const handleChange = (e) => {
    console.log("ETHE", e.target.name, e.target.value);
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
      toast.error("Error fetching flight data:", error, {
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
  const [selectedTrip, setSelectedTrip] = useState('roundTrip');

  const handleTripChange = (i) => {
    setSelectedTrip(i);
  };
  return (
    <div className="bg-purple-50 min-h-screen  p-3">
      <header className="flex justify-between items-center py-4">
        <div className="text-xl font-bold text-purple-800">PLANE SCAPE</div>
        <div className="flex items-center space-x-4">
          <span
            className="text-purple-600 shadow-lg cursor-pointer p-1 rounded-lg hover:bg-blue-500 hover:text-white"
            onClick={() => navigate("/my-flights")}
          >
            My Book
          </span>
          <span className="text-purple-600">Discover</span>
          <div className="flex items-center space-x-2">
            <AiOutlineUser size={24} className="text-purple-800" />
            <span className="text-purple-800">Joanne Smith</span>
          </div>
        </div>
      </header>

      <div className="flex space-x-6 flex-wrap">
        {/* Flight Search Form */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4 ">BOOK YOUR FLIGHT</h2>
            <div className="flex space-x-1 mb-6">
      <div className={`flex items-center space-x-2 border rounded-tl-3xl p-4 rounded-bl-3xl cursor-pointer ${selectedTrip === 'roundTrip' ? 'bg-purple-600' : 'bg-white'}`} onClick={()=>handleTripChange('roundTrip')}>
        <button  className={`${selectedTrip === 'roundTrip' ? "bg-purple-600 text-white" : "bg-white text-purple-600" }`}>
        
          Round Trip
        </button>
      </div>
      <div className={`flex items-center space-x-2 border rounded-tr-3xl p-4 rounded-br-3xl cursor-pointer ${selectedTrip === 'oneWay' ? 'bg-purple-600' : 'bg-white'}`} onClick={()=>handleTripChange('oneWay')}>
        <button  className={`${selectedTrip === 'oneWay' ? "bg-purple-600 text-white" : "bg-white text-purple-600" }`}>
        
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
              <FaPlaneDeparture size={16} className="text-purple-500 absolute top-[25%] left-2" />
              <input
                type="text"
                placeholder="       From"
                className="col-span-1 p-2 border rounded-tl-2xl rounded-bl-2xl"
              />
              
              </div>
              <div className="relative">
              <FaPlaneArrival size={16} className="text-purple-500 absolute top-[25%] left-2" /> 
              <input
                type="text"
                placeholder="       To"
                className="col-span-1 p-2 border rounded-tr-2xl rounded-br-2xl"
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
  <div className="space-y-8 flex-1 bg-white rounded-xl p-6 shadow-lg overflow-y-auto order-first lg:order-last">
    {flights.length > 0 ? (
      flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))
    ) : (
      <p>No flights available for the selected criteria.</p>
    )}
  </div>
    {/* Filter & Sort Section */}
    <div className="flex justify-start items-start lg:mt-8 flex-col w-full lg:w-1/5 space-y-6 order-last lg:order-last">
    <div className="flex items-start gap-1 flex-col justify-start p-2 w-full">
      <span className="text-gray-600">Sort by:</span>
      <select
        name="sort"
        value={formData.scheduleTime}
        onChange={handleChange}
        className="border rounded-md"
      >
        <option value=""></option>
        <option value="+scheduleTime">Schedule Time</option>
        <option value="+lastUpdatedAt">Last Update At</option>
        <option value="+actualLandingTime">Actual Landing Time</option>
      </select>
    </div>

    <div className="flex items-start gap-1 flex-col justify-start p-2 w-full">
      <span className="text-gray-600">Flight Direction:</span>
      <select
        name="flightDirection"
        value={formData.flightDirection}
        onChange={handleChange}
        className="border rounded-md"
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
        className="border rounded-md"
      >
        <option value=""></option>
        <option value="estimatedLandingTime">estimatedLandingTime</option>
        <option value="actualLandingTime">actualLandingTime</option>
        <option value="expectedTimeBoarding">expectedTimeBoarding</option>
        <option value="expectedTimeGateClosing">expectedTimeGateClosing</option>
        <option value="expectedTimeGateOpen">expectedTimeGateOpen</option>
        <option value="lastUpdatedAt">lastUpdatedAt</option>
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
      toast.error("Failed to book flight. Please try again.", {
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
            {flight?.flightDirection !== "A" && "Schiphol - "}
            {convertedCity.length > 0
              ? convertedCity[0]?.city.replace(/\d/g, "")
              : flight?.route?.destinations[0]}{" "}
            {flight?.flightDirection === "A" && " - Schiphol"}
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

const PromoCard = ({ title, image }) => (
  <div className="relative">
    <img
      src={image}
      alt={title}
      className="w-full h-40 object-cover rounded-lg"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
    </div>
  </div>
);

export default FlightBooking;
