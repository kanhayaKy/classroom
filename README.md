# Capstone

# classroom
A classroom like web application , which uses django at the backend and react in the front end 

# Steps to start the project
- Clone the repository locally and navigate into it
- Install the requirements using `pip install -r requirements.py` 
- Start the python server `python manage.py runserver`
- Open a new terminal and navigate to the frontend directory of the project
- Install the dependencies using `npm install`
- Start the react project by `npm start`

  

### Specifications:

This project is implemented using python , Javascript , React , HTML ,CSS  that allows the students/ teachers to maintain their classrooms , assignments and study materials. 

- #### Login & Registration
    - A new user can register themselves to the site using the required credentials , they should select their role compulsorily if they are a faculty they have to enter a faculty id else they have to provide a student id . 
    - A login page should lead the users to their home page . 

- #### Home page
    - The faculties home page will show all the classes she teaches , they also will have an option to create a new classroom.
    - similarly the student's home page will show all the classrooms they are enrolled in and will have an option to join a new classroom. 
	
- #### Create Page
    - This page should have a form that allows a faculty to create a new classroom 
    - The same page should load another form for the students to join the classroom using the classroom's code.

- #### Classroom page
    - This is the main page for the classroom , it has an option to view all the students and the faculty of that classroom .
    - It has an assignments section where the students can see all the assignments , clicking on each assignment will take them to a page where they can see the details of the assignment and will be able to submit the the same.
    - The faculty will have an option to create an assignment.
    -  Announcements / Notification section for important updates about the class . 
    - faculty should have an option to close the class , after which the classroom becomes inactive.
    