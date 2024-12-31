import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const pathTitleMap = {
      "/services": "Services - Opinion Vault",
    };
    document.title = pathTitleMap[location.pathname] || "Opinion Vault";
  }, [location?.pathname]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/services?titleSearch=${search}`)
      .then((res) => setServices(res.data));
    // setServices(data);
  }, [search]);
  console.log(services);
  return (
    <div className="container mx-auto mt-5">
      <div className="mb-8 flex items-center justify-center space-x-2">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Title"
          className="p-2 border border-gray-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600 transition duration-300">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
