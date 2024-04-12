# CareerCraft.ai AI Components API Documentation

## Overview
The AI components of CareerCraft.ai involve machine learning models and algorithms that provide insights, recommendations, and analyses. This document outlines the API endpoints that interface with our AI services.

## Resume Parsing API

### Parse Resume
`POST /ai/resume/parse`
Extracts skills and experiences from the uploaded resume.

**Request Body**:
- `resume`: `file` - The resume document to be parsed.

**Response**:
- `200 OK`: Returns extracted skills and experiences.
- `400 Bad Request`: Resume format is not supported or content is invalid.

## Job Recommendation API

### Match Jobs
`GET /ai/jobs/match`
Provides job recommendations based on the user's skills and preferences.

**Query Parameters**:
- `skills`: `string[]` - List of user's skills.
- `location`: `string` - (Optional) Location preference for job search.

**Response**:
- `200 OK`: Returns a list of matched job recommendations.
- `404 Not Found`: No matching jobs found.

## Skill Gap Analysis API

### Analyze Skill Gaps
`POST /ai/skill/gap-analysis`
Identifies skill gaps between the user's current skill set and the desired job role.

**Request Body**:
- `current_skills`: `string[]` - Current skills of the user.
- `desired_role`: `string` - The aspirational job role.

**Response**:
- `200 OK`: Returns a list of skills that the user needs to acquire.
- `204 No Content`: No skill gaps identified.

## Course Recommendation API

### Recommend Courses
`GET /ai/courses/recommend`
Suggests courses to fill the identified skill gaps for the user.

**Query Parameters**:
- `skill_gaps`: `string[]` - Identified skill gaps that need to be filled.

**Response**:
- `200 OK`: Returns a list of recommended courses with details.
- `204 No Content`: No course recommendations available based on the skill gaps.

## Skill Update API

### Update Skill Set
`PUT /ai/user/skill-set`
Updates the user's skill set with newly acquired skills from completed courses.

**Request Body**:
- `user_id`: `string` - Unique identifier for the user.
- `new_skills`: `string[]` - Newly acquired skills to add to the user's profile.

**Response**:
- `200 OK`: User's skills updated successfully.
- `400 Bad Request`: Invalid user ID or skill set format.
