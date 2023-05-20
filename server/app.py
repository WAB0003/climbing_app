from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from werkzeug.exceptions import NotFound, Unauthorized

from config import app, db, api

from models import db, User, Gym, Like, Route

CORS(app)

#!USER MODEL ROUTES and AUTHENTICATION
#*SIGNUP
@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        formData = request.get_json()                                       #Gather signup form data

        try:
            new_user = User(first_name=formData['first_name'], last_name=formData['last_name'], username=formData['username'], password_hash=formData['password'])
            db.session.add(new_user)
            db.session.commit()
            #Create a cookie for the current user
            session['user_id'] = new_user.id
            
            response = make_response(new_user.to_dict(), 201)
            return response
        except ValueError:
            return {"error": "400: Validation errors"}, 400
            
#* LOGIN     
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        formData = request.get_json()
        # import ipdb; ipdb.set_trace() 
        user = User.query.filter(User.username == formData['username']).first()
        if user and user.authenticate(formData['password']):
            #Add session cookie when loged in
            session['user_id'] = user.id
            response = make_response(user.to_dict(), 200)
            return response
        else:
            raise Unauthorized
         

@app.errorhandler(Unauthorized)
def handle_unauthorized(e):
    response = make_response(
        {"message": "Unauthorized: you must be logged in to make that request."},
        401
    )
    return response 
#* LOGOUT       
@app.route('/logout', methods=['DELETE'])
def logout():
    if request.method == 'DELETE':
        session['user_id'] = None
        response = make_response('', 204)
        return response

#*CheckSession Cookies
@app.route('/checksession', methods=['GET'])
def check_session():
    if request.method == 'GET':
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        return {},401

#*General USER Routes
@app.route('/users/<int:id>', methods=["DELETE", "PATCH"])
def user_by_id(id):
    user = User.query.filter(User.id == id).one_or_none()
    if request.method == "DELETE":
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message":"User Deleted"}, 204
        return {"error": "404: User not found"}, 404
    elif request.method == "PATCH":
        formData = request.get_json()
        if formData is None:
            return {"error": "400: Request body missing"}, 400
        if user:
            for attr in formData:
                setattr(user, attr, formData[attr])
            
            db.session.add(user)
            db.session.commit()
            
            response = make_response(user.to_dict(), 200)
            return response 
        else:
            return {"error": "404: User not found"}, 404


#!GYM
#*ALL GYMS
@app.route('/gyms', methods=[ "GET" , "POST" ])
def gyms():
    if request.method == "GET":
        return [gym.to_dict() for gym in Gym.query.all()]
    elif request.method == "POST":
        formData = request.get_json()
        try:
            new_gym = Gym(
                name=formData.get("name"),
                address=formData.get("address"),
                phone=formData.get("phone")
            )
            db.session.add(new_gym)
            db.session.commit()
            return new_gym.to_dict(), 201
        except ValueError:
            return {"error": "400: Validation errors"}, 400 

#*GYM BY ID
@app.route("/gyms/<int:id>", methods=["GET", "DELETE", "PATCH"])
def gym_by_id(id):
    gym = Gym.query.filter(Gym.id == id).one_or_none()
    if request.method == "GET":
        if gym:
            return gym.to_dict()
        else:
            return {"error": "404: Gym not found"}, 404
    elif request.method == "DELETE":
        if gym:
            db.session.delete(gym)
            db.session.commit()
            return {"message":"Gym Deleted"}, 204
        return {"error": "404: Gym not found"}, 404
    elif request.method == "PATCH":
        formData = request.get_json()
        if formData is None:
            return {"error": "400: Request body missing"}, 400
        if gym:
            for attr in formData:
                setattr(gym, attr, formData[attr])
            
            db.session.add(gym)
            db.session.commit()
            
            response = make_response(gym.to_dict(), 200)
            return response 
        else:
            return {"error": "404: Gym not found"}, 404
        
#!Routes
#*ALL Routes
@app.route('/routes', methods=[ "GET" , "POST" ])
def routes():
    if request.method == "GET":
        return [route.to_dict() for route in Route.query.all()]
    elif request.method == "POST":
        formData = request.get_json()
        # import ipdb;ipdb.set_trace()
        try:
            new_route = Route(
                name=formData.get("name"),
                rating=formData.get("rating"),
                video_url=formData.get("video_url"),
                setter_id=formData.get("setter_id"),
                gym_id=formData.get("gym_id"),
                active=formData.get("active")
            )
            db.session.add(new_route)
            db.session.commit()
            return new_route.to_dict(), 201
        except ValueError:
            return {"error": "400: Validation errors"}, 400 

#*Route BY ID
@app.route("/routes/<int:id>", methods=["GET", "DELETE", "PATCH"])
def route_by_id(id):
    route = Route.query.filter(Route.id == id).one_or_none()
    if request.method == "GET":
        if route:
            return route.to_dict()
        else:
            return {"error": "404: Route not found"}, 404
    elif request.method == "DELETE":
        if route:
            db.session.delete(route)
            db.session.commit()
            return {"message":"Route Deleted"}, 204
        return {"error": "404: Route not found"}, 404
    elif request.method == "PATCH":
        formData = request.get_json()
        if formData is None:
            return {"error": "400: Request body missing"}, 400
        if route:
            for attr in formData:
                setattr(route, attr, formData[attr])
            
            db.session.add(route)
            db.session.commit()
            
            response = make_response(route.to_dict(), 200)
            return response 
        else:
            return {"error": "404: Route not found"}, 404
    
#!LIKES
#*ALL LIKES
@app.route('/likes', methods=[ "GET" , "POST" ])
def likes():
    if request.method == "GET":
        return [like.to_dict() for like in Like.query.all()]
    elif request.method == "POST":
        formData = request.get_json()
        # import ipdb;ipdb.set_trace()
        try:
            new_like = Like(
                user_id=formData.get("user_id"),
                route_id=formData.get("route_id"),
            )
            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict(), 201
        except ValueError:
            return {"error": "400: Validation errors"}, 400 

#*Like BY ID
@app.route("/likes/<int:id>", methods=["GET", "DELETE", "PATCH"])
def like_by_id(id):
    like = Like.query.filter(Like.id == id).one_or_none()
    if request.method == "GET":
        if like:
            return like.to_dict()
        else:
            return {"error": "404: Like not found"}, 404
    elif request.method == "DELETE":
        if like:
            db.session.delete(like)
            db.session.commit()
            return {"message":"Like Deleted"}, 204
        return {"error": "404: Like not found"}, 404
    elif request.method == "PATCH":
        formData = request.get_json()
        if formData is None:
            return {"error": "400: Request body missing"}, 400
        if like:
            for attr in formData:
                setattr(like, attr, formData[attr])
            
            db.session.add(like)
            db.session.commit()
            
            response = make_response(like.to_dict(), 200)
            return response 
        else:
            return {"error": "404: Like not found"}, 404

if __name__ == '__main__':
    app.run(port=5555)
