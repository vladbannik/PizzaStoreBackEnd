# Pizza market server

##Stack
* Node JS - v.14.13.0
* bcrypt - v.5.0.0
* body-parser - v.1.19.0
* dotenv - v.8.2.0
* express - v.4.17.1
* express-validator - v.6.6.1
* jsonwebtoken - v.8.5.1
* mongoose - v.5.10.7
* uuid - v.8.3.0

---
##Registration
**URL:** `/auth/sing-up`

**Method:** `POST`

**Auth required:** `NO`

**Data constraints:** 

```
{
    "email": "[valid email address]",
    "password": "[all symbols, min - 3, max - 12]",
    "passwordConfirmation": "[to equle 'password']"
}
```

**Data example:** 

```
{
    "email": "example@mail.com",
    "password": "123456",
    "passwordConfirmation": "123456"
}
```

###Success response

**Code:** `200 OK`

**Content example:** 
```
{
    "success": "User created"
}
```

###Error response

**Code:** `422 Unprocessable Entity`

**Content example:** 
```
{
    "error": {
        "message": "Email is already taken"
    }
}
```

---

##Login
**URL:** `/auth/sing-in`

**Method:** `POST`

**Auth required:** `NO`

**Data constraints:** 

```
{
    "email": "[valid email address]",
    "password": "[all symbols, min - 3, max - 12]",
}
```

**Data example:** 

```
{
    "email": "example@mail.com",
    "password": "123456",
}
```

###Success response

**Code:** `200 OK`

**Content example:** 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6ImE0MDYxZjNkLTI2MjYtNGQwMS04MTdlLTYwM2QxYWVhY2E5MCIsImlhdCI6MTYwMjIyNzk0MCwiZXhwIjoxNjAyMjMxNTQwfQ.QJpq8MSv-zjJHWJmnfVjZK8EcSoMs678PnOIoMR8hzY"
}
```

###Error response

**Code:** `422 Unprocessable Entity`

**Content example:** 
```
{
    "error": {
        "message": "Email or password is incorrect"
    }
}
```

---

##Approve user
**URL:** `/user/approve/:id`

**URL Parameters:** `id: String - user id`

**Method:** `PATCH`

**Auth required:** `YES`

###Success response

**Code:** `200 OK`

**Content example:** 
```
{
    success: 'OK'
}
```

###Error response

**Code:** `500`

**Content example:** 
```
Something went wrong
```

---

##Delete user
**URL:** `/user/:id`

**URL Parameters:** `id: String - user id`

**Method:** `DELETE`

**Auth required:** `YES`

###Success response

**Code:** `200 OK`

**Content example:** 
```
{
    success: 'OK'
}
```

###Error response

**Code:** `500`

**Content example:** 
```
Something went wrong
```

---

##Get users
**URL:** `/user`

**Method:** `GET`

**Auth required:** `YES`

###Success response

**Code:** `200 OK`

**Content example:** 
```
[
    {
        "id": "a4061f3d-2626-4d01-817e-603d1aeaca90",
        "email": "test@mail.com",
        "approve": true
    },
    {
        "id": "ef0f727d-67b8-445f-9475-3c1d8ee7e42e",
        "email": "test1@test.com",
        "approve": false
    },
]
```

###Error response

**Code:** `422 Unprocessable Entity`

**Content example:** 
```
Something went wrong
```

---
