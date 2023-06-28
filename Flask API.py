from flask import Flask
from city_scores_sql_alchemy import make_db_engine, get_city_scores

app = Flask(__name__)

@app.route("/")
def hello_world():
    host = "localhost"
    port =  5432
    username = "postgres"
    password = "R3n3gade321!"
    dbname = "Worldwide Major City Scores"

    return get_city_scores(*make_db_engine(host, port, username, password, dbname)) 



