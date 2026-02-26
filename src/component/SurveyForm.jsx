//The function of SurveyForm.jsx is to provide a front-end survey form component that 
// supports both the add and edit modes, collecting user input and invoking the callback 
// function to pass the data upon submission.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SurveyForm({ onSubmit,editingSurvey }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    url: "",
    date: "",
    likes: [],
    source: "",
    gradMonth: "",
    gradYear: "",
    recommend: "",
    comments: ""
  });

  useEffect(() => {
    if (editingSurvey) {
      setFormData(editingSurvey);
    }
  }, [editingSurvey]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const likes = prev.likes.includes(value)
          ? prev.likes.filter((v) => v !== value)
          : [...prev.likes, value];
        return { ...prev, likes };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/submissions");
  };

  // Reset
  const handleReset = () => {
    setFormData({
      username: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      url: "",
      date: "",
      likes: [],
      source: "",
      gradMonth: "",
      gradYear: "",
      recommend: "",
      comments: ""
    });
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="text-center mb-4">CS Department Survey</h2>

      <form onSubmit={handleSubmit} onReset={handleReset} className="bg-white p-4 rounded shadow-sm">
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name *</label>
          <input
            type="text"
            className="form-control"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Street Address */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Street Address *</label>
          <input
            type="text"
            className="form-control"
            name="street"
            required
            value={formData.street}
            onChange={handleChange}
          />
        </div>

        {/* City, State, ZIP */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">City *</label>
            <input
              type="text"
              className="form-control"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">State *</label>
            <input
              type="text"
              className="form-control"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">ZIP *</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Telephone */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Telephone *</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Website */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Website (Optional)</label>
          <input
            type="url"
            className="form-control"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Date of Survey *</label>
          <input
            type="date"
            className="form-control"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Likes */}
        <fieldset className="mb-4">
          <legend className="fw-semibold">What did you like most about the campus? *</legend>
          {["students", "location", "campus", "atmosphere", "dorms", "sports"].map((item) => (
            <div className="form-check form-check-inline" key={item}>
              <input
                type="checkbox"
                className="form-check-input"
                name="likes"
                value={item}
                checked={formData.likes.includes(item)}
                onChange={handleChange}
              />
              <label className="form-check-label">{item}</label>
            </div>
          ))}
        </fieldset>

        {/* Source */}
        <fieldset className="mb-4">
          <legend className="fw-semibold">How did you become interested in this university? *</legend>
          {["friends", "television", "internet", "other"].map((src) => (
            <div className="form-check form-check-inline" key={src}>
              <input
                type="radio"
                className="form-check-input"
                name="source"
                value={src}
                checked={formData.source === src}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">{src}</label>
            </div>
          ))}
        </fieldset>

        {/* Graduation */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Graduation Month *</label>
            <input
              list="months"
              className="form-control"
              name="gradMonth"
              value={formData.gradMonth}
              onChange={handleChange}
              required
            />
            <datalist id="months">
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Graduation Year *</label>
            <input
              type="number"
              className="form-control"
              name="gradYear"
              value={formData.gradYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Recommend */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Would you recommend this university? *</label>
          <select
            className="form-select"
            name="recommend"
            required
            value={formData.recommend}
            onChange={handleChange}
          >
            <option value="">Select…</option>
            <option value="very-likely">Very Likely</option>
            <option value="likely">Likely</option>
            <option value="unlikely">Unlikely</option>
          </select>
        </div>

        {/* Comments */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Additional Comments</label>
          <textarea
            className="form-control"
            name="comments"
            rows="4"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-4 me-2">
            {editingSurvey ? "Update" : "Submit"}
          </button>
          <button type="reset" className="btn btn-outline-secondary px-4">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;
