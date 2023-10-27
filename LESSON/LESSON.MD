# ORM
Object Relational Mapping 

# PROS OF USING ORM
- Simplified data access: interact with databases without writing complex SQL queries
- Object-oriented approach: Code is more reusable, modular and easier to maintain
- Supports multiple DBs: Works with different types of DB systems (MySQL, PostgreSQL, MongoDB, etc)
- Optimized performance: Minimize running unnecessary SQL queries

# WHAT'S PRISMA
- Before when we created tables and databases we had to write a few lines of SQL
- We can do the same but easier with Prisma
- We can use "Prisma Migrate" to sync our DB and express application too (it's a popular DB toolkit and ORM tool)

# PROS OF PRISMA
- Efficient query builder and data modeling
- Automatic schema migrations
- Strong typing and auto-complete support
- DB-agnostic, supporting various DBs (see L7)

# DATA MODELING
- Is the process of defining the shape and structure of the objects (app models) in an application (basically what fields, columns, tables etc and how it relates to other tables)

# PRISMA SCHEMA SYNTAX (elements)
- Fields
- Primary Key (PK)
- Relationships
- Foreign Key (FK)
- Data Types
- Field Attributes
- Models