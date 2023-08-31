const Customer = require('./Customer');
const Account = require('./Accounts');
const Bank = require('./Bank');

// Create customers
const admin = new Customer().newAdmin("Deep");
const customer1 = admin.newCustomer("Akon", "Singh");
const customer2 = admin.newCustomer("John", "Doe");

admin.updateCustomer(3,'firstName',"Jhonny")

console.log(admin);
console.log(customer1);
console.log(customer2);

//Create banks
const bank1 = admin.createBank("State Bank Of India");
const bank2 = admin.createBank("Bank Of America");
//console.log("-----",bank1.id);

const bankToBeUpdated = admin.updateBank(0, "New Bank Name");




console.log(bank1);
console.log(Bank.getInitials(bank1.bankName));

console.log(bank2);
console.log(Bank.getInitials(bank2.bankName));



// Create accounts for customer1
const account1C1 = customer1.createAccount("C1-Account1", bank1);  // Pass bank1
const account2C1 = customer1.createAccount("C1-Account2", bank2);  // Pass bank2

// Create accounts for customer2
const account1C2 = customer2.createAccount("C2-Account1", bank1);  // Pass bank1
const account2C2 = customer2.createAccount("C2-Account2", bank2);  // Pass bank2


// Deposit money into accounts
account1C1.deposit(1000);
account2C1.deposit(1500);
account1C2.deposit(2000);
account2C2.deposit(2500); 

console.log("Accounts created and funds deposited:");
console.log("Customer 1 Account 1 Balance:", account1C1.getBalance());
console.log("Customer 1 Account 2 Balance:", account2C1.getBalance());
console.log("Customer 2 Account 1 Balance:", account1C2.getBalance());
console.log("Customer 2 Account 2 Balance:", account2C2.getBalance());


// Print passbooks after transfer
console.log("Passbooks after transfer:");
customer1.viewPassbook(customer1.id);
customer2.viewPassbook(customer2.id);
