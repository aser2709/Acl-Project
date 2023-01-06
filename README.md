
# Udemyplus

This project is to create an Online Learing System similar to Coursea and Udemy.


## Collaborators
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

## Features

We have four different types of users: Individual trainees, Corporate trainees, Instructors and Admins.
Our web application offers a smooth process of online education by providing a user experience that fosters satisfiability, efficiency, learnability and visibility.
Some examples of this is seen in registration process of the courses. 
Furthermore, navigation is always reversible; the app allows the users to go back and change a previously made choice.
We also allow for immediate feedback for example the user is sent a confirmation message upon any action taken.

<br></br>
<br></br>

<ins>**1. Main website features for a Trainee:**</ins>
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









<br></br>
<br></br>





<ins>**2.Main website features for an Admin:**</ins>
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








<br></br>
<br></br>






<ins>**3.Main website features for an Instructor:**</ins>
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


##  How To Run

### Port Numbers
- Backend:
     - server.js runs on port `4000` 
- Frontend: 
    -  App.js runs on port `3000`
## Deployment

To deploy this project run

```bash
Open 2 terminals:

  a. In the first terminal run `cd backend` and then `node server.js`

  b. In the second terminal run `cd frontend` then `npm start`

```


## API Reference

Here are some References but not all

#### Get all courses

```http
  GET /api/courses/courses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get a course

```http
  GET /api/courses/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create a new Course

```http
  Post /api/courses/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`              | `string` | **Required**. title of Course to fetch |
| `subtitle`           | `string` | **Required**. subtitle of Course to fetch |
| `price`              | `string` | **Required**. price of Course to fetch |
| `discount`           | `string` | **Required**. discount of Course to fetch |
| `short Summary`      | `string` | **Required**. short Summary of Course to fetch |
| `Instructor`         | `string` | **Required**. Instructor of Course to fetch |
| `Rating`             | `string` | **Required**. Rating of Course to fetch |
| `Subject`            | `string` | **Required**. Subject of Course to fetch |
| `Total Course Hours` | `string` | **Required**. Total Hours of Course to fetch |
| `Video Preview`      | `string` | **Required**. link of Course to fetch |


#### Login A User

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Email`      | `string` | **Required**. Email of user |
| `Password`      | `string` | **Required**. Password of user  |

#### User change Password

```http
  Patch /api/user/change_password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Old Password`      | `string` | **Required**. Old Password of User to fetch |
| `New Password`      | `string` | **Required**. New Password of User to fetch |


#### Add a registered course to a User

```http
  Patch /api/user/registerCourse
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Course`      | `Object` | **Required**. Includes all necessary information of Course to fetch  |
| `Email`      | `string` | **Required**. Email of User to fetch |


#### Get all Reports

```http
  GET /api/reports/allReports
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Create a new Report

```http
  Post /api/reports/createReport
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_email`      | `string` | **Required**. Email of user to fetch |
| `course_id`      | `string` | **Required**. Id of Course to fetch |
| `course_name`      | `string` | **Required**.  Name of Course to fetch |
| `Type`      | `string` | **Required**. Type of Problem to fetch |
| `Body`      | `string` | **Required**. Description of Problem |














## Installation

Initially, run `npm init` and `npm i` in the terminal to download all node modules and install some basic libraries.


# Libraries

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
 To provide database access for Udemyplus, we used mongoose (a MongoDB object modeling tool designed to work in an asynchronous environment).
 We have 6 models:
- User 
- Admin
- Course
- Report
- Request
- Result

## Tech Stack

**Client:** React

**Server:** Node, Express , Mongodb

# Credits
- [Web Dev Simplified Youtube Channel](https://www.youtube.com/@WebDevSimplified)
- [The Net Ninja Youtube Channel](https://www.youtube.com/@NetNinja)

## License

[MIT](https://choosealicense.com/licenses/mit/)

