#Inital account
---
**Username**: admin
**Password**: admin

#API
---

##Authorization Routes

**POST** /auth
**Description**: A user sends his credential to gain access token in order to access the system.
**Request**
- **Header**
- **Body**
-- **username: String**
-- **password: String**

**Response**
- exitcode: 0 is OK
- token: String
- message: String || Object

##Account Routes

**POST** /account
**Descrption**: A user creates a new account by providing necessary data
**Request**
- **Header**
-- x-access-token: string
- **Body**
-- **username: String**
-- **password: String**
-- **role: String**
-- **faculty: String**
-- **email: String**
-- fullname: String
-- dob: DateString
-- gender: String
-- phone: String of numbers

**Response**
- exitcode: 0 is ok
- message: String || Object

**GET** /account
**Descrption**: A user view a list of accounts that he is allowed to view
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Response**
-- exitcode: 0 is OK
-- accounts: Array of Object(id, username, role, faculty, fullname, gender, dob, email, phone)
-- message: String || Object

**GET** /account/:id
**Descrption**: A user view information of a specific account by a given ID
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Reponse**
- exitcode: 0 is OK
- account: Object(id, username, role, faculty, fullname, gender, dob, email, phone)
- message: String || Object

**GET** /account/me
 **Descrption**: A user views information of his account
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Reponse**
- exitcode: 0 is OK
- account: Object(id, username, role, faculty, fullname, gender, dob, email, phone)
- message: String || Object

**PUT** /account/:id
 **Descrption**: A user updates information of a specific account by a given ID
**Request**
- **Header**
-- x-access-token: String
- **Body**
-- username: String
-- password: String
-- role: String
-- faculty: String
-- email: String
-- fullname: String
-- dob: DateString
-- gender: String
-- phone: String of numbers
*(Note: unchanged fields should give their original data instead of a blank)*

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**DELETE** /account/:id
 **Descrption**: A user deletes a specific account by a given ID
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

##Magazine routes

**POST** /magazine
 **Descrption**: A user creates a new magazine by giving necessary data
**Request**
- **Header**
-- x-access-token: String
- **Body**
-- **manager_id: String** *(Note: this is ObjectId of the manager)*
-- **name: String**
-- **published_year: Number** *(e.g. 2021)*
-- **closureDate: DateString**
-- **finalClosureDate: DateString**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**GET** /magazine
 **Descrption**: A user views a list of magazines
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Reponse**
- exitcode: 0 is OK
- magazines: Array of Object(id, name, published_year, manager: Object(id, username, fullname, email), closureDate, finalClosureDate)
- message: String || Object

 **GET** /magazine/:id
 **Descrption**: A user views the details of a specific magazine by a given ID
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Reponse**
- exitcode: 0 is OK
- magazine: Object(id, name, published_year, manager: Object(id, username, fullname, email), closureDate, finalClosureDate)
- message: String || Object

 **DELETE** /magazine/:id
 **Descrption**: A user deletes a specific magazine by a given ID
**Request**
- **Header**
-- x-access-token: String
- **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object