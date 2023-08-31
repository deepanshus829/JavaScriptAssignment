const Account = require('./Accounts');
const Customer = require("./Customer")
class Bank {
    static id = 0;
    static banks = [];

    constructor(bankName, initials) {
        this.bankName = bankName;
        this.id = Bank.id++;
        this.initials = Bank.getInitials(bankName);
    }
    updateName(newBankName) {
        if (typeof newBankName !== 'string') {
            throw new Error("Invalid bank name");
        }
        this.bankName = newBankName;
    }

    static getInitials(fullName) {
        const words = fullName.split(' ');
        const initials = words.map(word => word[0].toUpperCase());
        return initials.join('');
    }


    static getBankById(bankId) {
        return Bank.banks.find(bank => bank.id === bankId);
    }

    static deleteBankById(bankId) {
        const index = Bank.banks.findIndex(bank => bank.id === bankId);
        if (index !== -1) {
            Bank.banks.splice(index, 1);
        }
    }

}

module.exports = Bank;
