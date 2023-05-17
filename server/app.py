from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from werkzeug.exceptions import NotFound, Unauthorized

from config import app, db, api

from models import db, User

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
            

if __name__ == '__main__':
    app.run(port=5555)
