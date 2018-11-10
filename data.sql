/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database bamazon and specified it for use.
CREATE DATABASE bamazon;
USE bamazon;

-- Create the table products.
CREATE TABLE products
(
item_id int NOT NULL AUTO_INCREMENT,
product_name varchar(255) NOT NULL,
department_name varchar(255) NOT NULL,
price int NOT NULL,
stock_quantity int NOT NULL,
PRIMARY KEY (item_id)
);

-- Insert a set of records.
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('toothpaste', 'grocery', 12.99, 99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('flour', 'grocery', 12.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('rice', 'grocery', 8.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('hair gel', 'beauty', 6.99, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('listerene', 'self care', 4.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('iphone XS', 'electronics', 899, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('cologne', 'self-care', 14.99, 44);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('jameson', 'alcohol', 23.99, 999);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Xbox', 'electronics', 99, 99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('TV', 'electronics', 649, 40);
