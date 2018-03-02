var operator = ['+', '-', 'x', '/', '^'];
var input = document.getElementById("display");
var decimalAdded = false;



function Stack() {
    this.datastore = [];
    this.tos = 0;
    this.push = function (element) {
        this.datastore[this.tos++] = element;
    }
    this.pop = function () {
        return this.datastore[--this.tos];
    }
    this.peek = function () {
        return this.datastore[this.tos - 1];
    }
    this.length = function () {
        return this.tos;
    }
}

function reset() {
    input.value = "0";
    decimalAdded = false;
}

function dele() {
    // var del = newguy;
    var a;
    if (input.length != 0) {
        a = input.value.substring(0, input.value.length - 1);
        input.value = a;
    }
    // var newguy = input.value;
    // return newguy;
}

function equalto() {
    // var trigo = new trig();
    var equation = input.value;
    var lastChar = equation.substring(equation.length - 1);
    equation = equation.replace(/x/g, '*');

    if (equation.indexOf("%") > -1) {
        var res = equation.split('%');
        input.value = (res[0] / 100) * res[1];
    } else {
        if (operator.indexOf(lastChar) > -1) {
            equation = equation.substring(0, equation.length - 1);
        }
        if (equation != '') {
            if (checkParentheses(equation) == true) {
                var postfix = shuntingAlgo(equation);
                var result = postfixoperation(postfix);
                input.value = result;
            } else
                input.value = "Unmatched Parentheses";
        }
        //input.value = eval(equation);
    }

    if (input.value.indexOf('.') > -1)
        decimalAdded = true;
    else
        decimalAdded = false;

}

function displayarithmetricbutton(btnValue) {
    var inputVal = input.value;
    var lastChar = inputVal.substring(inputVal.length - 1);
    var btnVal = btnValue;

    if (inputVal != '' && operator.indexOf(lastChar) == -1) {
        input.value += " " + btnVal + " ";
    } else if (inputVal == '' && btnVal == '-') {
        input.value += btnVal;
    }

    if (operator.indexOf(lastChar) > -1 && inputVal.length > 1) {
        //input.value.replace(/.$/, btnVal);
        input.value = inputVal.substring(0, inputVal.length - 1) + btnVal;
    }

    decimalAdded = false;

}

function displaydecbutton(btnValue) {
    var btnVal = btnValue;

    if (!decimalAdded) {
        input.value += btnVal;
        decimalAdded = true;
    }
}

function displaybutton(btnValue) {
    var btnVal = btnValue;
    if (input.value == '0')
        input.value = "";

    input.value += btnVal;
    //decimalAdded = false;

}

function displayperbutton(btnValue) {
    var inputVal = input.value;
    var btnVal = btnValue;

    if (inputVal != '' && inputVal.indexOf('-') == -1 && inputVal.indexOf('+') == -1 &&
        inputVal.indexOf('/') == -1 && inputVal.indexOf('x') == -1 && inputVal.indexOf('^') == -1 &&
        inputVal.indexOf('(') == -1 && inputVal.indexOf(')') == -1 &&
        inputVal.indexOf('%') == -1) {
        input.value += btnVal;
    }
}

function displaybrackets(btnValue) {
    if (input.value == '0')
        input.value = "";

    var btnVal = btnValue;

    if (btnVal == '(')
        input.value += btnVal;
    else
        input.value += btnVal;

    decimalAdded = false;
}

function checkParentheses(expression) {
    var operators = '+,-,/,^,*';
    var s = new Stack();

    for (var i = 0; i < expression.length; i++) {

        if (operator.indexOf(expression[i - 1]) > -1 && expression[i] == '(') {
            s.push(expression[i]);
        }
        if (operators.indexOf(expression[0]) == -1 || operators.indexOf(expression[i - 1]) == -1 && expression[i] == '(') {
            console.log('error');
            // input.value = "0";
        }
        if (expression[i - 1] == isNaN && expression[i] == ')') {
            console.log('rubbish');
        }
        if (expression[i] == ')')
            s.pop();
        // else if (inputVal != '' && inputVal.indexOf('-') == -1 && inputVal.indexOf('+') == -1 &&
        //     inputVal.indexOf('/') == -1 && inputVal.indexOf('x') == -1 && inputVal.indexOf('^') == -1 &&
        //     inputVal.indexOf('(') == -1 && inputVal.indexOf(')') == -1 &&
        //     inputVal.indexOf('%') == -1 && expression[i]==')')
        //     s.pop(')');
    }
    if (s.length() == 0) {
        console.log("balanced");
        return true;
    } else {
        console.log("unbalanced");
        return false;
    }

}

