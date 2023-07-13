
// See: https://brilliant.org/wiki/shunting-yard-algorithm/

// Learnings: The standard way of writing math expression 1 + 2 - 3 is call infix notation.
// Shunting yard algo will convert infix to reverse polish notation (rpn): 1 2 3 - +
// We can process rpn like: 2 3 -, then 1 -1 + where -1 is the result of 2 - 3
const operands = "/*-+()";
const operate = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
}
const rank = (operand) => {
    /**
     * 5: exponent
     * 4: brackets
     * 3: multiply / divide
     * 2: plus / minus
     */
    if ("-+".includes(operand)) return 2
    if ("*/".includes(operand)) return 3
}
const greater_precedence: (operandA: string, operandB: string) => boolean = (a, b) => {
    return rank(a) > rank(b)
}

const isNumber: (value: string) => boolean = (val) => {
    return !isNaN(+val) && !isNaN(parseFloat(val))
}

export const split_by_operands: (exp: string) => string[] = (exp) => {
    let start = -1;
    const output = []
    for (let i = 0; i < exp.length; i++) {
        if (start == -1 && isNumber(exp[i])) {
            start = i;
        } else if (operands.includes(exp[i])) {
            if (start > -1) {
                // this is a number
                output.push(exp.substring(start, i));
                start = -1;
            }
            output.push(exp.substring(i, i+1));
        }
    }

    if (start != -1) {
        output.push(exp.substring(start, exp.length))
    }

    return output
}

const shuntingYard: (exp: string) => string = (exp) => {
    const operator_stack: string[] = []
    const output_stack: string[] = []
    const tokens: string[] = split_by_operands(exp);

    for (const token of tokens) {
        console.log(`token: ${token}`)
        if (!isNaN(+token)) {
            output_stack.push(token);
            continue
        } else if (operands.includes(token)) {
            if (operator_stack.length == 0 || "(" === token) {
                operator_stack.push(token)
            } else if (")" === token && operator_stack.indexOf("(") > -1) {
                let last_operand = operator_stack.pop();
                while (last_operand != "(") {
                    const b = output_stack.pop();
                    const a = output_stack.pop();
                    output_stack.push(operate[last_operand](+a, +b))
                    last_operand = operator_stack.pop();
                }
            } else {
                let last_operand = operator_stack.pop();
                while (greater_precedence(last_operand, token)) {
                    const b = output_stack.pop();
                    const a = output_stack.pop();
                    output_stack.push(operate[last_operand](+a, +b))

                    if (operator_stack.length > 0) {
                        last_operand = operator_stack.pop()
                    } else {
                        break
                    }
                }
                operator_stack.push(last_operand);
                operator_stack.push(token)
            }
        } 
    }

    while (operator_stack.length > 0) {
        console.log("output: " + output_stack)
        console.log(`operators: ${operator_stack} length: ${operator_stack.length}`)
        const last_operand = operator_stack.pop();
        const b = output_stack.pop();
        const a = output_stack.pop();
        output_stack.push(operate[last_operand](+a, +b))
    }

    return output_stack[0].toString()
}

export default shuntingYard;