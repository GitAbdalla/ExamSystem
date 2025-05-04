## 📌 Signup Route

**Endpoint:** `POST http://localhost:4000/examApi/signup`

### 🔐 Request Body

| Field        | Type     | Required | Description                              |
|--------------|----------|----------|------------------------------------------|
| `username`   | `String` | ✅ Yes    | User's full name                         |
| `email`      | `String` | ✅ Yes    | Unique email address                     |
| `password`   | `String` | ✅ Yes    | Minimum 6 characters                     |
| `confirmPassword`                    |
| `role`       | `String` | ❌ No      | Default: "student" (or "admin"/"teacher")|
| `department` | `String` | Conditional | Required if role=student (mearn/dotnet/python) |

#### Example Request:
```json
{
  "username": "Ali",
  "email": "ali@student.com",
  "password": "123456",
  "role": "student",
  "department": "mearn"
}
```
```json
{
  "status": "success",
  "message": "Signed up successfully",
  "user": {
    "username": "Ali",
    "email": "ali@student.com",
    "role": "student",
    "department": "mearn",
    "createdAt": "2025-05-04T18:20:43.234Z",
    "updatedAt": "2025-05-04T18:20:43.234Z",
    "id": "6817affb4591fe26583bf549"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTdhZmZiNDU5MWZlMjY1ODNiZjU0OSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ2MzgyODQzLCJleHAiOjE3NDY5ODc2NDN9.ZNvXYu0IPoOaS7SQfk4CvjrCiRr652rtjlzPcrHHc7c"
}
```

## 🔑 Login Route

**Endpoint**: `POST http://localhost:4000/examApi/login`

#### Request Body
```json
{
  "email": "ali@student.com",
  "password": "123456"
}
```
#### Example Response
```json
{
  "status": "success",
  "message": "Logged in successfully",
  "user": {
    "username": "Ali",
    "email": "ali@student.com",
    "role": "student",
    "department": "mearn",
    "id": "6817affb4591fe26583bf549"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTdhZmZiNDU5MWZlMjY1ODNiZjU0OSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ2MzgyODQzLCJleHAiOjE3NDY5ODc2NDN9.ZNvXYu0IPoOaS7SQfk4CvjrCiRr652rtjlzPcrHHc7c"
}
```