import axios from "axios";
import { useCallback, useState } from "react";
import { Bounce, toast } from "react-toastify";

const useFlights = (url) => {
    const [flights, setFlights] = useState([]);
  
    const fetchFlights = useCallback(async (queryParams = "") => {
      try {
        const response = await axios.get(`${url}${queryParams}`);
        setFlights(response?.data?.flights || []);
        queryParams && 
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
        console.error("Error fetching flights:", error);
        toast.error("Error fetching flights. Please try again later.", {
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
    }, [url]);
  
    return { flights, fetchFlights };
  };

  export default useFlights