## Postman Folder Structure
<img width="364" height="237" alt="Screenshot from 2026-05-17 07-27-00" src="https://github.com/user-attachments/assets/d0a2c56e-8641-4ef7-88df-0b03f284a160" />

## User Register API Result
<img width="1381" height="837" alt="Screenshot from 2026-05-17 07-32-04" src="https://github.com/user-attachments/assets/2bdd7568-f307-49bc-b080-b006916655bc" />

## Send Verification API Result
<img width="1381" height="837" alt="image" src="https://github.com/user-attachments/assets/089767a4-f22e-4178-9e72-3ae35426bb90" />

## USer verification API Result
<img width="1381" height="837" alt="Screenshot from 2026-05-17 07-36-34" src="https://github.com/user-attachments/assets/4da1a209-ec3a-4bbb-9153-4560c7446676" />

## User Login API Result
<img width="1381" height="837" alt="Screenshot from 2026-05-17 07-42-14" src="https://github.com/user-attachments/assets/3999d80e-9f40-4a43-be1b-905f1924dc08" />

## All Verified Users API Result
<img width="1381" height="837" alt="Screenshot from 2026-05-17 07-53-28" src="https://github.com/user-attachments/assets/c193db8c-3f01-4e5d-91e3-9f3ed0a771da" />


## Inteview Questions of 17 May 2026
# 📘 Prisma ORM Interview Guide

A concise guide to Prisma ORM concepts commonly asked in backend interviews.

---

# 1. What is Prisma ORM and why is it used?

Prisma ORM is a modern Object Relational Mapper for Node.js and TypeScript that simplifies database access using a type-safe API.

## Why Prisma is used:

- Type-safe database queries
- Auto-generated TypeScript types
- Eliminates manual SQL writing
- Reduces runtime errors
- Works with PostgreSQL, MySQL, SQLite, MongoDB

## Example:

```ts
const users = await prisma.user.findMany();
2. Difference between findUnique() and findFirst()
findUnique()

Used when querying a unique field (id, email, etc.)

const user = await prisma.user.findUnique({
  where: { email: "test@gmail.com" },
});
```
Key Points:
Only works with unique fields
Returns one record or null
findFirst()

Used when searching non-unique fields

const user = await prisma.user.findFirst({
  where: { name: "Shawon" },
});
Key Points:
Works on non-unique fields
Returns first matching record
Summary
Method	Unique Field	Return Type
findUnique	Yes	One or null
findFirst	No	First match
3. What is Prisma Migration?

Prisma Migration is a system to manage database schema changes over time.

Command:
npx prisma migrate dev --name init
What it does:
Creates migration files
Updates database schema
Syncs schema with database
Regenerates Prisma Client
Example Flow:
Update schema:
model User {
  id   String @id @default(uuid())
  name String
}
Run migration:
prisma migrate dev
4. Difference between select and include
select

Used to fetch specific fields only.

const user = await prisma.user.findUnique({
  where: { id: "1" },
  select: {
    name: true,
    email: true,
  },
});
Result:

Only selected fields are returned.

include

Used to fetch related data (relations).

const user = await prisma.user.findUnique({
  where: { id: "1" },
  include: {
    posts: true,
  },
});
Result:

User + related posts

Summary
Feature	select	include
Fields	Specific fields	Relations
Use case	Reduce payload	Fetch relations
5. What is schema.prisma?

The schema.prisma file defines the structure of your database and Prisma configuration.

Main Sections:
1. Datasource

Defines database connection.

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
2. Generator

Defines Prisma Client generation.

generator client {
  provider = "prisma-client-js"
}
3. Models

Defines database tables.

model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
}


## All Verified USers API Result

# Database table design for a multivendor projects
<img width="2362" height="2101" alt="DarazSellerPoint (1)" src="https://github.com/user-attachments/assets/e316f214-de15-46a2-ace6-8af88e04f149" />


# Database Interview Questions & Answers
##task of may 15

## 1. Difference between DELETE, TRUNCATE and DROP?

**Ans:**

- **DELETE:** remove selected rows, can be used with `WHERE`, it is comparatively slower.
- **TRUNCATE:** remove all the rows, can't be used with `WHERE`, comparatively faster.
- **DROP:** removes the entire table, delete structure and data, it causes permanent table removal.

---

## 2. What is a Primary Key?

**Ans:**

A primary key is a column that uniquely identifies each row in a table.

- it can't be null
- can't be duplicate
- only one primary key per table

### Example

```sql
id SERIAL PRIMARY KEY
```

---

## 3. Difference between PRIMARY KEY and UNIQUE KEY?

**Ans:**

### Primary Key

- can't be null
- only one per table
- unique and not null

### Unique Key

- can contain null
- multiple allowed
- only unique

---

## 4. What is a Foreign Key?

**Ans:**

A foreign key is a column that referenced primary key from another table. It is used to create relationships between 2 or more tables.

---

## 5. What is a JOIN in SQL?

**Ans:**

JOIN combines data from multiple tables based on related columns.

There are 4 joins:

- LEFT JOIN
- RIGHT JOIN
- INNER JOIN
- FULL JOIN

### LEFT JOIN

return all from left and matching from right

### RIGHT JOIN

return all from right and matching from left

### INNER JOIN

