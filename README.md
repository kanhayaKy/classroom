# Capstone

# classroom
A classroom like web application for creating classroom and posting assignments


# Steps to start the project
- Clone the repository locally and navigate into it
- Install the requirements using `pip install -r requirements.py` 
- Start the python server `python manage.py runserver`
- Open a new terminal and navigate to the frontend directory of the project
- Install the dependencies using `npm install`
- Start the react project by `npm start`

# Understanding 

The project consists of a django project `capstone` that contains an app called `classroom` and a react project `frontend` 

#### Classroom 
- `urls.py` consists of all the api endpoints available for the frontend application , each api is described in detail in the next section
- `models.py` has all the models defined for the project , it has 4 models `User` `ClassRoom` `Material` `Stream`
- `serializers.py` Consists of serialisers for each model. Django’s serialization framework provides a mechanism for “translating” Django models into other formats. Usually these other formats will be text-based and used for sending Django data over a wire, but it’s possible for a serializer to handle any format (text-based or not).
- `utils.py` contains a utilty function required for authentication
- `views.py` Contains the views for different api endpoints


#### Frontend
The frontend of this application is made using `ReactJs` which follows the reqular file structure of a react app. `frontend/public` has an `index.html` file which is the main page for the application and all the components get's injected into it. 
`frontend/src/App.js` controls the entire application and has the necessary functions. `frontend/src/components` consits of different components required that are rendered into the page. 
`frontend/package.json` contains the dependencies required for the project. 

The `materials` folder contains the static data that will be uploaded into the application

# API:
- `GET /users`: sending a `GET` request to  `/users` will return the list of users.
- `POST /users`: sending a `POST` request to  `/users` will add the user to the list of users.

- `GET /users/<int:id>`: sending a `GET` request to  `/users/id` will return the details of the user with the id equal to `id`.

- `PUT /users/<int:id>`: sending a `Put` request to  `/users/id` will update the details of the user with the id equal to `id`.

- `GET /classroom`: sending a `GET` request to  `/materials` will return  the list of classes.

- `POST /classroom`: sending a `POST` request to  `/materials` will add the classroom to the database.

- `PUT /classroom/<int:id>`: sending a `Put` request to  `/users/id` will update the details of the user with the id equal to `id`.

- `GET /materials`: sending a `GET` request to  `/materials` will return  the list of materials.

- `POST /materials`: sending a `POST` request to  `/materials` will add the material to the database.


# Distinctiveness and Complexity:

This project is implemented using python , Javascript , React , HTML ,CSS  that allows the students/ teachers to maintain their classrooms , assignments and study materials. This project is more complex than the rest of the projects because the frontend is made using Javascripts React library.The distinctiveness of this project can be seen in the specifications of the project that are listed below 

- #### Login & Registration
    - A new user can register themselves to the site using the required credentials , they should select their role compulsorily if they are a faculty they have to enter a faculty id else they have to provide a student id . 
    - A login page should lead the users to their home page . 

- #### Home page
    - The faculties home page will show all the classes she teaches , they also will have an option to create a new classroom.
    - similarly the student's home page will show all the classrooms they are enrolled in and will have an option to join a new classroom. 
	
- #### Create Page
    - This page should have a form that allows a faculty to create a new classroom 

- #### Join Page
    - The same page should load another form for the students to join the classroom using the classroom's code.

- #### Classroom page
    - This is the main page for the classroom , it has an option to view all the students and the faculty of that classroom .
    - It has an assignments section where the students can see all the assignments , clicking on each assignment will take them to a page where they can see the details of the assignment and will be able to submit the the same.
    - ##### Create Assignment
        The faculty will have an option to create an assignment.
   
    - ##### Delete Classroom 
        faculty should have an option to close the class , after which the classroom becomes inactive.
    