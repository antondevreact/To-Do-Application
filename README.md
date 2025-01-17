# To-Do-Next

Todo-Next is a modern and efficient web application built with Next.js for managing tasks. The project leverages powerful libraries for form handling, authentication, UI components, and styling to create a seamless user experience.

Repository for fullstack development

## Setup

Pre-add generate and add `ssh` keys. Next, declone this repository with the command below:

### In order to declone a repository using SSH

```bash
 git clone git@github.com:antondevreact/To-Do-Application.git
```

## Commands

`npm install` - to establish dependency

`npm run dev` - to start the project

`next build` - to create a production build of the application

`npm start` - runs an already built application in production mode

`npm run lint` - checks the code for errors and style violations with ESLint

## Docker Compose Commands

`sudo docker compose up` - Builds, (re)creates, starts, and attaches to containers for the application as defined in the `docker-compose.yml` file.

`sudo docker compose up --build` - Forces a rebuild of the application images before starting the containers.

`sudo docker compose down` - Stops and removes containers, networks, images, and volumes created by `docker compose up`.

`sudo docker compose rm` - Removes stopped service containers. Use this command to clean up containers no longer in use. It will prompt you before deleting unless you add the `-f` flag to force removal.

`sudo docker compose images` - Displays a list of images used by the services defined in your `docker-compose.yml` file. This helps you track which images are being used or need to be updated.

## Enviroment variables

```bash
MONGODB_URI=YOUR_MONGODB_URI
JWT_ACCESS_SECRET=YOUR_JWT_ACCESS_SECRET
JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET
API_URL=/api
```

## Database Schemas

The application uses a MongoDB database with the following three models:

### 1. **Users**

This model stores information about the application's users.

- **Fields**:

  - `id` (String): Unique identifier for the user.
  - `email` (String): The user's email address.
  - `password` (String): The hashed password for authentication.
  - `createdAt` (Date): Timestamp of when the user was created.
  - `updatedAt` (Date): Timestamp of the last update to the user's information.

- **Features**:
  - Ensures unique `email` for each user.
  - Used for authentication and task management.

---

### 2. **Todos**

This model manages the tasks created by users.

- **Fields**:

  - `id` (String): Unique identifier for the task.
  - `userId` (String): References the `id` of the user who created the task.
  - `title` (String): The title or name of the task.
  - `isCompleted` (Boolean): Indicates whether the task is completed. Defaults to `false`.
  - `createdAt` (Date): Timestamp of when the task was created.
  - `updatedAt` (Date): Timestamp of the last update to the task.

- **Features**:
  - Tasks are tied to individual users through the `userId` field.
  - Status tracking for task management.

---

### 3. **RefreshTokens**

This model stores refresh tokens for users to enable session persistence and allow token refresh.

- **Fields**:

  - `userId` (ObjectId): References the `id` of the user associated with the token. This field is required.
  - `token` (String): The refresh token used to generate new access tokens. This field is required.
  - `createdAt` (Date): Timestamp of when the token was created.
  - `updatedAt` (Date): Timestamp of the last update to the refresh token (if applicable).

- **Features**:
  - Refresh tokens are used for session management, allowing users to remain authenticated by issuing new access tokens without needing to log in again.
  - Tokens are linked to specific users using the `userId` field.

---

These schemas enable essential features like user authentication, task management, and session handling, all of which are crucial for the smooth operation of the application.
