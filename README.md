# Virtual Classroom Application

A comprehensive web application for managing virtual classrooms, designed for administrators, instructors, and students. It allows for class management, unit (book) and session (chapter) handling, lecture access, and student enrollment.

## Features

### User Roles

- **Administrator**: Can manage users and classes.
- **Instructor**: Can manage classes and their content.
<!-- - **Student**: Can enroll in classes and access course materials. -->

### Application Components

1. **User Management**

   - **User Roles**: Admin, Instructor, Student.
   - **User Authentication**: Sign up, login, and role-based access control.
   - **Password Management**: Passwords are hashed for security.

2. **Class Management**

   - **Create and Manage Classes**: Administrators and instructors can create and update classes.
   - **Class Structure**: Each class can have multiple units (books) and sessions (chapters).
   - **Lecture Access**: All users can access lectures within sessions.

3. **Unit and Session Management**

   - **Units (Books)**: Can be added to classes.
   - **Sessions (Chapters)**: Can be added under units.

4. **Lecture Management**

   - **Create and Manage Lectures**: Lectures can be created under sessions.
   - **Lecture Discussions**: Users can comment on lectures with nested replies.

5. **Enrollment Management**
   - **Enroll Students**: Only enrolled students can join classes.
   - **Enrollment Validation**: Ensures that users must be enrolled to access class materials.

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB
- **Containerization**: Docker

## Project Setup

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ayushmaan32/Virtual-classroom-backend
   cd virtual-classroom
   ```
