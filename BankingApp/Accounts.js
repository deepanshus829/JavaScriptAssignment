const Customer = require("./Customer")
const Bank = require("./Bank")
class Account {
    static initialBalance = 1000;
    static accounts = [];

    constructor(accountNumber, customer,bank) {
        this.accountNumber = accountNumber;
        this.customer = customer;
        this.balance = Account.initialBalance;
        this.passbook = [];
        this.bank=bank;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Invalid amount for deposit");
        }
        this.balance += amount;
        this.addTransactionEntry('Credit', amount, this, this.bank.initials, this.bank.initials);
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Invalid amount for withdrawal");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
        this.addTransactionEntry('Debit', amount, this, this.bank.initials, this.bank.initials);
    }
    

    transfer(receiverAccountId, amount) {
        const receiverAccount = Account.getAccountById(receiverAccountId);
    
        if (!receiverAccount) {
            throw new Error("Receiver account not found");
        }
    
        if (amount <= 0 || amount > this.balance) {
            throw new Error("Invalid amount for transfer");
        }
    
        if (this.customer !== receiverAccount.customer) {
            throw new Error("You can only transfer to your own accounts");
        }
    
        this.withdraw(amount);
        receiverAccount.deposit(amount);
    
        this.addTransactionEntry('Debit', amount, receiverAccount, this.customer.bank.initials, receiverAccount.customer.bank.initials);
        receiverAccount.addTransactionEntry('Credit', amount, this, this.customer.bank.initials, receiverAccount.customer.bank.initials);
    }
    addTransactionEntry(transactionType, amount, receiverAccount, senderBankInitials, receiverBankInitials) {
        const entry = {
            date: new Date().toISOString(),
            transactionType: transactionType,
            amount: amount,
            senderAccount: this.accountNumber,
            receiverAccount: receiverAccount.accountNumber,
            senderBank: senderBankInitials,
            receiverBank: receiverBankInitials
        };
        this.passbook.push(entry);
    }
    
    getBalance() {
        return this.balance;
    }

    static getAccountById(accountId) {
        return Account.accounts.find(account => account.accountNumber === accountId);
    }
}

module.exports = Account;
