import shuntingYard, { split_by_operands } from './shuntingYard'

test('that 1 + 2 = 3', () => {
    expect(shuntingYard("1+2")).toBe("3");
});

test('that 1 + 2 * 5 - 3 = 8', () => {
    expect(shuntingYard("1+2*5-3")).toBe("8");
});

test('that 2 * 5 / 8 = 1.25', () => {
    expect(shuntingYard("2*5/8")).toBe("1.25");
});

test('2 * (80 - 6 * 8) / 8 is split correctly', () => {
    const tokens = split_by_operands("2*(80-6*8)/8");
    const expected_tokens = ["2", "*", "(", "80", "-", "6", "*", "8", ")", "/", "8"]
    expect(expected_tokens.length).toBe(tokens.length);

    for (let i = 0; i < tokens.length; i++) {
        expect(expected_tokens[i]).toBe(tokens[i]);
    }
});

test('that 2 * (80 - 6 * 8) / 8 = 8', () => {
    expect(shuntingYard("2*(80-6*8)/8")).toBe("8");
});