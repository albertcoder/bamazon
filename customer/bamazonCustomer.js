// Inquire prompt to ask questions to the user
var inquirer = require("inquirer");

// Use mysql npm package for enabling mysql
var mysql = require("mysql");

// For validations
var validator = require('validator');

require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  showProducts();
});

// // First input of the user
// var userID = "";

// // Second input of the user
// var quantity = "";

function showProducts() {
  var query = "SELECT * from products";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(res);
    askUserForItemId(res);
  });
}

function askUserForItemId(stock) {
  inquirer.prompt([{
    name: "input1",
    type: "input",
    message: "What's the item_id(look in the table) of the product you would like to buy? [Press Ctrl+C to quit]",
    validate: function (name) {
      if (name === '' || (!validator.isNumeric(name))) {
        console.log("\n Invalid input. Please enter a valid item ID (look in the table)");
        return false;
      } else {
        return true;
      }
    }
  }]).then(function (data) {
    var userID = parseInt(data.input1);
    // console.log("Line 64 " + userID);
    var product = checkInventory(userID, stock);
    // console.log(product);

    // If there is a product with the id the user chose, prompt the customer for a desired quantity
    if (product) {
      // Pass the chosen product to promptCustomerForQuantity
      askUserForQuantity(product);
    } else {
      // Otherwise let them know the item is not in the inventory, re-run loadProducts
      console.log("\nThat item is not in the inventory.");
      showProducts();
    }
  });
}

function askUserForQuantity(product) {
  inquirer.prompt([{
    name: "input2",
    type: "input",
    message: "How many units of the product would you like to buy? [Press Ctrl+C to quit]",
    validate: function (name) {
      if (name === '' || (!validator.isNumeric(name))) {
        console.log("\n Invalid input. Please enter a valid product ID (number)");
        return false;
      } else {
        return true;
      }
    }
  }]).then(function (data) {
    var quantity = parseInt(data.input2);
    console.log(quantity);
          if (quantity > product.stock_quantity) {
            console.log("\nInsufficient quantity!");
            showProducts();
          }
          else {
            buy(product, quantity);
            console.log("Ready to buy!");
          }
  });
}

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      console.log("Item exists!");
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

function buy(product, quantity) {
  var remainingQuantity = product.stock_quantity - quantity;
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{stock_quantity: remainingQuantity}, {item_id: product.item_id}],
    function(err, res) {
        // console.log('RES AFTER PURCHASE: ', res)
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      showProducts();
    }
  );
}
