from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

#!USER MODEL
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules = ("-created_at", 
                       "-updated_at",
                       
                       "-current_gym_id",
                       "-current_gym.address",
                       "-current_gym.phone",
                       "-current_gym.users",
                       "-current_gym.routes,",
                       
                       "-routes.rating",
                       "-routes.video_url",
                       "-routes.setter_id",
                       "-routes.gym_id",
                       "-routes.gym",
                       "-routes.setter",
                       "-routes.likes",
                       
                        "-likes.user_id",
                       "-likes.created_at",
                       "-likes.updated_at",
                       "-likes.route",
                       "-likes.user", 
                       
                       "-climbs.user_id",
                       "-likes.route",
                       "-likes.user"              
                    )

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    current_gym_id = db.Column(db.Integer, db.ForeignKey("gyms.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    current_gym = db.relationship("Gym", back_populates="users")
    routes = db.relationship("Route", back_populates="setter")
    likes = db.relationship("Like", back_populates="user")
    climbs = db.relationship("Climb", back_populates="user")
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    #*Create a method that uses bycrypt built in check_password_hash    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self,key,username_value):
        all_usernames = User.query.all()
        if username_value in all_usernames:
            raise ValueError("Username must be unique")
        return username_value

    def __repr__(self):
        return f'<User {self.username}>'

#!Route Model
class Route(db.Model, SerializerMixin):
    __tablename__ = 'routes'
    
    serialize_rules = ("-created_at", 
                       "-updated_at",
                       
                       "-gym_id",
                       "-gym.address",
                       "-gym.phone",
                       "-gym.users",
                       "-gym.routes",
                       
                       "-setter_id",
                       "-setter._password_hash",
                       "-setter.current_gym_id",
                       "-setter.current_gym",
                       "-setter.routes",
                       "-setter.likes",
                       
                       "-likes.created_at",
                       "-likes.updated_at",
                       "-likes.route_id",
                       "-likes.user",
                       "-likes.route",
                       
                       "-climbs.route_id",
                       "-climbs.user",
                       "-climbs.route"
                    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    rating = db.Column(db.Integer)
    video_url = db.Column(db.String)
    setter_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    gym_id = db.Column(db.Integer, db.ForeignKey("gyms.id"))
    active = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #*Needs relationship with likes, gym, and setter

    gym = db.relationship("Gym", back_populates="routes")
    setter = db.relationship("User", back_populates="routes")
    likes = db.relationship("Like", back_populates="route")
    climbs = db.relationship("Climb", back_populates="route")
    
    def __repr__(self):
            return f'<Route {self.name}>'


#!GYM Model
class Gym(db.Model, SerializerMixin):
    __tablename__ = 'gyms'
    
    serialize_rules = ("-created_at", 
                       "-updated_at",
                       
                       "-users",
                       "-routes")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    street = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zipcode = db.Column(db.String)
    phone = db.Column(db.Integer)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    users = db.relationship("User", back_populates="current_gym")
    routes = db.relationship("Route", back_populates="gym")
    
    def __repr__(self):
        return f'<Gym {self.name}>'
    
    
#!Like Join Table
class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'
    
    serialize_rules = ( "-route.active",
                        "-route.gym", 
                        "-route.likes", 
                        "-route.rating",
                        "-route.setter",
                        "-route.video_url",
                        "-route.climbs",
                        "-route_id",
                        
                        "-user._password_hash",
                        "-user.admin",
                        "-user.current_gym",
                        "-user.likes",
                        "-user.routes",
                        "-user.climbs",
                        "-user_id"           
                       
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    route_id = db.Column(db.Integer, db.ForeignKey("routes.id"))
    
    route = db.relationship("Route", back_populates="likes")
    user = db.relationship("User", back_populates="likes")
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def __repr__(self):
        return f'<Like {self.id}>'
    
    
#!CLIMBED Join Table
class Climb(db.Model, SerializerMixin):
    __tablename__ = 'climbs'
    
    serialize_rules = ( "-route.active",
                        "-route.likes", 
                        "-route.video_url",
                        "-route.climbs",
                        "-route_id",
                        "-route.setter.username",
                        "-route.setter.climbs",
                        "-route.setter.admin",
                        
                        "-user._password_hash",
                        "-user.admin",
                        "-user.current_gym",
                        "-user.likes",
                        "-user.routes",
                        "-user.climbs",
                        "-user_id"           
                       
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    route_id = db.Column(db.Integer, db.ForeignKey("routes.id"))
    user_video = db.Column(db.String)
    
    route = db.relationship("Route", back_populates="climbs")
    user = db.relationship("User", back_populates="climbs")
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def __repr__(self):
        return f'<Like {self.id}>'