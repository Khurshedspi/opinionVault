import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/services/${user.email}`);
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
      }
    };

    loadServiceDetails();
  }, [user.email]);
  console.log(allData)
  return (
    <div>
      <h2>my services here</h2>
    </div>
  );
};

export default MyServices;
