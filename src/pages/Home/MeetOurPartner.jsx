import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MeetOurPartner = () => {
  const [partnersData, setPartnerData] = useState([]);

  useEffect(() => {
    fetch("partner.json")
      .then((res) => res.json())
      .then((data) => setPartnerData(data));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-white mb-12">
          Meet Our Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnersData.map((partner) => (
            <motion.div
              key={partner.id}
              className="card bg-white shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <figure className="p-6 bg-gray-100">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-32 h-32 object-contain mx-auto transform transition duration-300 hover:scale-110"
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartner;
