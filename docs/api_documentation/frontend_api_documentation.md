# CareerCraft.ai Frontend Component API Documentation

## Overview
This document provides detailed API interfaces for the frontend components of CareerCraft.ai. It's designed to assist developers in understanding and using the components within the application.

## Components

### Dashboard
`/components/Dashboard`
Renders the main user dashboard after successful login.

### Job Board
`/components/JobBoard`
Displays available job listings based on the user's skills and preferences.

### Roadmap
`/components/Roadmap`
Visualizes the user's career path and skills roadmap.

### Profile
`/components/Profile`
Manages the user's profile information, including sync with external platforms like LinkedIn.

### Courses
`/components/Courses`
Lists course recommendations for the user to address skill gaps.

### Resume Upload
`/components/ResumeUpload`
Handles the resume upload process and triggers background services for parsing and storage.

### AuthHandler
`/components/auth/AuthHandler`
Central authentication handler for login and signup processes.

### Login
`/components/auth/Login`
Provides the login interface for users via Google or GitHub authentication.

### Logout
`/components/auth/Logout`
Enables users to log out of the application and clear session data.


### Error
`/components/miscellaneous/Error`
Renders error messages and provides feedback on failed operations or issues.

### Loading
`/components/miscellaneous/Loading`
Displays a loading state during asynchronous operations.


### HomePage
`/components/pages/HomePage`
The initial landing page component that users see upon visiting the CareerCraft.ai portal.


### PageConstants
`/components/pages/PageConstants`
Defines constant values and configurations used across different page components.

### Utils
`/components/utils/utils`
A collection of utility functions for common tasks like date formatting, API calls, etc.

### Interfaces
`/types/interfaces`
TypeScript interfaces that define the shape of props, state, and responses for type safety across components.
