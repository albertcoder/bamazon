// npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// Creates the connection with the server and loads the manager menu upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  grabProducts();
});

// Get product data from the database
function grabProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Show the manager privileges
    ManagerPrivileges(res);
  });
}







  
  
  

