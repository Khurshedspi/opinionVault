import axios from "axios";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from './../AuthProvider/AuthProvider';

const AddServices = () => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const pathTitleMap = {
      "/addServices": "Add Services - Opinion Vault",
    };
    document.title = pathTitleMap[location.pathname] || "Opinion Vault";
  }, [location.pathname]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const imgURL = form.imgURL.value;
    const title = form.title.value;
    const name = form.name.value;
    const webURL = form.webURL.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = form.price.value;
    console.log(date, imgURL, title, name, webURL, description, category, price);
    const serviceData = {
      date,
      imgURL,
      title,
      name,
      webURL,
      description,
      category,
      price,
      email:user?.email,
    };


    axios.post('http://localhost:5000/services', serviceData)
    .then(result => {
      toast.success('Service successfully Added')
      form.reset();
    })
  };
  return (
    <div className="container mx-auto mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center my-6 text-white">
        Add Service
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <strong className="label-text text-white">
                Service Image URL
              </strong>
            </label>
            <input
              type="text"
              placeholder="Service Image URL"
              name="imgURL"
              className="input w-full input-bordered"
              required
            />
          </div>
          <div>
            <label className="label">
              <strong className="label-text text-white">Service Title</strong>
            </label>
            <input
              type="text"
              placeholder="Service Title"
              name="title"
              className="input w-full input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <strong className="label-text text-white">Company Name</strong>
            </label>
            <input
              type="text"
              placeholder="Company Name"
              name="name"
              className="input w-full input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <strong className="label-text text-white">Website</strong>
            </label>
            <input
              type="text"
              placeholder="Website URL"
              name="webURL"
              className="input w-full input-bordered"
            />
          </div>
          <div className="mt-4">
            <label className="label">
              <strong className="label-text text-white">Description</strong>
            </label>
            <textarea
              name="description"
              className="w-full p-3 rounded-xl h-20 sm:h-20"
              placeholder="Description Here"
            ></textarea>
          </div>
          <div>
            <label className="label">
              <strong className="label-text text-white">Category</strong>
            </label>
            <select name="category" className="select select-bordered w-full">
              <option>Select Category</option>
              <option>IT Services</option>
              <option>Home Services</option>
              <option>Creative & Design</option>
              <option>Travel & Tours</option>
              <option>Beauty & Personal Care</option>
              <option>Food & Catering</option>
              <option>Education & Tutoring</option>
              <option>Health & Wellness</option>
            </select>
          </div>
          <div>
            <label className="label">
              <strong className="label-text text-white">Price</strong>
            </label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              className="input w-full input-bordered"
              required
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
        </div>

        <input
          className="btn btn-primary w-full mt-4"
          type="submit"
          value="Add Service"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddServices;
