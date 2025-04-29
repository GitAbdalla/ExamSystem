# Backend Cycle

## Register/Login 
      ↓
## Auth Middleware  ← Role check
      ↓
## Exam Routes 
   ├─ **Create Exam (Admin)**

   ├─ **Add Questions (Admin)**

   └─ **List Exams (Student)**

      ↓

## Student Takes Exam 
   └─ **Submit Answers → Calculate → Save Result**
   
      ↓
## View Results 
   ├─ **Student → Own Result**

   └─ **Admin → All Results**