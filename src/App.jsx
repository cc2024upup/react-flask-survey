//As the main component of the application, configure the routing and manage the add, delete,
//  modify and query logic of the survey data.
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SurveyForm from "./component/SurveyForm";
import SurveyList from "./component/SurveyList";

function App() {
  const [surveys, setSurveys] = useState([]);
  const [editingSurvey, setEditingSurvey] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/surveys")
      .then((res) => res.json())
      .then((data) => setSurveys(data));
  }, [editingSurvey]);

  const handleSubmit = (data) => {
    if (editingSurvey) {
      fetch(`http://127.0.0.1:5000/api/surveys/${editingSurvey.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(() => {
        fetch("http://127.0.0.1:5000/api/surveys")
          .then((res) => res.json())
          .then((data) => setSurveys(data));
        setEditingSurvey(null);
        });
    } else {
      fetch("http://127.0.0.1:5000/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(() => {
          fetch("http://127.0.0.1:5000/api/surveys")
            .then((res) => res.json())
            .then((data) => setSurveys(data));
        });
    }
  };

  const deleteSurvey = (id) => {
    fetch(`http://127.0.0.1:5000/api/surveys/${id}`, {
      method: "DELETE"
    }).then(() => setSurveys((prev) => prev.filter((s) => s.id !== id)));
  };

  const editSurvey = (survey) => {
    setEditingSurvey(survey);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link className="navbar-brand" to="/">CS Survey</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Fill Survey</Link>
          <Link className="nav-link" to="/submissions">View Submissions</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<SurveyForm onSubmit={handleSubmit} editingSurvey={editingSurvey} />}
        />
        <Route
          path="/submissions"
          element={<SurveyList surveys={surveys} onEdit={editSurvey} onDelete={deleteSurvey} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
