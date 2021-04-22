# Inital account
---

**Email**: group4.greenwich@gmail.com<br/>
**Password**: admin

# Update
---
## Date: 09 : 08 PM 22 Apr 2021
1. Add new API:  
**Comment API**  
- **GET** /comments/  
Get all comments.  

- **GET** /comments/:id  
Get a specific comment.  

- **GET** /comments/contribution/:contributionId  
Get comments of a specific contribution.  

- **POST** /comments/  
Post a new comment.  

- **PUT** /comments/:id  
Update a specific comment  

- **DELETE** /comments/:id  
Delete a specific comment  

## Date: 09 : 42 PM 21 Apr 2021
1. Add new API:
**Magazine API**
- **GET** /magazine/:magazineId/download/selected
Download all selected contributions of a specific magazine

## Date: 09 : 00 PM 20 Apr 2021
1. Add new API:
**Contribution API**
- **GET** /contributions/account/:accountId/selected  
Get selected contributions of a specific account with a given ID  

- **GET** /contributions/faculty/:faculty/selected  
Get selected contributions of a specific faculty with a give ID  

- **GET** /contributions/selected  
Get all selected contributions  

- **PUT** /contributions/:contributionId/select  
Select a specific contribution with a given ID  

- **PUT** /contributions/:contributionId/deselect  
Deselect a specific contribution with a given ID

2. Fix bugs:
- Cannot get files when accessing an contribution<br/>
Cause: The command used for retrieving files has a problem in the syntax but compiled successfully so that it has been missed.<br/>
Solution: Fix the command.<br/>

- Uploading files to update a contirbution returns the status 500  
Cause: There was a mistake in coding  
Solution: Change the status responded by the server  
Extension: Fix the similar error not explored in deleting a file  

## Date: 06 : 02 PM 20 Apr 2021
1. Add new API:
**Contribution API**<br/>
- **GET** /contributions<br/>
Get a list of contributions of the user<br/>

- **GET** /contributions/account/<br/>
Get a list of all contributions available in the system<br/>

- **GET** /contributions/account/:accountId<br/>
Get a list of contributions of a specific account<br/>

2. Changes:<br/>
- Now, `contributions/:id` shows a list of files  <br/>

## Date: 01 : 02 PM 20 Apr 2021
1. Fix bugs (Hotfix):
- Cannot create magazine. Error: (node:19084) UnhandledPromiseRejectionWarning: TypeError: Cannot convert undefined or null to object<br/>
Cause: In `MagazineController.createMagazine()`, there is a line `const  coordinatorList = await Array.from(coordinators)` to convert the passed list of coordinators for the magazine. However, because not mandatory, this list can be missed and cause the error.<br/>
Solution: Change `coordinatorList` into a variable with an initial value as an empty array. Then, check if there is `coordinators` value and convert it into `coordinatorList`.<br/>



## Date: 04:30 AM 20 Apr 2021
1. Changes:
- Add middlewares for routing /files
- Seperate the use case `Update Contribution` into other three use cases `Upload Files`, `Delete a File`, and `Change Title`
- Flatten the use case `Create Contribution`

2. Add new API:

**Contribution API**
- **GET** /contributions/:id<br/>
Get lists of a contribution (lack of showing files)

- **GET** /faculty/:faculty<br/>
Get lists of contributions based on facuty

**File API**
- **POST** /files/contribution/:contributionId<br/>
Upload a file (lack of showing files)

3. Fix bugs:
- Accessing authorized resources without a token do not return the expected message<br/>
Cause: The implementation is not proper<br/>
Solution: Correct the implementation<br/>

- Description: Cannot download a specific file with a given id, error message is: filename must be a string<br/>
Cause: The use case DownloadFile returns a string which is the path of the required file, but the Controller handles it as an object<br/>
Solution: Correct the way controller handles the result

## Date: 20 Apr 2021
1. Changes:
- It will return `Error403:No token provided` when no token is provided to access authorized resources.

2. Fix bugs:
- When delete a user, it returns an error with the message: 'Cannot read property `fullname` of undefined' <br/>
Cause: Do not change the implementation of `persist` in the account repository followed the new use case, so that, when created, an account document does not have `information` field initially. <br/>
Solution: Update the implementation of `persist` in the account repository

## Date: 19 Apr 2021
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
**Description**: A user sends his credential to gain access token in order to access the system.<br/>
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
**Description**: A user creates a new account by providing necessary data<br/>
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
**Description**: A user view a list of accounts that he is allowed to view<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Response**<br/>
- exitcode: 0 is OK
- accounts: Array of Object(id, email, role, faculty, fullname, gender, dob, phone)
- message: String || Object

**GET** /accounts/:id<br/>
**Description**: A user view information of a specific account by a given ID<br/>
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
- phone: String of numbers<br/>
*(Note: unchanged fields should give their original data instead of a blank)*

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**DELETE** /accounts/:id<br/>
**Description**: A user deletes a specific account by a given ID<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

## Magazine routes

**POST** /magazines<br/>
**Description**: A user creates a new magazine by giving necessary data<br/>
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
**Description**: A user views a list of magazines<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- magazines: Array of Object(id, name, published_year, manager: Object(id, email, fullname, email), closureDate, finalClosureDate)
- message: String || Object

