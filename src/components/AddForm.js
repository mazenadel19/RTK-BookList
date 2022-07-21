import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postBook } from "../store/slices/bookSlice";

const initialState = { title: "", price: "", description: "" };

const Addform = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const uuid =
    //   Date.now().toString(36) +
    //   Math.floor(
    //     Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    //   ).toString(36);
    // dispatch(postBook({ ...formData, id: uuid }));
    dispatch(postBook(formData));
    setFormData(initialState);
  };

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  //stops type number input from accepting "e"
  const keyPressHandler = (Event) => {
    const Regex = new RegExp("[0-9]")
    const keyCode = Event.keyCode || Event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!Regex.test(keyValue)) {
        Event.preventDefault();
    }
}

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              onChange={(e) => handleChange(e, "title")}
              value={formData.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              onChange={(e) => handleChange(e, "price")}
              onKeyDown={keyPressHandler}
              value={formData.price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="Description"
              rows="3"
              required
              onChange={(e) => handleChange(e, "description")}
              value={formData.description}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
