import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/services`, {
          params: { email: user?.email, search },
        });
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
        toast.error("Failed to load services");
      }
    };

    loadServiceDetails();
  }, [user?.email, search]);

  const confirmationDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire("Deleted!", "Your service has been deleted.", "success");
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/services/${id}`);
      if (data.deletedCount > 0) {
        setAllData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Service deleted successfully");
      } else {
        toast.error("Failed to delete service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting service");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <ToastContainer position="top-center" />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">My Services</h2>
        <input
          type="text"
          placeholder="Search Service Category"
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.imgURL} alt={item.title} className="w-16 h-16" />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <button
                    onClick={() => confirmationDelete(item._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;