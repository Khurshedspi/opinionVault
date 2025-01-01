import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import ServiceCard from "../../components/Services/ServiceCard";

const FeaturedServices = () => {
  const axiosSecure = useAxiosSecure();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const loadUserReviews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/userReviewData`
        );
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        toast.error("Failed to load reviews");
      }
    };
    loadUserReviews();
  }, [axiosSecure]);
  console.log(allData);
  return <div className="container mx-auto mb-10">
    <h1 className="text-2xl lg:text-4xl font-bold text-center mt-12 mb-10 ">Featured Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allData?.map((service) => <ServiceCard key={service._id} service={service}></ServiceCard> )}
    </div>
  </div>;
};

export default FeaturedServices;
