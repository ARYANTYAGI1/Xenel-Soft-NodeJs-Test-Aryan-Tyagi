A simple Node.js REST API for user registration and authentication built with Express.js and MongoDB.
- User registration with email validation
- Password hashing with bcrypt
- JWT token-based authentication
- MongoDB database integration
- CORS enabled
- Input validation and error handling

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository:**
   
   git clone https://github.com/ARYANTYAGI1/Xenel-Soft-NodeJs-Test-Aryan-Tyagi.git
   cd NodeJsTest
   

2. **Install dependencies:**
   
   npm install
   

3. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Update the environment variables in `.env`:
     env
     PORT=3001
     MONGO_URI=mongodb://127.0.0.1:27017/node-test
     JWT_SECRET=your_jwt_secret_key_here
     

4. **Start MongoDB:**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGO_URI` accordingly.

## Running the Application

### Development Mode
npm start

This will start the server with nodemon for automatic restarts on file changes.



The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

## Documentation

### Base URL

http://localhost:3001/api