only matching from right and left

### FULL JOIN

return all from both tables

---

## 6. What is Normalization?

**Ans:**

Normalization is the process of organizing database tables to reduce redundancy and improve consistency.

### 1NF

Each column must contain atomic values.

### 2NF

Must be in 1NF and remove partial dependency.

### 3NF

Must be in 2NF and remove transitive dependency.

---

## 7. What is Indexing?

**Ans:**

Index is a data structure that improves search speed because it makes queries faster.

- without index DB searches all rows
- with index DB directly target the row

---

## 8. Difference between WHERE and HAVING

**Ans:**

### WHERE

- filter rows
- use before `GROUP BY`

### Example

```sql
SELECT * FROM employees WHERE salary > 50000;
```

### HAVING

- filter grouped data
- use after `GROUP BY`

### Example

```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;
```

---

## 9. What is a Transaction in SQL?

**Ans:**

A transaction is a sequence of operations executed as one unit.

It means consistency. If it happens then happens fully, either not.

### COMMIT

saves the changes

### ROLLBACK

undo changes

### Example

```sql
BEGIN;

UPDATE employees
SET salary = 50000
WHERE id = 1;

ROLLBACK;
```

---

## 10. Query to find second highest salary?

**Ans:**

To find the second highest salary we can follow 2 methods.

### Method 1

```sql
SELECT MAX(salary)
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

This method finds the maximum salary below the highest salary.

---

### Method 2

```sql
SELECT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

This method sorts salary descending and skips the first highest salary.

---



## task of may 14
## 1. What is the difference between Primary Key and Foreign Key?

**Answer:**  
A **Primary Key** uniquely identifies each row in a table. It cannot be `NULL` or duplicated.

A **Foreign Key** is a column in one table that refers to the primary key of another table. It is used to create relationships between tables. A foreign key can contain duplicate values.

### Example

- `users.id` is the primary key of the `users` table.
- `posts.userId` is a foreign key in the `posts` table that references `users.id`.

---

## 2. Why is normalization important?

**Answer:**  
Normalization is important because database tables may contain repeated data, which can cause:

- storage waste
- update problems
- insertion anomalies
- deletion anomalies

To solve these issues, we normalize the database using forms like **1NF, 2NF, 3NF, 4NF, and 5NF**.

After normalization:

- data redundancy is reduced
- consistency improves
- relationships become clearer

### Example

If a `users` table stores `postId` and `postName`, but not every user publishes posts, this creates unnecessary null values and redundancy. In a normalized database, `users` and `posts` should be separate tables.

---

## 3. What is a JOIN?

**Answer:**  
A JOIN combines data from two or more tables based on a related column.

### Common types of JOIN

1. INNER JOIN  
2. LEFT JOIN  
3. RIGHT JOIN  
4. FULL OUTER JOIN  

### Example

```sql
SELECT products.name, sellers.shop_name
FROM products
JOIN sellers ON products.seller_id = sellers.id;
```

This query retrieves product names along with seller shop names.

---

## 4. Difference between SQL and MongoDB

**Answer:**

| SQL | MongoDB |
|-----|---------|
| Relational database | NoSQL document database |
| Uses tables and rows | Uses collections and documents |
| Fixed schema | Flexible schema |
| Uses SQL language | Uses JSON/BSON |

---

## 5. What is a composite key?

**Answer:**  
A composite key is made up of two or more columns that together uniquely identify a row.

### Example

In an `order_items` table:

- `orderId`
- `productId`

Together they identify a unique order item.

---

## 6. What is a weak entity?

**Answer:**  
A weak entity depends on another table (parent entity) and cannot exist independently.

### Example

A `product_reviews` table depends on:

- `products`
- `users`

Without a product or user, the review has no meaning. Therefore, `product_reviews` is a weak entity.

---

## 7. Why do we use constraints?

**Answer:**  
Constraints are used to enforce rules on database columns and maintain valid data.

### Common constraints

- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- NOT NULL
- CHECK
- DEFAULT

These constraints help prevent invalid or inconsistent data from being inserted.

---

## 8. Explain many-to-many relationship

**Answer:**  
A many-to-many relationship means:

- one record in table A can relate to many records in table B
- one record in table B can relate to many records in table A

### Example

**Products ↔ Tags**

- A product can have many tags
- A tag can belong to many products

This is usually handled using a junction table like `product_tags`.

---

## 9. Difference between Clustered and Non-Clustered Index

**Answer:**

### Clustered Index

- Determines the physical order of data in a table
- Only one clustered index per table
- Usually created on the primary key

### Non-Clustered Index

- Stores index separately from actual data
- Can have multiple per table
- Improves search performance for specific columns

---

## 10. Explain Database Sharding and Partitioning

**Answer:**

### Partitioning

Partitioning divides a large table into smaller parts within the same database server.

### Example

Orders table:

- `orders_2024`
- `orders_2025`

Used when a table becomes very large.

### Sharding

Sharding splits data across multiple database servers.

### Example

Users data distributed by region:

- Server 1 → Asia users  
- Server 2 → Europe users  
- Server 3 → USA users  

Used when one server cannot handle all traffic or data.

---


# Login API test result:
![alt text](image.png)

# Register API test result:
![alt text](image-1.png)
