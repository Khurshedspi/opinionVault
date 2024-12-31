import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [serviceToUpdate, setServiceToUpdate] = useState(null);

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

  const handleUpdate = (id) => {
    const service = allData.find((item) => item._id === id);
    setServiceToUpdate(service);

    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const date = form.date.value;

    const updateInfo = { title, category , date};

    try {
      const {data} = await axios.put(
        `http://localhost:5000/services/${serviceToUpdate._id}`,
        updateInfo
      );

      if (data.modifiedCount) {
        toast.success("Service updated successfully");
        const modal = document.getElementById("my_modal_3");
        if (modal) {
          modal.close();
        }

        setAllData((prevData) =>
          prevData.map((item) =>
            item._id === serviceToUpdate._id
              ? { ...item, title, category }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating service:", error);
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
                  <button
                    type="button"
                    onClick={() => handleUpdate(singleData._id)}
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

      {/* Update Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Service</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">Service Title</label>
              <input
                type="text"
                name="title"
                defaultValue={serviceToUpdate?.title}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={serviceToUpdate?.category}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Web URL</label>
              <input
                type="text"
                name="webURL"
                defaultValue={serviceToUpdate?.webURL}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Image URL</label>
              <input
                type="url"
                name="imageURL"
                defaultValue={serviceToUpdate?.imgURL}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={serviceToUpdate?.price}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                readOnly
                defaultValue={serviceToUpdate?.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <input
                type="text"
                name="description"
                defaultValue={serviceToUpdate?.description}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={serviceToUpdate?.date}
                className="input input-bordered"
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

export default MyServices;
