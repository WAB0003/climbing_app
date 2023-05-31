#!/usr/bin/env python3

from random import randint, choice

from faker import Faker

from app import app
from models import db, User, Gym, Like, Route, Climb

fake = Faker()

def make_users():

    User.query.delete()
    print("Deleted all users...")
    climberBill = User(first_name="Bill", last_name="Brown", username="climberBill", password_hash="password", current_gym_id=1)
    employeeJack = User(first_name="Jack", last_name="Daniels", username="employeeJack", admin=True, password_hash="password", current_gym_id=1)
    employeeJim = User(first_name="Jim", last_name="Beam", username="employeeJim", admin=True, password_hash="password", current_gym_id=2)
    climberTom = User(first_name="Tom", last_name="Jones", username="climberTom", password_hash="password", current_gym_id=1)
    

    db.session.add_all([climberBill, employeeJack, employeeJim, climberTom])
    db.session.commit()
    print("Created 4 standard users...")
    
    
def make_gyms():
    Gym.query.delete()
    print("Deleted all users...")
    
    gym1 = Gym(name="Poplar", street="900 Poplar PI St", city="Seattle", state="WA", zipcode="98144", phone=5555555555)
    gym2 = Gym(name="Fremont",  street="3535 Interlake Ave N", city="Seattle", state="WA", zipcode="98103", phone=5555555555)
    
    db.session.add_all([gym1, gym2])
    db.session.commit()
    print("Created 2 standard gyms...")

def make_routes():
    Route.query.delete()
    print("Deleted all routes...")
    
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
                   "Plastic Slapper", 
                   "Shoulder Bone",
                   "No Goin Back",
                   "The Doozy", 
                   "Cliff Hanger",
                   "Plot Twist",                    
                   ]
    
    for each_route in route_names:
        route = Route(name=each_route, rating=randint(0,6), video_url="video url", setter_id=choice([2,3]), gym_id=choice([1,2]), active=choice([True, False]))
        route_list.append(route)
    
    db.session.add_all(route_list)
    db.session.commit()
    print(f'{len(route_names)} routes created...')
    
    
def make_likes():
    Like.query.delete()
    print("Delete existing likes table...")
    
    like1 = Like(user_id=1, route_id=3)
    like2 = Like(user_id=1, route_id=4)
    like3 = Like(user_id=1, route_id=1)
    like4 = Like(user_id=1, route_id=6)
    like5 = Like(user_id=4, route_id=6)
    like6 = Like(user_id=4, route_id=2)
    like7 = Like(user_id=4, route_id=3)
    
    db.session.add_all([like1, like2, like3, like4, like5, like6, like7])
    db.session.commit()
    print("created some likes...")
    
def delete_climbs():
    Climb.query.delete()
    print("Delete climb table...")
    Bill_active_routes = Route.query.filter((Route.active ==True) and (Route.gym_id == 1)).all()
    # print(example_route.id)
    oneClimbExammple = Climb(user_video="userVideos/xzobitatj9ifzjx5insk", user_id = 1, route_id=Bill_active_routes[0].id)
    twoClimbExammple = Climb(user_video="userVideos/zdawjf772wf9ldo8bab6", user_id = 1, route_id=Bill_active_routes[1].id)
    threeClimbExammple = Climb(user_video="userVideos/f2odjzxi2u86jogucl7k", user_id = 1, route_id=Bill_active_routes[2].id)
    db.session.add_all([oneClimbExammple, twoClimbExammple,threeClimbExammple])
    db.session.commit()
    
    print("created some climbs for climber Bill...")
        
        
    
    # import ipdb; ipdb.set_trace()


if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_gyms()
        make_routes()
        make_likes()
        delete_climbs()
