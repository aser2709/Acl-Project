# Udemyplus
# Collaborators:
- [Yousef Mohamed Hassan](https://www.github.com/usef2081)  _( Scrum Master )_
- [Aser Ashraf](https://github.com/aser2709) 
- [Kareem Emad](https://github.com/KareemEmad1) 
- [Abdelrahman Mamdouh](https://github.com/Abdelrahmansharaky)  
- [Ahmed Osama](https://github.com/ahmeddos)


# Motivation
This project’s goal was to implement an Online Education system using the Agile Methodology split into three sprints, following the assigned System Requirements and implementing it using the MERN Stack (MongoDB, Express.js, React and Node.js).

<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" width="125">
</a>
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" width="125">
</a>
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" width="125">
</a>
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" width="125">
</a>
</div>


# Features

We have four different types of users: Individual trainees, Corporate trainees, Instructors and Admins.
Our web application offers a smooth process of online education by providing a user experience that fosters satisfiability, efficiency, learnability and visibility.
Some examples of this is seen in registration process of the courses. 
Furthermore, navigation is always reversible; the app allows the users to go back and change a previously made choice.
We also allow for immediate feedback for example the user is sent a confirmation message upon any action taken.






Main website features for a Trainee:
- Sign Up
- Log In
- Change Password
- Single Course Preview
- Online payment for a course using a CreditCard
- Register for a course





{SignUp}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/SignUp.JPG" width="300">
</a>

{Change Password}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/Change%20Password.JPG" width="300">
</a>

{Courses}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/Courses.JPG" width="300">
</a>

{Single Course Preview}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/Single Course Preview.JPG" width="300">
</a>

{UnAuthorized Page}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/UnAuthorized Page.JPG" width="300">
</a>

{Register For a Course}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/Register for Course.JPG" width="300">
</a>

{Payment for a course}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/Payment for a course.JPG" width="300">
</a>

{Registered Courses}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/User/Registered Courses.JPG" width="300">
</a>







Main website features for an Admin:
- Add another admin
- Add user
- Respond to Courses Access requests
- Act on Reported Problems



{Add Admin}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Admin/Add%20Admin.JPG" width="300">
</a>

{Add User}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Admin/Add%20User.JPG" width="300">
</a>

{Access Request}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Admin/Access%20Request.JPG" width="300">
</a>

{Reported Problems}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Admin/Reported%20Problems.JPG" width="300">
</a>








Main website features for an Instructor:
- Add a Course
- Change his Biography and Email
- Create a Quiz 
- Change his password
- View his Courses





{Add Course}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Instructor/Add%20Course.JPG" width="300">
</a>

{Change Biography & email}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Instructor/Change%20Biography%20%26%20email.JPG" width="300">
</a>

{Create Quiz}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Instructor/Create%20Quiz.JPG" width="300">
</a>

{ForgetPassword}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Instructor/ForgetPassword.JPG" width="300">
</a>

{Change Forgot Password}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Instructor/Forgot%20Password.JPG" width="300">
</a>

{Instructor Courses}

<a> <img src="https://github.com/aser2709/Acl-Project/blob/main/frontend/src/assets/screenshot/Instructor/Instructor%20Course.JPG" width="300">
</a>
























# How to Run

### Port Numbers
- Backend:
     - server.js runs on port `4000` 
- Frontend: 
    -  App.js runs on port `3000`

### Which files to run

Open 2 terminals:

  a. In the first terminal run `cd backend` and then `node server.js`

  b. In the second terminal run `cd frontend` then `npm start`



# Libraries
Initially, run `npm init` and `npm i` in the terminal to download all node modules and install some basic libraries.

   - express
   - cors
   - Body-parser
   - jsonwebtoken
   - stripe 
   - bcrypt
   - axios
   - mongoose
    - material ui components
  - react-router-dom
  - react-scripts
  - react-country-region-selector
  - react-seat-picker
  - react-stripe-checkout
  - react-toastify
  - jquery
  
  
  
  # Database
 To provide database access for Coree, we used mongoose (a MongoDB object modeling tool designed to work in an asynchronous environment).
 We have 6 models:
- User 
- Admin
- Course
- Report
- Request
- Result


# Credits
- [Web Dev Simplified Youtube Channel](https://www.youtube.com/@WebDevSimplified)
- [The Net Ninja Youtube Channel](https://www.youtube.com/@NetNinja)