**GET** /magazines/:id<br/>
**Description**: A user views the details of a specific magazine by a given ID<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- magazine: Object(id, name, published_year, manager: Object(id, email, fullname), closureDate, finalClosureDate)
- message: String || Object

**DELETE** /magazines/:id<br/>
**Description**: A user deletes a specific magazine by a given ID<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**GET** /magazines/:magazineId/download/selected<br/>
**Description**: A user to download selected contributions of a specific magazine<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
*Download*



## Contribution Routes

**POST** /contributions/<br/>
**Description**: A student creates a new contribution<br/>
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
**Description**: A student changes the title of a contribution<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**
- title: String

**Reponse**
- exitcode: 0 is OK
- contribution: id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected, files (Aray of Files(id, filename, createdAt))
- message: String || Object

**GET** /contributions/:id<br/>
**Description**: A user views the content of a contribution<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- contributions: id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected
- message: String || Object

**GET** /contributions/faculty/:faculty<br/>
**Description**: A user views the list of contributions by faculty<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]
- message: String || Object

**GET** /contributions<br/>
**Description**: A user views the list of all contributions<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]
- message: String || Object

**GET** /contributions/account<br/>
**Description**: A user views the list of contributions of his<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]
- message: String || Object

**GET** /contributions/account/:acccountId<br/>
**Description**: A user views the list of contributions of a specific account<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]
- message: String || Object


- **GET** /contributions/account/:accountId/selected  
**Description**: Get selected contributions of a specific account with a given ID  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Response**  
- exitcode: 0 is OK  
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]  
- message: String || Object  


- **GET** /contributions/faculty/:faculty/selected  
Get selected contributions of a specific faculty with a give ID  
**Description**: Get selected contributions of a specific account with a given ID  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Response**  
- exitcode: 0 is OK  
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]  
- message: String || Object  

- **GET** /contributions/selected  
Get all selected contributions  
**Description**: Get selected contributions of a specific account with a given ID  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Response**  
- exitcode: 0 is OK  
- contribution: [id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected]  
- message: String || Object  

- **PUT** /contributions/:contributionId/select  
Select a specific contribution with a given ID  
**Description**: Get selected contributions of a specific account with a given ID  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Response**  
- exitcode: 0 is OK  
- contribution: id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected  
- message: String || Object  

- **PUT** /contributions/:contributionId/deselect  
Deselect a specific contribution with a given ID 
**Description**: Get selected contributions of a specific account with a given ID  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Response**  
- exitcode: 0 is OK  
- contribution: id, title, magazineId, magazineName, magazineYear, contributorId, contributorEmail, *contributorName*, isSelected  
- message: String || Object  

## File Routes

**GET** /files/:id<br/>
**Description**: A user downloads a file by given ID<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
*Download*

**DELETE** /files/:id<br/>
**Description**: A user deletes a specific file by a given ID<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode: 0 is OK
- message: String || Object

**POST** /files/contribution/:contributionId<br/>
**Description**: A user want to upload file for an existing contribution<br/>
**Request**
1. **Header**
- x-access-token: String
2. **Body**

**Reponse**
- exitcode
- contribution: (id, contributionId, contributionTitle, filename, filetype, createdAt)
- messge

## Comment Routes

**GET** /comments  
**Description**: A user views all comments in the system  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Reponse**  
- exitcode: 0 is OK  
- comments: [Comment: (id: String, commenterId: String, commenterName: String, commenterEmail: String, contributionId: String, contributionTitle: String, content: String, createdAt: Date, updatedAt:Date)]  
- message: String || Object  

**GET** /comments/contribution/:contributionId  
**Description**: A user views comments of a contribution in the system  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Reponse**  
- exitcode: 0 is OK  
- comments: [Comment: (id: String, commenterId: String, commenterName: String, commenterEmail: String, contributionId: String, contributionTitle: String, content: String, createdAt: Date, updatedAt:Date)]  
- message: String || Object  

**GET** /comments/:id  
**Description**: A user views a specific comment  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Reponse**  
- exitcode: 0 is OK  
- comments: Comment: (id: String, commenterId: String, commenterName: String, commenterEmail: String, contributionId: String, contributionTitle: String, content: String, createdAt: Date, updatedAt:Date)  
- message: String || Object   

**POST** /comments  
**Description**: A user create a specific comment  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  
- **contribution: String**
- **content: String**  

**Reponse**  
- exitcode: 0 is OK  
- comments: Comment: (id: String, commenterId: String, commenterName: String, commenterEmail: String, contributionId: String, contributionTitle: String, content: String, createdAt: Date, updatedAt:Date)  
- message: String || Object  


**PUT** /comments/:id  
**Description**: A user update a specific comment  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  
- **content: String**

**Reponse**  
- exitcode: 0 is OK  
- comments: Comment: (id: String, commenterId: String, commenterName: String, commenterEmail: String, contributionId: String, contributionTitle: String, content: String, createdAt: Date, updatedAt:Date)  
- message: String || Object  


**DELETE** /comments/:id  
**Description**: A user delete a specific comment  
**Request**  
1. **Header**  
- x-access-token: String  
2. **Body**  

**Reponse**  
- exitcode: 0 is OK   
- message: String || Object  

