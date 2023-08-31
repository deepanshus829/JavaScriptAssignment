const Bank = require('./Bank');
const Account = require('./Accounts');

class Customer {
    static id = 0;
    static allCustomers = [];
    static accounts = [];
    static banks = [];

    constructor(AdminName, isAdmin, firstName, lastName) {
        this.AdminName = AdminName;
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accounts = [];
        this.id = Customer.id++;
    }

    newAdmin(AdminName) {
        try {
            if (typeof AdminName !== 'string') {
                throw new Error("Invalid Admin Name");
            }
            return new Customer(AdminName, true);
        } catch (error) {
            console.log(error.message);
        }
    }

    newCustomer(firstName, lastName) {
        try {
            if (typeof firstName !== 'string' || typeof lastName !== 'string') {
                throw new Error("Invalid First or Last Name");
            }
            if (!this.isAdmin) {
                throw new Error("Not an Admin");
            }
            let newCustomer = new Customer('', false, firstName, lastName);
            Customer.allCustomers.push(newCustomer);
            return newCustomer;
        } catch (error) {
          console.log(error.message);  
        }
    }
    getAllCustomer()
    {
        try {
            if (!this.isAdmin) {
                throw new Error("Not a Admin")
            }
            return Customer.allCustomers
        } catch (error) {
            console.log(error.message);
        }
    }

    #updateFirstName(newName) {
        this.firstName = newName;
    }
    #updateLastName(newName) {
        this.lastName = newName;
    }
    static #findCustomer(customerId) {
        for (let index = 0; index < Customer.allCustomers.length; index++) {
            if (customerId == Customer.allCustomers[index].id) {
                return [Customer.allCustomers[index], index]
            }
        }
        return [null, -1]
    }
    updateCustomer(customerId, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new Error("Not a Admin")
            }
            let [customerToBeUpdated, index] = Customer.#findCustomer(customerId);
            if (customerToBeUpdated == null) {
                throw new Error("No user Found");
            }
            switch (parameter) {
                case 'firstName': customerToBeUpdated.#updateFirstName(newValue)
                    break;
                case 'lastName': customerToBeUpdated.#updateLastName(newValue)
                    break;
                default:
                    break;
            }
            return customerToBeUpdated
        } catch (error) {
            console.log(error.message);
        }
    }
    deletCustomer(customerId) {
        try {
            if (!this.isAdmin) {
                throw new Error("Not a Admin")
            }
            let [customerToBeDeleted, index] = User.#findCustomer(customerId);

            Customer.allCustomers.splice(index, 1)
            return customerToBeDeleted;
        }

        catch (error) {
            console.log(error.message);
        }

    }

    createAccount(accountNumber, bank) {
        if (typeof accountNumber !== 'string') {
            throw new Error("Invalid account number");
        }
    
        let newAccount = new Account(accountNumber, this, bank); // Pass the bank as a parameter
        this.accounts.push(newAccount);
        Account.accounts.push(newAccount);
        return newAccount;
    }
    createBank(bankName) {
        try {
            if (!this.isAdmin) {
                throw new Error("Only Admin can create a bank");
            }
            if (typeof bankName !== 'string') {
                throw new Error("Invalid bank name");
            }
            let newBank = new Bank(bankName);
            Customer.banks.push(newBank);
            Customer.banks.push(newBank);
            return newBank;
    } catch (error) {
        console.log(error.message);
    }
    }
    updateBank(bankId, newBankName) {
        try {
            if (!this.isAdmin) {
                throw new Error("Only Admin can update a bank");
            }
            
            const bankToBeUpdated = Bank.getBankById(bankId);
            if (!bankToBeUpdated) {
                throw new Error("Bank not found");
            }
            
            bankToBeUpdated.updateName(newBankName); // Update the bank's name
            
            return bankToBeUpdated;
        } catch (error) {
            console.log(error.message);
        }
    }
    deleteBank(bankId) {
        if (!this.isAdmin) {
            throw new Error("Only Admin can delete a bank");
        }
        const bankToBeDeleted = Bank.getBankById(bankId);
        if (!bankToBeDeleted) {
            throw new Error("Bank not found");
        }
        Bank.deleteBankById(bankId);
    }
    transferMoney(senderAccountId, receiverAccountId, amount) {
        const senderAccount = Account.getAccountById(senderAccountId);
        const receiverAccount = Account.getAccountById(receiverAccountId);
    
        if (!senderAccount || !receiverAccount) {
            throw new Error("Sender or receiver account not found");
        }
    
        if (senderAccount.customer !== this) {
            throw new Error("You can only transfer from your own accounts");
        }
    
        senderAccount.withdraw(amount); // Withdraw from sender
        receiverAccount.deposit(amount); // Deposit to receiver
    
        // Create transaction entries for passbooks
        senderAccount.addTransactionEntry('debit', amount, receiverAccount, senderAccount.bank.initials, receiverAccount.bank.initials);
        receiverAccount.addTransactionEntry('credit', amount, senderAccount, senderAccount.bank.initials, receiverAccount.bank.initials);
    }
    viewPassbook(customerId) {
        // const [customer] = Customer.#findCustomer(customerId);
        
        // if (!customer) {
        //     throw new Error("Customer not found");
        // }
    console.log(this);
        if (!customer.accounts || customer.accounts.length === 0) {
            console.log("No accounts found for this customer.");
            return;
        }
        
        console.log("Passbook Entries for Customer:", customer.firstName, customer.lastName);
        console.log("----------------------------");
        
        for (const account of customer.accounts) {
            console.log("Account:", account.accountNumber);
            console.log("Balance:", account.balance);
            console.log("Passbook Entries:");
            for (const entry of account.passbook) {
                console.log("Date:", entry.date);
                console.log("Transaction Type:", entry.transactionType);
                console.log("Amount:", entry.amount);
                console.log("Sender Bank:", entry.senderBank);
                console.log("Receiver Bank:", entry.receiverBank);
                console.log("----------------------------");
            }
        }
    }
    
    
}

module.exports = Customer;
