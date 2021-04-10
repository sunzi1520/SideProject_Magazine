Initial user:
Username: admin
Password: admin
API
-----
POST /auth
  Request: username, password
  Response: exitcode (0 is ok), token, message

POST /account
  Request:
    Header: x-access-token
    Body: username, password, role, faculty, email
  Response: exitcode (0 is ok), message

GET /account
  Request:
    Header: x-access-token
  Response: exitcode (0 is ok), accounts, message

GET /account/:id
  Request:
    Header: x-access-token
  Reponse: exitcode (0 is ok), account, message

PUT /account/:id
  Request:
    Header: x-access-token
    Body: username, password, role, faculty, email, phone, fullname, gender, dob
  Reponse: exitcode (0 is ok), message

DELETE /account/:id
  Request:
    Header: x-access-token
  Reponse: exitcode (0 is ok), message

POST /magazine
  Request:
    Header: x-access-token
    Body: manager_id, name, published_year (e.g. 2021), closureDate, finalClosureDate, isLocked, contributors (e.g. ['...', '...'])
  Reponse: exitcode (0 is ok), message

GET /magazine
  Request:
    Header: x-access-token
  Reponse: exitcode (0 is ok) magazines, message