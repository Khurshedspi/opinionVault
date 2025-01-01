import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Load services data
  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axiosSecure.get(`http://localhost:5000/services`);
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
        toast.error("Failed to load services");
      }
    };

    loadServiceDetails();
  }, [user?.email, axiosSecure]);

  // Delete service
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/services/${id}`
      );
      if (data.deletedCount > 0) {
        setAllData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Service deleted successfully");
      } else {
        toast.error("Failed to delete the service");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Confirm delete
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
        Swal.fire("Deleted!", "Your service has been deleted.", "success");
      }
    });
  };

  // Open modal and set selected service
  const updateForm = (service) => {
    setSelectedService(service); 
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  console.log(selectedService);

  // Update service
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/services/${selectedService._id}`,
        {title: selectedService.title, category: selectedService.category}
      );

      if (data.modifiedCount > 0) {
        setAllData((prevData) =>
          prevData.map((item) =>
            item._id === selectedService._id ? selectedService : item
          )
        );
        toast.success("Service updated successfully");
        closeModal(); 
      } else {
        toast.warn("No changes were made");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <ToastContainer position="top-center" />
      <h2 className="text-2xl font-bold mb-5">My Services</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-xl font-bold">
              <th>Product Images</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Edit</th>
              <th></th>
            </tr>
          </thead>
          {allData.map((singleData) => (
            <tbody key={singleData._id}>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-24 h-24">
                        <img src={singleData?.imgURL} alt={singleData?.title} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{singleData.title}</td>
                <td>{singleData.category}</td>
                <th>
                  <button
                    onClick={() => updateForm(singleData)}
                    className="btn btn-ghost btn-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => confirmationDelete(singleData?._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Modal for update */}
      {isModalOpen && selectedService && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Service</h3>
            <div className="mt-4">
              <label className="block">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedService.title || ""}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    title: e.target.value,
                  })
                }
              />
              <label className="block mt-4">Category</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={selectedService.category || ""}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    category: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleUpdate}>
                Save
              </button>
              <button className="btn btn-ghost" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;