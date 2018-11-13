# bamazon
An Amazon-like storefront with the MySQL. 

## How to install the app?
This app is a commmand line node js app so you need to first of all make sure you have nodejs installed on your system. Refer https://nodejs.org/en/download/ for download / install. 

```
git clone git@github.com:albertcoder/bamazon.git
```

```
npm install
```
Now create the bamazon database and populate it with data using the data.sql file provided. You can use the MySQL server app like Workbench to execute the queries inside the .sql file.

## How to run the app?
You need to go to the root directory of the bamazon app, then go to either customer or manager depending on what you want to use the app as. If you go into the customer folder then run the following command:

```javascript
node bamazonCustomer.js
```

Else if you choose to go into the manager folder execute the following command.

```javascript
node bamazonManager.js
```

Then select one of the following options. Then the prompt will ask you to enter a valid input which will yield your results.
