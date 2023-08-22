const calculator = (operation) =>
{
    switch (operation) 
    {
        case 'add':
            return add;
        case 'subtract':
            return subtract;
        case 'multiply':
            return multiply;
        case 'divide':
            return divide;
        case 'factorial':
            return factorial;
        default:
            return [404, 'Invalid operation'];
    }
    
}
const add = (...number) => {
    let sum = 0;
    for (let i = 0; i <number.length; i++) {
        if (typeof number[i] != 'number') {
            return [404, 'Wrong!'];
        }
        sum +=number[i];
    }
    return [sum, 'Success'];
};

const subtract = (...number) => {
    let sub = 0;
    for (let i = 0; i <number.length; i++) {
        if (typeof number[i] !== 'number') {
            return [404, 'Wrong!'];
        }
        sub -= number[i];
    }
    return [sub, 'Success'];
};

const multiply = (...number) => {
    let result = 1;
    for (let i = 0; i < number.length; i++) {
        if (typeof number[i] !== 'number') {
            return [404, 'Wrong!'];
        }
        result *= number[i];
    }
    return [result, 'Success'];
};

const divide = (number1, number2) => {
    if (typeof number1 !== 'number' || typeof number2 !== 'number' || number2 === 0) {
        return [404, 'Wrong!'];
    }
    return [number1 / number2, 'Success'];
};

const factorial = (number) => {
    if (typeof number !== 'number' || number < 0) {
        return [404, 'Wrong!'];
    }
    let result = 1;
    for (let i = 2; i <= number; i++) {
        result *= i;
    }
    return [result, 'Success'];
};

const Ceil =(operation,...number)=>
{
    const final ={
        ceil:[]
    }
    if (typeof opertation != 'string'&&typeof num != 'number')
    {
        return [404,'Wrong!']
    }else
    {
        for(let i=0;i<num.length;i++)
        {
            final.ceil.push(Math.ceil(num[i]));
        }
        return final;
    }
}
const Floor =(operation,...number)=>
{
    const final ={
        floor:[]
    }
    if (typeof opertation != 'string'&&typeof num != 'number')
    {
        return [404,'Wrong!']
    }else
    {
        for(let i=0;i<num.length;i++)
        {
            final.floor.push(Math.ceil(num[i]));
        }
        return final;
    }
}
