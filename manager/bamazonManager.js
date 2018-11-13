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

// Load the manager options and pass in the products data from the database
function ManagerPrivileges(products) {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      choices: ["View Products for Sale", "View Low Stock", "Add to Stock", "Add New Product", "Quit"],
      message: "What would you like to do?"
    })
    .then(function(userInput) {
      switch (userInput.choice) {
      case "View Products for Sale":
        console.table(products);
        grabProducts();
        break;
      case "View Low Stock":
        grabLowStock();
        break;
      case "Add to Stock":
        addToStock(products);
        break;
      case "Add New Product":
        askManagerForNewProduct(products);
        break;
      default:
        console.log("See you soon!");
        process.exit(0);
        break;
      }
    });
}

// Query the DB for low Stock products
function grabLowStock() {
  // Selects all of the products that have a quantity of 5 or less
  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
    if (err) throw err;
    // Draw the table in the terminal using the response
    console.table(res);
    grabProducts();
  });
}





  
  
  

