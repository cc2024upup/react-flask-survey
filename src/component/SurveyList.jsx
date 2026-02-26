//Display all the submission records of the survey forms and provide the functions of 
// editing and deleting.
import React from "react";
import { useNavigate } from "react-router-dom";

function SurveyList({ surveys, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h2>Survey Submissions</h2>
      {surveys.length === 0 ? (
        <div className="alert alert-info">No survey submissions yet.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered table-striped" style={{ minWidth: "1200px" }}>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Phone</th>
                <th>Email</th>
                <th>URL</th>
                <th>Date</th>
                <th>Likes</th>
                <th>Source</th>
                <th>Grad Month</th>
                <th>Grad Year</th>
                <th>Recommend</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => (
                <tr key={s.id}>
                  <td>{s.username}</td>
                  <td>{s.street}</td>
                  <td>{s.city}</td>
                  <td>{s.state}</td>
                  <td>{s.zip}</td>
                  <td>{s.phone}</td>
                  <td>{s.email}</td>
                  <td>{s.url}</td>
                  <td>{s.date}</td>
                  <td>{s.likes && s.likes.join(", ")}</td>
                  <td>{s.source}</td>
                  <td>{s.gradMonth}</td>
                  <td>{s.gradYear}</td>
                  <td>{s.recommend}</td>
                  <td>{s.comments}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        onEdit(s);
                        navigate("/");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SurveyList;
