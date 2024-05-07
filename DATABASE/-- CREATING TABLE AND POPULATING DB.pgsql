-- CREATING TABLE AND POPULATING DB

-- Create User table
CREATE TABLE "User" (
    UserID SERIAL PRIMARY KEY,
    U_Fname VARCHAR(100) NOT NULL,
    U_Lname VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Password VARCHAR(10),
    DOB DATE,
    Street_Address VARCHAR(100),
    Suburb VARCHAR(30),
    Postcode INTEGER,
    State VARCHAR(3),
    Country VARCHAR(20),
    Phone_Number BIGINT
);

-- Create Employee table
CREATE TABLE Employee (
    EmployeeID SERIAL PRIMARY KEY,
    UserID INTEGER REFERENCES "User"(UserID),
    Department VARCHAR(30),
    Position VARCHAR(30)
);

-- Create Customer table
CREATE TABLE Customer (
    CustomerID SERIAL PRIMARY KEY,
    C_Fname VARCHAR(100) NOT NULL,
    C_Lname VARCHAR(100) NOT NULL,
    Email_Address VARCHAR(100),
    Phone_Number BIGINT,
    Street_Address VARCHAR(100),
    Suburb VARCHAR(30),
    Postcode INTEGER,
    State VARCHAR(3),
    Country VARCHAR(20)
);

-- Create Products table
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    Description VARCHAR(500),
    Price DOUBLE PRECISION,
    StockQuantity INTEGER,
    Brand VARCHAR(50),
    Category VARCHAR(50),
    Weight DOUBLE PRECISION,
    Size DOUBLE PRECISION
);

-- Create Order table
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INTEGER REFERENCES Customer(CustomerID),
    UserID INTEGER REFERENCES "User"(UserID),
    OrderDate TIMESTAMP,
    TotalAmount DOUBLE PRECISION,
    Status VARCHAR(20),
    ShippingMethod VARCHAR(50),
    ShippingCost DOUBLE PRECISION
);

-- Create Payment table
CREATE TABLE Payment (
    PaymentID SERIAL PRIMARY KEY,
    OrderID INTEGER REFERENCES Orders(OrderID),
    PaymentDate TIMESTAMP,
    Amount DOUBLE PRECISION,
    PaymentMethod VARCHAR(50),
    CreditCardNo VARCHAR(11),
    CVC VARCHAR(3),
    ExpiryDate DATE,
    PaymentStatus VARCHAR(50)
);

-- Create Order Details table
CREATE TABLE OrderDetails (
    OrderDetailsID SERIAL PRIMARY KEY,
    OrderID INTEGER REFERENCES Orders(OrderID),
    ProductID INTEGER REFERENCES Products(ProductID),
    Qty INTEGER,
    Subtotal DOUBLE PRECISION,
    Discount DOUBLE PRECISION,
    Tax DOUBLE PRECISION
);


-- Populate User table
INSERT INTO "User" (U_Fname, U_Lname, Email, Password, DOB, Street_Address, Suburb, Postcode, State, Country, Phone_Number)
VALUES ('John', 'Doe', 'john.doe@example.com', 'P@ssw0rd', '1990-01-01', '123 Main St', 'Anytown', 1234, 'ABC', 'Country X', 1234567890);

-- Populate Employee table
INSERT INTO Employee (UserID, Department, Position)
VALUES (1, 'IT', 'Developer');

-- Populate Customer table
INSERT INTO Customer (C_Fname, C_Lname, Email_Address, Phone_Number, Street_Address, Suburb, Postcode, State, Country)
VALUES ('Alice', 'Smith', 'alice.smith@example.com', 9876543210, '456 Oak St', 'Sometown', 5678, 'XYZ', 'Country Y');

-- Populate Products table
INSERT INTO Products (Name, Description, Price, StockQuantity, Brand, Category, Weight, Size)
VALUES ('Smart Thermostat', 'Smart thermostat for home automation', 49.99, 100, 'SmartCo', 'Home Automation', 0.5, 6);

-- Populate Order table
INSERT INTO Orders (CustomerID, UserID, OrderDate, TotalAmount, Status, ShippingMethod, ShippingCost)
VALUES (1, 1, '2024-05-07 10:00:00', 49.99, 'pending', 'Standard Shipping', 5.00);

-- Populate Payment table
INSERT INTO Payment (OrderID, PaymentDate, Amount, PaymentMethod, CreditCardNo, CVC, ExpiryDate, PaymentStatus)
VALUES (1, '2024-05-07 10:05:00', 54.99, 'Credit Card', '12345678901', '123', '2026-05-01', 'completed');

-- Populate Order Details table
INSERT INTO OrderDetails (OrderID, ProductID, Qty, Subtotal, Discount, Tax)
VALUES (1, 1, 1, 49.99, 0, 2.50);

