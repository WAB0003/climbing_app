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
    employeeJack = User(first_name="Jack", last_name="Daniels", username="employeeJack", admin=True, password_hash="chicken", current_gym_id=1)
    employeeJim = User(first_name="Jim", last_name="Beam", username="employeeJim", admin=True, password_hash="chicken", current_gym_id=2)
    climberTom = User(first_name="Tom", last_name="Jones", username="climberTom", password_hash="chicken", current_gym_id=1)
    

    db.session.add_all([climberBill, employeeJack, employeeJim, climberTom])
    db.session.commit()
    print("Created 3 Standard Users...")
    
    
def make_gyms():
    Gym.query.delete()
    print("Deleted all Users...")
    
    gym1 = Gym(name="Poplar", street="900 Poplar PI St", city="Seattle", state="WA", zipcode="98144", phone=5555555555)
    gym2 = Gym(name="Fremont",  street="3535 Interlake Ave N", city="Seattle", state="WA", zipcode="98103", phone=5555555555)
    
    db.session.add_all([gym1, gym2])
    db.session.commit()
    print("Created 2 Standard gyms...")

def make_routes():
    Route.query.delete()
    print("Deleted all Routes...")
    
    route_list = []
    route_names = ["Big Cheesey",
                   "The Snail",
                   "TableTop",
                   "The Crab",
                   "Coles Crack",
                   "Strange Persuit",
                   "Gandalf",
                   "Crimp, Slap, Throw",
                   "Spanky", 
                   "Cowardly Lion",
                   "Moon dog",
                   "Bananas", 
                  "Abstraction",
                   "Problem Child", 
                   "Dirty Dude", 
                   "Blood Diamond", 
                   "Pony Ride", 
                   "Cougarmilk",
                   "Kona's Bulge",
                   "Plastic Slapper"]
    
    for each_route in route_names:
        route = Route(name=each_route, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
        route_list.append(route)
    
    db.session.add_all(route_list)
    db.session.commit()
    print("Created routes...")
    
    
def make_likes():
    Like.query.delete()
    
    like1 = Like(user_id=1, route_id=3)
    like2 = Like(user_id=1, route_id=4)
    like3 = Like(user_id=1, route_id=1)
    like4 = Like(user_id=1, route_id=6)
    like5 = Like(user_id=4, route_id=6)
    like6 = Like(user_id=4, route_id=2)
    like7 = Like(user_id=4, route_id=3)
    
    db.session.add_all([like1, like2, like3, like4, like5, like6, like7])
    db.session.commit()
    
def delete_climbs():
    Climb.query.delete()
    print("Delete climb table")
    example_route = Route.query.filter((Route.active ==True) and (Route.gym_id == 1)).first()
    # print(example_route.id)
    oneClimbExammple = Climb(user_video="userVideos/db67025e61fe34a1c157da63f63d1265", user_id = 4, route_id=example_route.id)
    db.session.add(oneClimbExammple)
    db.session.commit()
        
        
    
    # import ipdb; ipdb.set_trace()


if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_gyms()
        make_routes()
        make_likes()
        delete_climbs()
