import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const Reviews = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [reviewToUpdate, setReviewToUpdate] = useState(null);



  useEffect(() => {
    const pathTitleMap = {
      "/reviews": "My Reviews - Opinion Vault",
    };
    document.title = pathTitleMap[location.pathname] || "Opinion Vault";
  }, [location.pathname]);

  // Load user's reviews
  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/userReview`, {
          params: { email: user?.email }
        });
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        toast.error("Failed to load reviews");
      }
    };

    loadServiceDetails();
  }, [user?.email]);

  // Handle delete review
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/userReview/${id}`
      );
      if (data.deletedCount > 0) {
        setAllData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Review Deleted Successfully");
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      console.error(error);
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
        handleDelete(id); // Call delete function
        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted.",
          icon: "success",
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your review is safe.",
          icon: "info",
          timer: 1500,
        });
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

  // Handle form submission for updating review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const textReview = form.textReview.value;
    const rating = form.rating.value;

    const updateInfo = { textReview, rating };

    try {
      const response = await axios.put(
        `http://localhost:5000/userReview/${reviewToUpdate._id}`,
        updateInfo
      );

      if (response.data.success) {
        toast.success("Review updated successfully");
        const modal = document.getElementById("my_modal_3");
        if (modal) {
          modal.close(); // Close modal after success
        }

        // Update local data to reflect changes
        setAllData((prevData) =>
          prevData.map((item) =>
            item._id === reviewToUpdate._id ? { ...item, textReview, rating } : item
          )
        );
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <ToastContainer position="top-center" />
      <h2 className="text-2xl font-bold mb-5 text-center text-blue-700">My Reviews</h2>

      {/* Reviews List */}
      <div className="grid grid-cols-1 space-y-5">
        {allData.map((review) => (
          <div key={review._id} className="card shadow-md p-4 bg-gray-200 text-center border-4 border-blue-400 ">
            <div className="card-body">
              <h3 className="text-xl font-bold">{review.serviceTitle}</h3>
              <p className="text-blue-700">{review.textArea}</p>
              <p className="text-blue-500">Rating: {review.rating}</p>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleUpdate(review._id)}
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
                value={reviewToUpdate?.serviceTitle}
                className="input input-bordered"
                readOnly
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Text Review</label>
              <textarea
                name="textReview"
                defaultValue={reviewToUpdate?.textReview}
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