/*to convert infix to postfix expression*/

function shuntingAlgo(expression) {
    var operators = '+,-,/,*,^';
    var precedence = {
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };
    var associative = {
        '^': 'Right',
        '*': 'Left',
        '/': 'Left',
        '+': 'Left',
        '-': 'Left'
    };
    var postfix = "";
    var s = new Stack();
    var token;
    var operator1;
    var operator2;

    var res1 = expression.split(" ");

    for (var i = 0; i < res1.length; i++) {
        token = res1[i];


        if (operators.indexOf(token) == -1 && token != '(' && token != ')')
            postfix += token + " ";
        else if (operators.indexOf(token) > -1) {
            operator1 = token;
            operator2 = s.peek();
            while (operators.indexOf(operator2) > -1 && ((associative[operator2] == 'Left' && precedence[operator1] <= precedence[operator2]) ||

                    (associative[operator2] == 'Right' && precedence[operator1] < precedence[operator2]))) {
                postfix += operator2 + " ";
                s.pop();
                operator2 = s.peek();
            }
            s.push(operator1);
        } else if (token == '(') {
            s.push(token);
        } else if (token == ')') {
            while (s.peek() != '(') {
                postfix += s.pop() + " ";
            }
            s.pop();
        }
        // if (expression[0] == isNaN && operators.indexOf(token) > -1 || token == ')') {
        //     input.value = "0";
        //     postfix = "";
        //     console.log('cannot start with this');
        // }
        console.log(token);
    }
    console.log(expression);
    while (s.length() > 0) {
        postfix += s.pop() + " ";
    }

    console.log(postfix);
    return postfix;
}

function postfixoperation(postfix) {
    var operators = '+,/,-,*,^,²,&';
    var s = new Stack();
    var res2 = postfix.split(" ");

    for (var j = 0; j < res2.length - 1; j++) {
        if (operators.indexOf(res2[j]) == -1) {
            s.push(res2[j]);
        } else if (operators.indexOf(res2[j]) > -1) {
            var op1 = s.pop();
            var op2 = s.pop();

            var inteResult = processIntermediateResult(op1, op2, res2[j]);
            s.push(inteResult);
        }
        // if (operators.indexOf(res2[j]) == "²" && operators.indexOf(res2[j]) > -1) {
        //     var ii = op2;
        //     op1 = ii;
        //     op1 = s.pop();
        //     op2 = s.pop();
        //     inteResult = processIntermediateResult(op2, op1, res2[j]);
        //     s.push(inteResult);
        // }
    }

    return s.pop();

}
/**
 * recurssive function that two values
 * @param {*} operand1 : 
 * @param {*} operand2 :
 * @param {*} operator :
 */
function processIntermediateResult(operand1, operand2, operator) {
    var interResult;

    switch (operator) {
        case '+':
            interResult = Number(operand2) + Number(operand1);
            break;
        case '-':
            interResult = Number(operand2) - Number(operand1);
            break;
        case '*':
            interResult = Number(operand2) * Number(operand1);
            break;
        case '/':
            interResult = Number(operand2) / Number(operand1);
            break;
        case '^':
            interResult = Math.pow(Number(operand2), Number(operand1));
            break;
        default:
            console.log("could not be processed");
    }

    return interResult;
}

var pi = document.getElementById('btnpie');

var as = document.getElementById('sinh');
var ac = document.getElementById('cosh');
var at = document.getElementById('tanh');
var s = document.getElementById('sin');
var c = document.getElementById('cos');
var t = document.getElementById('tan');
var d = document.getElementById('sqr');


s.addEventListener("click", function (expression) {
    expression = input.value;
    input.value = Math.sin(expression);
});
as.addEventListener("click", function (expression) {
    expression = input.value;
    input.value = Math.sinh(expression);
});

c.addEventListener("click", function (expression) {
    expression = input.value;
    input.value = Math.cos(expression);
});

ac.addEventListener("click", function (expression) {
    expression = input.value;
    input.value = Math.cosh(expression);
});

t.addEventListener("click", function (expression) {
    expression = input.value;
    input.value = Math.tan(expression);
});

at.addEventListener("click", function (expression) {
    expression = input.value;
    input.value = Math.tanh(expression);
});
d.addEventListener("click", function () {
    expression = input.value;
    input.value = Math.sqrt(expression);
});