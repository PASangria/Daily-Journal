from flask import Flask
from flask_cors import CORS
from db import db
from config import Config  # Import the Config class
import routes

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
     
app.config.from_object(Config) 

db.init_app(app)

with app.app_context():
    db.create_all()  

app.register_blueprint(routes.bp)  

if __name__ == "__main__":
    app.run(debug=True)
