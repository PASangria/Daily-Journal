from flask import Flask
from flask_cors import CORS
from db import db
from config import Config  # Import the Config class
import routes

app = Flask(__name__)
CORS(app)  # Allow frontend requests

app.config.from_object(Config)  # Load configuration from Config class

db.init_app(app)

with app.app_context():
    db.create_all()  # Create database tables if they don't exist

app.register_blueprint(routes.bp)  # Register API routes

if __name__ == "__main__":
    app.run(debug=True)
