# Blogging Web Application

## Overview

This project is a full-stack web application that allows users to create, edit, view, and delete blog posts. The application features user authentication, enabling users to manage their blogs securely. It is built using React for the frontend and Node.js with Express for the backend, and it is connected to a MongoDB database.

## Features

- **User Authentication**: Users can sign up, log in, and manage their session.
- **CRUD Operations for Blogs**: Users can create, read, update, and delete blog posts.
- **Responsive UI**: The application features a modern, responsive UI built with Material-UI.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A React UI framework for designing modern interfaces.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **React Router**: A library for handling routing in React applications.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user and blog data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. You can download it [here](https://nodejs.org/).
- **MongoDB**: You need a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies for both frontend and backend**:
   - Install backend dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory with the following content:
     ```bash
     MONGO_URL=<Your MongoDB URL>
     PORT=5000
     ```
   - Replace `<Your MongoDB URL>` with your MongoDB connection string.

### Running the Application

1. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**:
   ```bash
   cd ../frontend
   npm start
   ```

3. **Open the application**:
   - Frontend: Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Backend API: The backend server runs on [http://localhost:5000](http://localhost:5000).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- **React**: For providing a robust framework for building UIs.
- **Material-UI**: For the beautiful UI components.
- **Node.js and Express**: For powering the backend of the application.
- **MongoDB**: For the flexible and scalable database solution.
