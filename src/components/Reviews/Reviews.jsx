import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios, { all } from "axios";


const Reviews = () => {
    const { user } = useContext(AuthContext);
    const [allData, setAllData] = useState([]);
  
    useEffect(() => {
      const loadServiceDetails = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/userReview`, user.email);
          setAllData(data);
        } catch (error) {
          console.error("Failed to fetch service details", error);
        }
      };
  
      loadServiceDetails();
    }, [user?.email]);
    console.log(allData)
    return (
        <div>
            
        </div>
    );
};

export default Reviews;