# Railway Mangement System

## Description

This Repository Contains the Implementation of Railway Management System Built with MERN. Railway Management System is an application built for users to book trains and administrators to run and manage trains.

## Functionalities

- **Guest User:** Can **View** ticket
- **Logged In User :** Can **View/Book/Cancel** ticket, **Change Password** and **Login/Logout** of account.
- **Admin User :** All the powers of the End user and can also **Create / Remove**Trains & **View** all the tickets booked.

## Tech Stack

- **React** - Frontend

- **Express** - Backend/API

- **MongoDB** - Database

- **Redux** - State Management

- **Node** - Runtime

- **Mongoose** - ORM for Database

- **Other Additional Applications Include :**

  - Postman - for API Testing

## Admin Id

Email - admin@gmail.com
Pass - admin123

## Routes

#### AUTH ROUTES

POST: "/api/auth/login"

GET: "/api/auth/logout"

#### BOOKING ROUTES

POST: "/api/book/"

GET: "/api/book/"

GET: "/api/book/:id"

DELETE: "/api/book/:id"

#### USER ROUTES

POST: "/api/user/"

GET: "/api/user/"

GET: "/api/user/book"

GET: "/api/user/:id"

DELETE: "/api/user/:id"

GET: "/api/user/return/current"

POST: "/api/user/changepass"

#### TRAIN ROUTES

GET: "/api/train/"

POST: "/api/train/"

GET: "/api/train/:id"

DELETE: "/api/train/"

# Thank You
