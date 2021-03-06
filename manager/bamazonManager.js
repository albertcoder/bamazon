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

// Ask the manager to add the products
function addToStock(Stock) {
  console.table(Stock);
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like add to?",
        validate: function(userInput) {
          return !isNaN(userInput);
        }
      }
    ])
    .then(function(userInput) {
      var choiceIdee = parseInt(userInput.choice);
      var product = checkStock(choiceIdee, Stock);

      // If a product already exists
      if (product) {
        // Pass the chosen product to askCustomerForQuantity
        askManagerForQuantity(product);
      }
      else {
        // Otherwise let the user know and grab the products
        console.log("\nThat item is not in the Stock.");
        grabProducts();
      }
    });
}

// Ask for the quantity that should be added to the chosen product
function askManagerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add?",
        validate: function(userInput) {
          return userInput > 0;
        }
      }
    ])
    .then(function(userInput) {
      var quantity = parseInt(userInput.quantity);
      addQuantity(product, quantity);
    });
}

// Updates quantity of selected product
function addQuantity(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [product.stock_quantity + quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully added " + quantity + " " + product.product_name + "'s!\n");
      grabProducts();
    }
  );
}

// Check to see if the product the user chose exists in the Stock
function checkStock(choiceId, Stock) {
    for (var i = 0; i < Stock.length; i++) {
      if (Stock[i].item_id === choiceId) {
        // If a matching product is found, return the product
        return Stock[i];
      }
    }
    // Otherwise return null
    return null;
  }
  
  // Asks the manager details about the new product
// Adds new product to the db when complete
function askManagerForNewProduct(products) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "product_name",
          message: "What is the name of the product you would like to add?"
        },
        {
          type: "list",
          name: "department_name",
          choices: getDepartments(products),
          message: "Which department does this product fall into?"
        },
        {
          type: "input",
          name: "price",
          message: "How much does it cost?",
          validate: function(val) {
            return val > 0;
          }
        },
        {
          type: "input",
          name: "quantity",
          message: "How many do we have?",
          validate: function(val) {
            return !isNaN(val);
          }
        }
      ])
      .then(addNewProduct);
  }
  
  // Adds a new product to the database
  function addNewProduct(val) {
    connection.query(
      "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
      [val.product_name, val.department_name, val.price, val.quantity],
      function(err, res) {
        if (err) throw err;
        console.log(val.product_name + " Added to BAMAZON!\n");
        // Grab the updated products
        grabProducts();
      }
    );
  }
  
  // Take an array of product objects, return an array of their unique departments
function getDepartments(products) {
  var departments = [];
  for (var i = 0; i < products.length; i++) {
    // this means the department name does not exist already
    if (departments.indexOf(products[i].department_name) === -1) {
      departments.push(products[i].department_name);
    }
  }
  return departments;
}

