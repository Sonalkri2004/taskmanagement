# Task Manager Application

## Overview

The Task Manager is a web application built using React, Vite, and Tailwind CSS. It allows users to efficiently manage tasks with basic features such as adding and deleting tasks, as well as enhanced functionalities like task search, task completion, priority setting, sorting, and UI animations. The app also utilizes local storage to persist data, ensuring that tasks remain available even after the page is refreshed.

## Features

### Basic Features
1. **Task Input**: Users can add tasks with a title.
2. **Task Deletion**: Users can delete tasks from the list.
3. **Task Persistence**: All tasks are stored in the browser's local storage, maintaining task data even after refreshing.

### Stretch Goals
1. **Task Search**: Allows users to search for tasks by title using a search bar.
2. **Task Completion**: Users can mark tasks as completed, visually distinguishing them from pending tasks.
3. **Priority Setting**: Tasks can be assigned a priority level (e.g., High, Medium, Low) for better task organization.
4. **Task Sorting**: Enables users to sort tasks based on criteria like priority or completion status.
5. **UI Animation**: UI animations enhance the user experience when adding, deleting, or updating tasks.

## Tech Stack

- **Framework**: React (with Vite as the bundler for fast development)
- **Styling**: Tailwind CSS
- **Language**: TypeScript/JavaScript (choose one based on preference)

## Setup and Launch Process

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/task-manager.git
    cd task-manager
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3. **Run the Application**:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
   This command will start the development server. You can access the application at `http://localhost:3000`.

## Assumptions Made During Development
- Tasks only have a title and an optional priority setting.
- No user authentication or backend storage is implemented; local storage is used for data persistence.
- Task priority is assumed to have three levels (High, Medium, Low) for simplicity.
- Animations are lightweight to keep the UI responsive.

## Screenshots

### Home Screen
![Task Manager Home Screen](./screenshots/home_screen.png)

### Task with Priority and Search
![Task with Priority and Search](./screenshots/task_priority_search.png)

## Commit and Version Control

Meaningful commits are maintained to ensure each feature and fix can be easily traced. Please refer to the commit history for detailed changes.

## License

This project is developed as part of the ReactJS Development Internship assignment for FLARELINK Pvt Ltd.

---

Thank you for using Task Manager! Feel free to reach out for any questions or suggestions.
