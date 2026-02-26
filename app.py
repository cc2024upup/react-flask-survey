#The function of app.py is to start the Flask application, configure the database and define the interfaces,
# enabling the front end to perform CRUD operations (create, read, update, delete) on the data of the Survey table
# through the RESTful API.
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Wsnd321sb233?@localhost/survey_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    street = db.Column(db.String(200))
    city = db.Column(db.String(100))
    state = db.Column(db.String(50))
    zip = db.Column(db.String(20))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    url = db.Column(db.String(200))
    date = db.Column(db.String(20))
    likes = db.Column(db.String(300))
    source = db.Column(db.String(50))
    gradMonth = db.Column(db.String(20))
    gradYear = db.Column(db.String(10))
    recommend = db.Column(db.String(20))
    comments = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "phone": self.phone,
            "email": self.email,
            "url": self.url,
            "date": self.date,
            "likes": self.likes.split(",") if self.likes else [],
            "source": self.source,
            "gradMonth": self.gradMonth,
            "gradYear": self.gradYear,
            "recommend": self.recommend,
            "comments": self.comments
        }

with app.app_context():
    db.create_all()

@app.route("/api/surveys", methods=["GET"])
def get_surveys():
    surveys = Survey.query.all()
    return jsonify([s.to_dict() for s in surveys])

@app.route("/api/surveys", methods=["POST"])
def add_survey():
    data = request.json
    survey = Survey(
        username=data.get("username"),
        street=data.get("street"),
        city=data.get("city"),
        state=data.get("state"),
        zip=data.get("zip"),
        phone=data.get("phone"),
        email=data.get("email"),
        url=data.get("url"),
        date=data.get("date"),
        likes=",".join(data.get("likes", [])),
        source=data.get("source"),
        gradMonth=data.get("gradMonth"),
        gradYear=data.get("gradYear"),
        recommend=data.get("recommend"),
        comments=data.get("comments")
    )
    db.session.add(survey)
    db.session.commit()
    return jsonify(survey.to_dict()), 201

@app.route("/api/surveys/<int:survey_id>", methods=["PUT"])
def update_survey(survey_id):
    survey = Survey.query.get_or_404(survey_id)
    data = request.json
    for field in data:
        if field == "likes":
            setattr(survey, field, ",".join(data[field]))
        else:
            setattr(survey, field, data[field])
    db.session.commit()
    return jsonify(survey.to_dict())

@app.route("/api/surveys/<int:survey_id>", methods=["DELETE"])
def delete_survey(survey_id):
    survey = Survey.query.get_or_404(survey_id)
    db.session.delete(survey)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)
