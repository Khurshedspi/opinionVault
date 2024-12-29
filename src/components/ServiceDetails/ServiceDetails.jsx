import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactRating from "react-rating";
import '@smastrom/react-rating/style.css'

const ServiceDetails = () => {
  const [singleService, setSingleService] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

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

    const loadReviews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/reviews/${params.id}`
        );
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    loadServiceDetails();
    loadReviews();
  }, [params.id]);

  // Handle Add Review
  const handleAddReview = async () => {
    if (!newReview || rating === 0) {
      alert("Please provide both review text and rating!");
      return;
    }

    const reviewData = {
      text: newReview,
      rating,
      date: new Date().toLocaleString(),
      userInfo: {
        name: "John Doe", // Replace with authenticated user's name
        photo: "https://via.placeholder.com/40", // Replace with authenticated user's photo
      },
    };

    try {
      await axios.post(`http://localhost:5000/reviews/${params.id}`, reviewData);
      setReviews([reviewData, ...reviews]);
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error("Failed to add review", error);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800">{singleService.title}</h1>
          <p className="text-gray-600 mt-4">{singleService.description}</p>
          <p className="mt-2">
            <span className="font-semibold">Category:</span> {singleService.category}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Price:</span> ${singleService.price}
          </p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">Reviews ({reviews.length})</h2>
        <div className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex items-start space-x-4"
            >
              <img
                src={review.userInfo.photo}
                alt={review.userInfo.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{review.userInfo.name}</h3>
                <p className="text-gray-600 text-sm">{review.date}</p>
                <ReactRating
                  initialRating={review.rating}
                  readonly
                  emptySymbol="far fa-star text-gray-400"
                  fullSymbol="fas fa-star text-yellow-500"
                />
                <p className="text-gray-700 mt-2">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Add a Review</h2>
        <textarea
          className="w-full p-4 mt-4 border rounded-lg focus:outline-none"
          placeholder="Write your review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <div className="mt-4">
          <ReactRating
            emptySymbol="far fa-star text-gray-400 text-2xl"
            fullSymbol="fas fa-star text-yellow-500 text-2xl"
            onChange={(rate) => setRating(rate)}
          />
        </div>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleAddReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
