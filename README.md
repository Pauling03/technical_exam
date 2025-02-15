# technical_exam

# Laravel-React Application

This project is a full-stack application using Laravel as the backend framework and ReactJS as the frontend. The backend exposes RESTful APIs, and the frontend communicates with it using those APIs.

## Prerequisites

Make sure you have the following installed:

- [PHP 8.1+](https://www.php.net/downloads)
- [Composer](https://getcomposer.org/download/)
- [Node.js (16+)](https://nodejs.org/en/download/)
- [Xampp](https://www.apachefriends.org/download.html)
- [Git](https://git-scm.com/)

## Installation Instructions

### 1. Clone the Repository

git clone https://github.com/Pauling03/technical_exam.git

cd technical_exam

### 2. Backend Setup (Laravel)

# Navigate to the backend directory
cd backend

# Install dependencies
composer install or composer i

# Copy .env.example to .env
run copy .env.example .env in cmd or manually copy the .env.example to .env

# Open Xampp
 start Apache and MySQL

# Generate the application key
php artisan key:generate

# Run migrations and seed a user into the database
php artisan migrate --seed

# Run this to seed the products
php artisan db:seed --class=ProductSeeder

# Start the development server
php artisan serve


# Run Migration in Test Database
php artisan migrate --env=testing

# Run Unit Test
php artisan test

# The credential can be use to log into the system:
    email : paul@gmail.com
    password : password

### 3. Frontend Setup (REACTJS)

# Open an another terminal
cd frontend

# Install dependencies
npm install or npm i

# Start the development server:
npm run dev

### CREDENTIALS MAY USE IN TESTING ###
 email: paul@gmail.com
 password: password