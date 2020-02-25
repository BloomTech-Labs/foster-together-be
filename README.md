🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### Backend deployed at [Heroku](https://foster-together-back.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- `npm i` to install all required dependencies
- `npm run server` to start the local server
- `npm test` to start server using testing environment

### Express.js

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## Endpoints

#### Admin Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST    | `/api/admins/login`        | admins | Log in as an admin. |
| POST    | `/api/admins`        | admins | Create a new admin account. |
| GET   | `/api/admins/:id`        | admins | Returns the information for an admin by ID. |
| DELETE | `/api/admins/:id`    | admins         | Delete an admin account. |

#### Neighbor Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/neighbors`        | admins | Returns the contact information for all foster neighbors. |
| GET    | `/api/neighbors/:id`        | admins | Returns the contact information for a foster neighbor by ID. |
| POST   | `/api/neighbors`        | new neighbors, admins | Add a new foster neighbor. |
| PUT    | `/api/neighbors/:id`     | admins | Update the contact information for a foster neighbor. |
| DELETE | `/api/neighbors/:id`    | admins         | Delete a foster neighbor. |

#### Family Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/api/families`        | admins | Returns the contact information for all foster families. |
| GET    | `/api/families/:id`        | admins | Returns the contact information for a foster family by ID. |
| POST   | `/api/families`        | new families, admins | Add a new foster family. |
| PUT    | `/api/families/:id`     | admins | Update the contact information for a foster family. |
| DELETE | `/api/families/:id`    | admins         | Delete a foster family. |

# Data Model

#### ADMINS

---

```
{
  admin_id: UUID,
  email: STRING,
  display_name: STRING
}
```

#### CITIES

---

```
{
  city_id: UUID,
  city: STRING
}
```

#### STATES

---

```
{
  state_id: UUID,
  state: STRING
}
```

#### ZIPS

---

```
{
  zip_id: UUID,
  zip: INTEGER
}
```

#### CITY_STATE_ZIP

---

```
{
  city_state_zip_id: UUID,
  //foreign keys
  city_id: INTEGER,
  state_id: INTEGER,
  zip_id: INTEGER
}
```

#### FAMILIES

---

```
{
  family_id: UUID,
  first_name: STRING,
  last_name: STRING,
  email: STRING,
  phone: STRING,
  address: STRING,
  city_state_zip_id: INTEGER // foreign key
  
}
```

#### NEIGHBORS

---

```
{
  neighbor_id: UUID,
  first_name: STRING,
  last_name: STRING,
  email: STRING,
  phone: STRING,
  address: STRING,
  city_state_zip_id: INTEGER // foreign key
  
}
```

## Actions

`add(data)` -> Insert a foster neighbor, family, or admin account

`find()` -> Get a list of all foster neighbors or families

`findBy(filter)` -> Get foster neighbor(s) or famili(es) by a key name, ie `{ email }`

`findById(id)` -> Get a foster neighbor or family by ID

`update(id, data)` -> Update a foster neighbor or family's contact information, or an admin's account info

`remove(id)` -> Delete a foster neighbor or family

`adminDelete(id)` -> Delete an admin account

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  PORT - optional
    *  NODE_ENV - set to "development" until ready for "production"
    *  SSL_PASSPHRASE - determined when generating an OpenSSL key on your local machine
    *  DATABASE_URL - production DB url
    *  TEST_DB - test DB url
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/foster-together-fe#readme) for details on the frontend of our project.
