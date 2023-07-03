from flask import Flask
from city_scores_sql_alchemy import make_db_engine, get_city_scores
from flask_cors import CORS
from config import passwords

app = Flask(__name__)
CORS(app)

@app.route("/")

def hello_world():
    host = "localhost"
    port =  5432
    username = "postgres"
    password = passwords
    dbname = "Score_City"

    return get_city_scores(*make_db_engine(host, port, username, password, dbname))


if __name__== '__main__':
    app.run(debug=True)
