# Backend API Documentation

## `POST /users/register`

Registers a new user and returns an authentication token along with the created user object.

### Description
This endpoint creates a new user account using the provided email, password, and full name fields. The password is hashed before storing, and a JWT token is returned for the newly created user.

### Request URL
`POST /users/register`

### Request Body
Content-Type: `application/json`

```json
{
  "email": "user@example.com",
  "password": "yourStrongPassword",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Required Fields
- `email` (string) - must be a valid email address
- `password` (string) - minimum 8 characters
- `fullName.firstName` (string) - minimum 3 characters, maximum 30 characters
- `fullName.lastName` (string) - minimum 3 characters, maximum 30 characters

### Success Response
- Status: `201 Created`
- Body:
  - `token` (string): JWT authentication token
  - `user` (object): created user data

Example response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "...",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

### Error Responses
- Status: `400 Bad Request`
  - validation errors for missing fields or invalid values
- Status: `500 Internal Server Error`
  - unexpected server failure

### Notes
- `password` is stored hashed and is not returned in the response.
- Ensure `JWT_SECRET` is configured in environment variables for token generation.

## `POST /users/login`

Authenticates an existing user and returns a JWT authentication token on success.

### Description
This endpoint checks the submitted email and password against stored user credentials. On successful authentication, it returns an auth token for the user.

### Request URL
`POST /users/login`

### Request Body
Content-Type: `application/json`

```json
{
  "email": "user@example.com",
  "password": "yourStrongPassword"
}
```

### Required Fields
- `email` (string) - must be a valid email address
- `password` (string) - minimum 8 characters

### Success Response
- Status: `200 OK`
- Body:
  - `token` (string): JWT authentication token
  - `user` (object, optional): authenticated user data if returned by the endpoint

Example response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "...",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

### Error Responses
- Status: `400 Bad Request`
  - invalid email, invalid password length, or missing credentials
- Status: `401 Unauthorized`
  - incorrect email or password
- Status: `500 Internal Server Error`
  - unexpected server failure

### Notes
- `password` is never returned in the response.
- Ensure `JWT_SECRET` is configured in environment variables for token generation.
