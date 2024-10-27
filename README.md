
# Thought Manager

This is a simple Node.js and Express application for managing "thoughts" or short text entries. Users can create, view, edit, and delete thoughts, and the app includes a basic search functionality.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Endpoints](#endpoints)
- [License](#license)

## Features

- **View Thoughts**: View a list of all thoughts, ordered by date.
- **Search Thoughts**: Search thoughts by title.
- **Create Thought**: Logged-in users can create a new thought.
- **Edit Thought**: Logged-in users can edit their thoughts.
- **Delete Thought**: Logged-in users can delete their thoughts.
- **Dashboard**: Shows thoughts specific to the logged-in user.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **Sequelize**: ORM for managing the SQL database.
- **MySQL**: Database management system.
- **Handlebars**: Template engine for rendering HTML pages.
- **Flash Messages**: Display success/error messages to users.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd thought-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Database**:
   Configure your database in the Sequelize configuration files (`config/config.json`) for development.

4. **Run the Application**:
   ```bash
   npm start
   ```
   The application will start on `http://localhost:3000`.

## Usage

- Access the homepage to see thoughts posted by all users.
- Use the search bar to filter thoughts by title.
- Log in to create, edit, or delete thoughts.
- Go to the Dashboard to manage thoughts specific to the logged-in user.

## Folder Structure

- `controllers/ThoughtController.js`: Contains all functions related to thoughts' CRUD operations.
- `models/Thought.js`: Sequelize model for the "Thought" database table.
- `models/User.js`: Sequelize model for the "User" database table.
- `views/`: Contains all Handlebars templates for rendering pages.
- `config/`: Contains database configuration files.

## Endpoints

- **GET /thoughts/home**: Displays all thoughts, with search and ordering options.
- **GET /thoughts/dashboard**: Displays thoughts specific to the logged-in user.
- **GET /thoughts/create**: Page to create a new thought.
- **POST /thoughts/create**: Saves a new thought to the database.
- **POST /thoughts/remove**: Deletes a thought from the database.
- **GET /thoughts/edit/:id**: Page to edit an existing thought.
- **POST /thoughts/update**: Updates an existing thought in the database.

## License

This project is licensed under the MIT License.
