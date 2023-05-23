#!/usr/bin/env python3

from random import randint, choice

from faker import Faker

from app import app
from models import db, User, Gym, Like, Route, Climb

fake = Faker()

def make_users():

    User.query.delete()
    print("Deleted all Users...")
    climberBill = User(first_name="Bill", last_name="Brown", username="climberBill", password_hash="chicken")
    employeeJack = User(first_name="Jack", last_name="Daniels", username="climberTom", password_hash="chicken", current_gym_id=1)
    employeeJim = User(first_name="Jim", last_name="Beam", username="employeeJim", admin=True, password_hash="chicken", current_gym_id=2)

    db.session.add_all([climberBill, employeeJack, employeeJim])
    db.session.commit()
    print("Created 3 Standard Users...")
    
    
def make_gyms():
    Gym.query.delete()
    
    gym1 = Gym(name="Poplar", address="South Seattle Road" , phone=2565555555 )
    gym2 = Gym(name="Freemont", address="Stoneway St" , phone=2565555555 )
    
    db.session.add_all([gym1, gym2])
    db.session.commit()

def make_routes():
    Route.query.delete()
    
    route_list = []
    for each_route in range(8):
        route = Route(name=fake.company(), rating=randint(0,6), video_url="video url", setter_id=3, gym_id=choice([1,2]), active=choice([True, False]))
        route_list.append(route)
    
    db.session.add_all(route_list)
    db.session.commit()
    
    
def make_likes():
    Like.query.delete()
    
    like1 = Like(user_id=1, route_id=3)
    like2 = Like(user_id=1, route_id=4)
    like3 = Like(user_id=1, route_id=1)
    like4 = Like(user_id=1, route_id=6)
    like5 = Like(user_id=2, route_id=6)
    like6 = Like(user_id=2, route_id=2)
    like7 = Like(user_id=2, route_id=3)
    
    db.session.add_all([like1, like2, like3, like4, like5, like6, like7])
    db.session.commit()
    
def delete_climbs():
    Climb.query.delete()
    print("delete climb table")
    db.session.commit()
        
        
    
    # import ipdb; ipdb.set_trace()


if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_gyms()
        make_routes()
        make_likes()
        delete_climbs()
