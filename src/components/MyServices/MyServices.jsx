import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/services`);
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
        toast.error("Failed to load services");
      }
    };

    loadServiceDetails();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/services/${id}`
      );
      if (data.deletedCount > 0) {
        setAllData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Product Deleted Successfully");
      } else {
        toast.error("Failed to delete the product");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
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
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your file is safe.",
          icon: "info",
          timer: 1500,
        });
      }
    });
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
                <td>
                  <div>
                    <p>{singleData.title}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{singleData.category}</p>
                  </div>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Update</button>
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
    </div>
  );
};

export default MyServices;