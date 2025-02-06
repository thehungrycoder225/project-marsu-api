# MarSU API Documentation

## Overview

Welcome to the MarSU API documentation. This API is designed to manage and interact with the micro college sites of Marinduque State University. It provides endpoints for accessing and manipulating data related to the university's various campuses, courses, students, and faculty.

## Table of Contents

- [MarSU API Documentation](#marsu-api-documentation)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [Campuses](#campuses)
    - [Courses](#courses)
    - [Students](#students)
    - [Faculty](#faculty)
  - [Error Handling](#error-handling)
  - [Contributing](#contributing)
  - [License](#license)

## Getting Started

To get started with the MarSU API, you will need to have an API key. You can obtain an API key by registering on the MarSU developer portal.

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/project-marsu-api.git
```

Navigate to the project directory:

```bash
cd project-marsu-api
```

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

## Authentication

The MarSU API uses API keys to authenticate requests. You must include your API key in the `Authorization` header of each request:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints
### Base endpoint: /api/v1/

### Campuses

- **GET /campuses**: Retrieve a list of all campuses.
- **GET /campuses/{id}**: Retrieve details of a specific campus.
- **POST /campuses**: Create a new campus.
- **PUT /campuses/{id}**: Update an existing campus.
- **DELETE /campuses/{id}**: Delete a campus.

### Courses

- **GET /courses**: Retrieve a list of all courses.
- **GET /courses/{id}**: Retrieve details of a specific course.
- **POST /courses**: Create a new course.
- **PUT /courses/{id}**: Update an existing course.
- **DELETE /courses/{id}**: Delete a course.

### Students

- **GET /students**: Retrieve a list of all students.
- **GET /students/{id}**: Retrieve details of a specific student.
- **POST /students**: Create a new student.
- **PUT /students/{id}**: Update an existing student.
- **DELETE /students/{id}**: Delete a student.

### Faculty

- **GET /faculties**: Retrieve a list of all faculty members.
- **GET /faculties/{id}**: Retrieve details of a specific faculty member.
- **POST /faculties**: Create a new faculty member.
- **PUT /faculties/{id}**: Update an existing faculty member.
- **DELETE /faculties/{id}**: Delete a faculty member.

### Colleges

- **GET /colleges**: Retrieve a list of all college .
- **GET /colleges/{slug}**: Retrieve details of a specific college.
- **POST /colleges**: Create a new college member.
- **PUT /colleges/{id}**: Update an existing college .
- **DELETE /colleges/{id}**: Delete a college .
  
## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. Common status codes include:

- **200 OK**: The request was successful.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: The request was invalid or cannot be served.
- **401 Unauthorized**: Authentication failed or user does not have permissions.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.

## Contributing

We welcome contributions to the MarSU API. Please fork the repository and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
