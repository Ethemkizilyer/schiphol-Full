import axios from "axios";
import React, { useEffect, useState } from "react";
import TimeDifferenceCalculator from "../lib/DateCalculator";
import moment from "moment";
import cities from "../cities.json";
import { useNavigate } from "react-router-dom";
const pricess = [
  {
    main: 156,
    comfort: 204,
    deltaOne: 386,
  },
  {
    main: 182,
    first: 400,
  },
  {
    anytime: 225,
    businessSelect: 253,
  },

  {
    economy: 183,
    economyFlexible: 449,
    first: 407,
  },
];

const FlightListPage = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("Recommended");
  const [myFlights, setMyFlights] = useState([]);

  useEffect(() => {
    const fetchMyFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/flights/my-flights"
        );
        setMyFlights(response.data.flights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchMyFlights();
  }, []);
  console.log("myFlights", myFlights);
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-400 py-2 px-4 border rounded-lg"
          >
            Home
          </button>
          <button className="bg-white py-2 px-4 border rounded-lg">
            Times
          </button>
          <button className="bg-white py-2 px-4 border rounded-lg">
            Stops
          </button>
          <button className="bg-white py-2 px-4 border rounded-lg">
            Airlines
          </button>
          <button className="bg-white py-2 px-4 border rounded-lg">
            Airports
          </button>
          <button className="bg-white py-2 px-4 border rounded-lg">
            Amenities
          </button>
          <button className="text-blue-500 underline">Edit Search</button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-lg bg-white"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Departure: Earliest</option>
            <option>Arrival: Earliest</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
      {myFlights.length > 0 ? (myFlights?.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between "
          >
            <div className="flex items-center space-x-4">
              <img
                src={`https://airhex.com/images/airline-logos/turkish-airlines.png`}
                alt={flight.airline}
                className="w-12 h-12"
              />
              <div className="flex">
                <h3>{moment(flight.estimatedLandingTime).format("hh.mm A")}</h3>{" "}
                -<h3>{moment(flight.expectedTimeOnBelt).format("hh.mm A")}</h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-4 justify-between items-center ">
                <div>
                  <h3 className="text-xl font-semibold">
                    {
                      cities.find(
                        (item) => item.code === flight.route.destinations[0]
                      ).name
                    }
                  </h3>
                  <p className="text-sm text-blue-500">Flight Details</p>
                </div>

                <div>
                  <p className="text-gray-500">Nonstop</p>
                  <p className="text-gray-500">
                    <TimeDifferenceCalculator
                      estimatedLandingTime={flight.estimatedLandingTime}
                      expectedTimeOnBelt={flight.expectedTimeOnBelt}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    {" "}
                    {flight?.flightDirection !== "A" && "Schiphol - "}
                    {flight?.route?.destinations[0]}{" "}
                    {flight?.flightDirection === "A" && " - Schiphol"}
                  </p>
                  <p className="text-gray-500">{flight.flightName}</p>
                </div>
                <div className="flex space-x-4">
                  {Object.entries(pricess[0]).map(([key, value]) => (
                    <div className="text-center border rounded-lg p-4 shadow-sm">
                      <p className="font-semibold">${value}</p>
                      <p className="text-sm text-gray-500">
                        {key?.charAt(0).toUpperCase() + key?.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))) : (
          <p>No flights available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FlightListPage;
