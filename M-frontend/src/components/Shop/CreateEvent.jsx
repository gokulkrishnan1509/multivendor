import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { CreateEventOnserver } from "../../features/events/eventService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    originalPrice: "",
    discountPrice: "",
    start_Date: "",
    Finish_date: "",
    status: "",
    // startDate: "",
    // endDate: "",
  });


  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { success, error } = useSelector((state) => state.event);

  useEffect(() => {
 
  
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Event created successfully !");
      navigate("/dashboard-events");
      window.location.reload();
      dispatch({ type: "clearCreateEventSuccess" });

    }
  }, [dispatch,success,error]);

  const today = new Date().toISOString().slice(0, 10);
  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);

    setFormData({
      ...formData,
      start_Date: startDate.toISOString().slice(0, 10),
      Finish_date: null,
    });

    document.getElementById("end_date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDatechange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
    setFormData({
      ...formData,
      Finish_date: endDate.toISOString().slice(0, 10),
    });
  };

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0,10)
    : today;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your custom validation logic goes here
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(CreateEventOnserver(formData));

    // Your submit logic goes here
  };

  const validateForm = (data) => {
    // Your custom validation logic goes here using useState
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }

    if (!data.description) {
      errors.description = "Description is required";
    }
    if (!data.category) {
      errors.category = "Category is required";
    }

    if (!data.status) {
      errors.status = "Status is required";
    }
    if (!data.discountPrice) {
      errors.discountPrice = "Discount is required";
    }
    if (!data.originalPrice) {
      errors.originalPrice = "Original is required";
    }

    if (!data.start_Date) {
      errors.start_Date = "Start is required";
    }
    return errors;
  };

  return (
    <>
      <div className="w-[90%] 800:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <h5 className="text-[30px] font-Poppins text-center">Create Events</h5>

        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.name}</div>
          </div>
          <br />
          <div>
            <label className="pb-2">
              description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.description}</div>
          </div>
          <br />

          <div>
            <label className="pb-2">
              Category<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.category}</div>
          </div>
          <br />

          <div>
            <label className="pb-2">status</label>
            <input
              type="text"
              name="status"
              onChange={handleChange}
              value={formData.status}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.status}</div>
          </div>
          <br />

          <div>
            <label className="pb-2">Discount Price</label>

            <input
              type="text"
              name="discountPrice"
              onChange={handleChange}
              value={formData.discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.discountPrice}</div>
          </div>
          <br />

          <div>
            <label className="pb-2">Original Price</label>
            <input
              type="text"
              name="originalPrice"
              onChange={handleChange}
              value={formData.originalPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.originalPrice}</div>
          </div>
          <br />

          <div>
            <label className="pb-2">Event Start Date</label>
            <input
              type="date"
              name="start_Date"
              id="Start_date"
              onChange={handleStartDateChange}
              min={today}
              value={formData.start_Date || ""}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
            <div className="error">{errors.startDate}</div>
          </div>
          <br />

          <div>
            <label className="pb-2"> Event End Date</label>
            <input
              type="date"
              name="Finish_date"
              id="end_date"
              onChange={handleEndDatechange}
              min={minEndDate}
              value={formData.Finish_date || ""}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;
