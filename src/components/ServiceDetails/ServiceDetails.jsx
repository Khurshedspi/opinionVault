import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { toast } from "react-toastify";

const ServiceDetails = () => {
  const [singleService, setSingleService] = useState({});
  const [allReview, setAllReview] = useState([]);
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  console.log(user);

  // displayName email photoURL

  const params = useParams();

  // Load Service Details
  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/services/${params.id}`
        );
        setSingleService(data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
      }
    };

    loadServiceDetails();
  }, [params.id]);

  // handle Review Add part
  const handleReviewAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const textArea = form.textArea.value;
    const date = form.date.value;
    console.log(rating, textArea, date);
    const reviewData = {
      rating,
      textArea,
      date,
      email: user?.email,
      userCurrentName: user?.displayName,
      userPhoto: user?.photoURL,
      reviewId: params.id,
    };
    try {
      const { data } = await axios.post(
        `http://localhost:5000/userReview`,
        reviewData
      );
      console.log(data);
      toast.success("Review Add SuccessFull");
      form.reset();
    } catch (error) {
      console.error("Failed to add review", error);
    }
  };

  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/userReview/${params.id}`
        );
        setAllReview(data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
      }
    };

    loadServiceDetails();
  }, [params.id]);

  console.log(allReview);

  return (
    <div className="container mx-auto p-6">
      {/* Service Details Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={singleService.imgURL}
          alt={singleService.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {singleService.title}
          </h1>
          <p className="text-gray-600 mt-4">{singleService.description}</p>
          <p className="mt-2">
            <span className="font-semibold">Category:</span>{" "}
            {singleService.category}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Price:</span> ${singleService.price}
          </p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Reviews: {singleService?.reviewCount ? singleService?.reviewCount : 0}
        </h2>

        {/* Check if allReview is an array */}
        <div className="mt-4  grid md:grid-cols-4 lg:grid-cols-6">
          {allReview.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center">
                <img
                  src={review.userPhoto || "https://via.placeholder.com/50"}
                  alt={review.userCurrentName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{review.userCurrentName}</h3>
                  <p className="text-gray-500">{review.date}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.textArea}</p>
              <Rating
                value={review.rating}
                readOnly
                style={{ maxWidth: 100 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Add a Review</h2>
        <form onSubmit={handleReviewAdd}>
          <textarea
            className="w-full p-4 mt-4 border rounded-lg focus:outline-none"
            placeholder="Write your review"
            name="textArea"
          ></textarea>
          <div className="">
            <h2 className="font-bold">Ratings : </h2>
            <Rating
              value={rating}
              style={{ maxWidth: 200 }}
              onChange={setRating}
            />
          </div>

          <div>
            <label className="label">
              <strong className="label-text text-white">Date</strong>
            </label>
            <input
              type="date"
              placeholder="Date"
              name="date"
              className="input w-full input-bordered"
              required
            />
          </div>
          <input
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            type="submit"
            value="Add Review"
          />
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
