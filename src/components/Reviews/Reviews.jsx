import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Reviews = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [reviewToUpdate, setReviewToUpdate] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "My Reviews - Opinion Vault"; 
  }, []);

  // Load user's reviews
  useEffect(() => {
    const loadUserReviews = async () => {
      if (!user?.email) return; 
      try {
        const { data } = await axiosSecure.get(
          `https://opinion-vault-server.vercel.app/userReviews/${user?.email}`
        );
        setAllData(data);
      } catch (error) {
        // console.error("Failed to fetch reviews", error);
        toast.error("Failed to load reviews");
      }
    };
    loadUserReviews();
  }, [user?.email, axiosSecure]);

  // Handle delete review
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(
        `https://opinion-vault-server.vercel.app/userReview/${id}`
      );
      if (data.deletedCount > 0) {
        setAllData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Review Deleted Successfully");
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      // console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };

  const confirmationDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  // Handle update review
  const handleUpdate = (id) => {
    const review = allData.find((item) => item._id === id);
    setReviewToUpdate(review);

    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const textReview = form.textReview.value;
    const rating = parseInt(form.rating.value, 10); 
    const date = form.date.value;

    const updateInfo = { textArea: textReview, rating, date };

    try {
      const { data } = await axiosSecure.put(
        `https://opinion-vault-server.vercel.app/userReview/${reviewToUpdate._id}`,
        updateInfo
      );

      if (data.modifiedCount) {
        // Updated check for MongoDB response
        toast.success("Review updated successfully");

        // Close the modal
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();

        // Update the state with the new review data
        setAllData((prevData) =>
          prevData.map((item) =>
            item._id === reviewToUpdate._id
              ? { ...item, ...updateInfo }
              : item
          )
        );

        setReviewToUpdate(null);
      } else {
        toast.error("No changes were made to the review.");
      }
    } catch (error) {
      // console.error("Update error:", error);
      toast.error("Failed to update review");
    }
  };

  // console.log(allData);
  return (
    <div className="container mx-auto mt-5 mb-10">
      <ToastContainer position="top-center" />
      <h2 className="text-2xl font-bold mb-5 text-center text-blue-700">
        My Reviews
      </h2>

      {/* Reviews List */}
      <div className="grid grid-cols-1 space-y-5">
        {allData.map((review) => (
          <div
            key={review._id}
            className="card shadow-md p-4 bg-gray-200 text-center border-4 border-blue-400"
          >
            <div className="card-body">
              <h3 className="text-xl font-bold">
                <span className="font-bold">Title: </span>
                {review?.title}
              </h3>
              <p className="text-blue-700">
                <span className="font-bold">Text Review: </span>{" "}
                {review?.textArea}
              </p>
              <p className="text-blue-500 flex justify-center items-center gap-2">
                <span className="font-bold">Rating:</span>
                <Rating
                  value={review.rating}
                  readOnly
                  style={{ maxWidth: 100 }}
                />
                <span>{review?.rating}</span>
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleUpdate(review?._id)}
                className="btn btn-sm btn-danger bg-blue-400 border-2 border-white"
              >
                Update
              </button>
              <button
                onClick={() => confirmationDelete(review._id)}
                className="btn btn-sm btn-danger bg-blue-400 border-2 border-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Review Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">Service Title</label>
              <input
                type="text"
                name="serviceTitle"
                value={reviewToUpdate?.title}
                className="input input-bordered"
                readOnly
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Text Review</label>
              <textarea
                name="textReview"
                defaultValue={reviewToUpdate?.textArea}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={reviewToUpdate?.date}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Rating</label>
              <input
                type="number"
                name="rating"
                defaultValue={reviewToUpdate?.rating}
                className="input input-bordered"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_3").close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Reviews;
