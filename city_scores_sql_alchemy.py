import logging, numpy as np
from sqlalchemy import create_engine, MetaData, Table, select, and_, Column, or_, bindparam, delete, text

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.engine import CursorResult
from sqlalchemy.sql.expression import func
from typing import Any, Optional, Callable
from functools import wraps
from datetime import datetime

def requires_reflection(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        if not self.reflected:
            logging.info('Getting database meta data...')
            self.meta_data.reflect()
            self.reflected = True
        return func(self, *args, **kwargs)
    return wrapper

class DataFace(object):
    """Why is this module called DataFace?  
       > Well, it's the interFACE for the DATAbase, and DatabaseInterface sounds lame  
       Is a short name for a module bad if it needs explanation?  
       > Likely, please direct any complaints on this matter to mpick@no-reply.not-monitored.us.ibm.com"""
    
    def __init__(self, host: str, port: int, username: str, password: str, dbname: str, dialect: str = "postgresql", pool_pre_ping: bool = True):
        self.engine = create_engine(f"{dialect}://{username}:{password}@{host}:{port}/{dbname}", pool_pre_ping = pool_pre_ping)
        self.meta_data = MetaData(self.engine)
        self.reflected = False
        self.session_maker: Callable[[], Session]  = sessionmaker(bind=self.engine, autocommit=False, autoflush=False)
    
def my_func(arg1: int, arg2: int) -> int:
    return arg1 + arg2

def make_db_engine(host: str, port: int, username: str, password: str, dbname: str, dialect: str = "postgresql"):
    engine_str = f"{dialect}://{username}:{password}@{host}:{port}/{dbname}"
    engine = create_engine(engine_str)
    meta_data = MetaData(engine)
    meta_data.reflect()
    session_maker = sessionmaker(bind=engine, autocommit=True, autoflush=True)

    return engine, meta_data, session_maker
    
 

def get_city_scores(engine, meta_data, session_maker) -> list[dict]:
    """Accesses the "city_scores" table and uses SQL to pull all data
    into Python. Returns a list of dictionaries.
    
    Example
    -------
    """
    tbl = Table("city_scores", meta_data, autoload=True)
    with session_maker() as db:
        query = tbl.select()
        print(query)
        res = db.execute(query).all()
    
    return [dict(rec) for rec in res]

def main():
    host = "localhost"
    port =  5432
    username = "postgres"
    password = "R3n3gade321!"
    dbname = "Worldwide Major City Scores"

    engine, meta_data, session_maker = make_db_engine(host, port, username, password, dbname)
    
    print(get_city_scores(engine, meta_data, session_maker))
    

if __name__ == "__main__":
    main()

