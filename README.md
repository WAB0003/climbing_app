# Boulder Climb App
## Introduction
As a climber that frequently visits indoor climbing gyms, I’ve always wanted an application to view climbing routes and a way to track/manage my climbing progress. In _Boulder Climb_, I have created a full-stack application for doing just that! In this example application, Boulder Climb is an existing climbing franchise with 2 climbing gyms currently available to climb at: Poplar and Fremont. 

## User Experience
The Boulder Climb App has two distinct user types: _General User_ and an _Employee_. 

### _Employee_
As an Employee of Boulder Climb, I can expect to do the following:
-	View a table of ALL climbing routes at both the Poplar and Fremont Gym locations.
-	Filter between the Gym locations.
-	Sort each route by the columns provided in the table.
-	Add, Edit, or Delete any climbing route information.

In order to view the Employee user page, type in the following credentials under the Login Page of the application:

Username: employeeJim  
password: password  

### _General User_
As a user of Boulder Climb, I can expect to do the following:
- Sign up at the login page if a new user or simply login if an account has already been created.
- Select Preferred gym location
- Navigate between Gyms, Homes, Current Routes, and Climbed Routes in the Navbar located at the top of the page
- View user climbing statistics at home page
- View all Current Routes and the Selected Gym
- “like” or “climb” a route under the current routes page
- Upon clicking the “climb” button on the Current Routes page, a table of Climbed Routes becomes populated with information of each route that the user can always access. Additionally, for each climbing route, there’s an option to “Prove It” in which the user can upload a video of themselves climbing the route to prove that they have indeed climbed the route!

## Starting Application
In order to use this application, the following commands must be completed in the user terminal upon initial startup. Once in the parent directory, *cd* into the `server` directory and type the following commands:

```
python seed.py
python app.py
```

This will establish the backend server so the front end can properly pull the correct information.

Next, open a new terminal and *cd* into the `client` directory. Type the following commands:
```
npm start
```

Immediately following the command listed previously, the web application should start up and you should be able to use *Boulder Climb*!