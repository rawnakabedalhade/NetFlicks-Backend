# Getting Started with NetFlicks App Server

## Installation

Enter the server folder

```bash
cd server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.
- You must have a mongoDB Atlas Cluster

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be purple with the message:

`Listening on: http://localhost:5000`

And if there are no login errors you should see the message painted in purple:

`connected to MongoDb Locally!`

## Available Routes

Here you can find API addresses that the server will respond to as well as what should be sent to them in the body of the HTTP request and what permissions are required to receive a response from a specific API

### Users API

#### API for Register a new user

```http
  POST /api/users
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index      | type    | index       | type   | min | max | remark   |
| ---------- | ------- | ----------- | ------ | --- | --- | -------- |
| name       | object  |             |        |     |     | required |
|            |         | first       | string | 2   | 256 | required |
|            |         | middle      | string | 2   | 256 |          |
|            |         | last        | string | 2   | 256 | required |
| phone      | string  |             |        | 9   | 11  | required |
| email      | string  |             |        | 5   |     | required |
| password   | string  |             |        | 7   | 20  | required |
| image      | object  |             |        |     |     |          |
|            |         | url         | string | 14  |     |          |
|            |         | alt         | string | 2   | 256 |          |
| address    | object  |             |        |     |     | required |
|            |         | state       | string | 2   | 256 |          |
|            |         | country     | string | 2   | 256 | required |
|            |         | city        | string | 2   | 256 | required |
|            |         | street      | string | 2   | 256 | required |
|            |         | houseNumber | number | 2   | 256 | required |
|            |         | zip         | number | 2   | 256 | required |
| isBusiness | boolean |             |        |     |     | required |

- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "image/url" must be a standard URL

#### API for Login a user

```http
  POST /api/users/login
```

### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 5   |     | required |
| password | string | 7   | 20  | required |

- "email" must be a standard email
- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-

### Response

If the user is in the database and the password sent is correct, a token will be returned and the following object can be extracted from it with the help of the jwt-decode library

| index      | type    |
| ---------- | ------- |
| \_id       | string  |
| isBusiness | boolean |
| isAdmin    | boolean |

#### API for Information about all the users

```http
  GET /api/users
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be Admin type user to get an answer from this api

#### API for Information about a user

```http
  GET /api/users/:id
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin type user to get an answer from this api

#### API for Updating User information

```http
  PUT /api/users/:id
```

### Request

In the request body you will need to provide an object with the following keys and values

| index      | type    | index       | type   | min | max | remark   |
| ---------- | ------- | ----------- | ------ | --- | --- | -------- |
| name       | object  |             |        |     |     | required |
|            |         | first       | string | 2   | 256 | required |
|            |         | middle      | string | 2   | 256 |          |
|            |         | last        | string | 2   | 256 | required |
| phone      | string  |             |        | 9   | 11  | required |
| email      | string  |             |        | 5   |     | required |
| password   | string  |             |        | 7   | 20  | required |
| image      | object  |             |        |     |     | required |
|            |         | url         | string | 14  |     | required |
|            |         | alt         | string | 2   | 256 | required |
| address    | object  |             |        |     |     | required |
|            |         | state       |        | 2   | 256 |          |
|            |         | country     |        | 2   | 256 | required |
|            |         | city        |        | 2   | 256 | required |
|            |         | street      |        | 2   | 256 | required |
|            |         | houseNumber |        | 2   | 256 | required |
|            |         | zip         |        | 2   | 256 | required |
| isBusiness | boolean |             |        |     |     | required |

- The user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this api
- You need to be Admin to get an answer from this api

#### API for deleting a user

```http
  DELETE /api/users/:id
```

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin to get an answer from this api

#### API for changing user business status

```http
  PATCH /api/users/:id
```

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin to get an answer from this api

### Movies API

#### API to get all Movies

```http
  GET /api/movies/
```

#### API for get a specific movie

```http
  GET /api/movies/:id
```

#### API for receive all movies of the registered user

```http
  GET /api/movies/my-movies
```

- You will need to provide a token to get an answer from this api

#### API for create a new movie

```http
  POST /api/movies/
```

### Request

In the request body you will need to provide an object with the following keys and values

| index       | type   | index  | type   | min  | max  | remark   |
| ----------- | ------ | ------ | ------ | ---- | ---- | -------- |
| title       | string |        |        | 2    | 256  | required |
| description | string |        |        | 2    | 1024 | required |
| year        | number |        |        | 1900 | 2024 | required |
| category    | array  | string |        |      |      | required |
| director    | string |        |        | 2    | 256  |          |
| image       | object |        |        |      |      | required |
|             |        | url    | string | 14   |      |          |
|             |        | alt    | string | 2    | 256  |          |
| actors      | array  | string |        |      |      | required |
| trailer     | string |        |        | 14   |      |          |
| watchLink   | string |        |        | 14   |      | required |

- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this api
- You will need to be a Business type user to get an answer from this api

#### API for updating movie information

```http
  PUT /api/movies/:id
```

### Request

In the request body you will need to provide an object with the following keys and values

| index       | type   | index  | type   | min  | max  | remark   |
| ----------- | ------ | ------ | ------ | ---- | ---- | -------- |
| title       | string |        |        | 2    | 256  | required |
| description | string |        |        | 2    | 1024 | required |
| year        | number |        |        | 1900 | 2024 | required |
| category    | array  | string |        |      |      | required |
| director    | string |        |        | 2    | 256  |          |
| image       | object |        |        |      |      | required |
|             |        | url    | string | 14   |      |          |
|             |        | alt    | string | 2    | 256  |          |
| actors      | array  | string |        |      |      | required |
| trailer     | string |        |        | 14   |      |          |
| watchLink   | string |        |        | 14   |      | required |

- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this api
- You will need to be a Business type user to get an answer from this api

#### API for liking a movie

```http
	PATCH /api/movies/:id
```

- You will need to provide a token to get an answer from this api

#### API for deleting a movie

```http
  DELETE /api/movie/:id
```

- You will need to provide a token to get an answer from this api
- You must be the user who created the movie or an admin in order to delete the business movie
