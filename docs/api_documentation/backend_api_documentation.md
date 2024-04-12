# CareerCraft.ai Backend API Documentation

## Overview
This documentation describes the backend APIs for CareerCraft.ai, which provide interfaces for user authentication, resume processing, job and course recommendation, and user profile management.

## Authentication APIs

### User Login
`POST /api/auth/login`
Authenticates a user with their Google or GitHub account credentials.

**Parameters**:
- `provider`: `string` - The name of the OAuth provider.
- `token`: `string` - The OAuth token received from the OAuth provider.

**Response**:
- `200 OK`: User successfully authenticated.
- `401 Unauthorized`: Authentication failed.

### User Registration
`POST /api/auth/register`
Registers a new user to the system.

**Parameters**:
- `email`: `string` - The email address of the user.
- `password`: `string` - The password for the account.

**Response**:
- `201 Created`: Account successfully created.
- `409 Conflict`: Email already exists.

## Resume APIs

### Resume Upload
`POST /api/resume/upload`
Uploads and parses the user's resume, then stores it in S3.

**Parameters**:
- `resume`: `file` - The resume file to be uploaded.
- `job_preference`: `string` - The job preference of the user.

**Response**:
- `202 Accepted`: Resume upload initiated.
- `400 Bad Request`: Invalid file format or content.

## Job APIs

### Fetch Matching Jobs
`GET /api/jobs/matching`
Retrieves a list of job listings matching the user's profile from Redis.

**Response**:
- `200 OK`: Returns a list of matching jobs.
- `404 Not Found`: No jobs found.

## Skills and Aspirations APIs

### Set User Aspiration
`POST /api/user/aspirations`
Sets the user's career aspirations.

**Parameters**:
- `aspiration`: `string` - The chosen career aspiration.

**Response**:
- `200 OK`: Aspiration successfully set.
- `400 Bad Request`: Invalid aspiration value.

## Course Recommendation APIs

### Get Course Recommendations
`GET /api/courses/recommendations`
Retrieves courses to address the user's skill gaps.

**Parameters**:
- `skill_gaps`: `string[]` - An array of skills the user lacks.

**Response**:
- `200 OK`: Returns recommended courses.
- `204 No Content`: No recommendations available.

## User Profile APIs

### Update User Skills
`PATCH /api/user/skills`
Updates the skills for the user profile.

**Parameters**:
- `new_skill`: `string` - The new skill acquired by the user.

**Response**:
- `200 OK`: Skills updated successfully.
- `404 Not Found`: User not found.

## Error Handling

### Error Response
`GET /api/error`
Handles errors and provides appropriate feedback to the frontend.

**Response**:
- `500 Internal Server Error`: Returns an error message.


