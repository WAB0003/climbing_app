#!/usr/bin/env python3

from random import choice as rc

from faker import Faker

from app import app
from models import db, User

fake = Faker()

def make_users():

    User.query.delete()
    
    climberBill = User(first_name="Bill", last_name="Brown", username="climberBill", password_hash="chicken")
    employeeJim = User(first_name="Jim", last_name="Bob", username="employeeJim", admin=True, password_hash="chicken")
    


    db.session.add_all([climberBill,employeeJim])
    db.session.commit()
    # import ipdb; ipdb.set_trace()

if __name__ == '__main__':
    with app.app_context():
        make_users()
