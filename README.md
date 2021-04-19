# Inital account
---

**Username**: admin<br/>
**Password**: admin

# Update
---

Date: 19 Apr 2021
1. API changes: 
- Use plural words instead of singular words. E.g. /account -change-> /accounts
- Remove 'username' and use 'email' instead.

2. Add new API:
**Account API**
- **GET** /accounts/role/:role
Get accounts by a given role

**Contribution API**
- **POST** /contributions
Create a new contribution with files
- **PUT** /contributions
Update an existing contribution with files

**File API**
- **GET** /files/:id
Download a specific file
- **DELETE** /files/:id
Delete a specific file

3. Fix bugs:
- Magazine IDs when getting the whole list are null.<br/>
Cause: When getting a list, the ID property of its elements is '_id' instead of '_id'.<br/>
Solution: Change 'id' into '_id' in Concrete Repositories.<br/>
Extension: Fix for other cases such as accounts.<br/>

- The system allows to duplicate accounts.<br/> 
Cause: A constraint of duplicated values for 'email' or 'username' has not been implemented in both sides of the back-end server and the database.<br/>
Solution: Implement a constraint before carrying out the creating use cases.

# API
---

## Authorization Routes

**POST** /auth<br/>
**Description**: A user sends his credential to gain access token in order to access the system.
**Request**
1. **Header**
2. **Body**
- **email: String**
- **password: String**

**Response**
- exitcode: 0 is OK
- token: String
- message: String || Object

## Account Routes

**POST** /accounts<br/>
**Description**: A user creates a new account by providing necessary data
**Request**
1. **Header**
- x-access-token: string
2. **Body**
- **email: String**
- **password: String**
- **role: String**
- **faculty: String**
- fullname: String
- dob: DateString
- gender: String
- phone: String of numbers

**Response**
- exitcode: 0 is ok
- message: String || Object

**GET** /accounts<br/>
**Description**: A user view a list of accounts that he is allowed to view
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Response**<br/>
- exitcode: 0 is OK
- accounts: Array of Object(id, email, role, faculty, fullname, gender, dob, phone)
- message: String || Object

**GET** /accounts/:id<br/>
**Description**: A user view information of a specific account by a given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- account: Object(id, email, role, faculty, fullname, gender, dob, phone)
- message: String || Object

**GET** /accounts/me<br/>
**Description**: A user views information of his account
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- account: Object(id, email, role, faculty, fullname, gender, dob, phone)
- message: String || Object

**GET** /accounts/role/:role<br/>
**Description**: A user gets a list of accounts by a given role
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- accounts: Array of Object(id, email, role, faculty, fullname, gender, dob, phone)
- message: String || Object

**PUT** /accounts/:id<br/>
**Description**: A user updates information of a specific account by a given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**
- email: String
- password: String
- role: String
- faculty: String
- fullname: String
- dob: DateString
- gender: String
- phone: String of numbers
*(Note: unchanged fields should give their original data instead of a blank)*

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**DELETE** /accounts/:id<br/>
**Description**: A user deletes a specific account by a given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

## Magazine routes

**POST** /magazines<br/>
**Description**: A user creates a new magazine by giving necessary data
**Request**
1. **Header**
- x-access-token: String
2. **Body**
- **manager_id: String** *(Note: this is ObjectId of the manager)*
- **name: String**
- **published_year: Number** *(e.g. 2021)*
- **closureDate: DateString**
- **finalClosureDate: DateString**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**GET** /magazines<br/>
**Description**: A user views a list of magazines
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- magazines: Array of Object(id, name, published_year, manager: Object(id, email, fullname, email), closureDate, finalClosureDate)
- message: String || Object

**GET** /magazines/:id<br/>
**Description**: A user views the details of a specific magazine by a given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- magazine: Object(id, name, published_year, manager: Object(id, email, fullname), closureDate, finalClosureDate)
- message: String || Object

**DELETE** /magazines/:id<br/>
**Description**: A user deletes a specific magazine by a given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

## Contribution Routes

**POST** /contributions/<br/>
**Description**: A student creates a new contribution
**Request**
1. **Header**
- x-access-token: String
2. **Body**
- **magazine**: String (Magazine ID)
- **title**: String
- **agreement**: Any
- article: .doc or.docx
- pictures: image/ 
**Note**: Either a aritcle or pictures must be provided.

**Reponse**
- exitcode: 0 is OK
- contribution: id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected, files (Aray of Files(id, filename, createdAt))
- message: String || Object

**PUT** /contributions/:id<br/>
**Description**: A student updates a contribution
**Request**
1. **Header**
- x-access-token: String
2. **Body**
- magazine: String (Magazine ID)
- title: String
- article: .doc or.docx
- pictures: image/ 

**Reponse**
- exitcode: 0 is OK
- contribution: id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected, files (Aray of Files(id, filename, createdAt))
- message: String || Object


## File Routes

**GET** /files/:id<br/>
**Description**: A user downloads a file by given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
*Download*


**DELETE** /files/:id<br/>
**Description**: A user deletes a specific file by a given ID
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object
