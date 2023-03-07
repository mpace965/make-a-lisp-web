import {
  ASTNode,
  makeASTHashMap,
  makeASTHashMapOf,
  makeASTKeyword,
  makeASTList,
  makeASTListOf,
  makeASTNumber,
  makeASTString,
  makeASTSymbol,
  makeASTVector,
  makeASTVectorOf,
} from "language-syntax";
import { describe, it, expect } from "vitest";

import { Step2Environment, evaluate } from "..";

// https://github.com/kanaka/mal/blob/dcf8f4d7b9cf7b858850a04a0b835d6a9f4e7176/impls/tests/step2_eval.mal

describe("make a lisp step 2 tests", () => {
  it("adds two numbers together", () => {
    // (+ 1 2)
    const expression = makeASTListOf(
      makeASTSymbol("+"),
      makeASTNumber(1),
      makeASTNumber(2)
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(3);
  });

  it("handles nested list evaluation", () => {
    // (+ 5 (* 2 3))
    const expression = makeASTListOf(
      makeASTSymbol("+"),
      makeASTNumber(5),
      makeASTListOf(makeASTSymbol("*"), makeASTNumber(2), makeASTNumber(3))
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(11);
  });

  it("handles nested list evaluation when the list is not the last element", () => {
    // (- (+ 5 (* 2 3)) 3)
    const expression = makeASTListOf(
      makeASTSymbol("-"),
      makeASTListOf(
        makeASTSymbol("+"),
        makeASTNumber(5),
        makeASTListOf(makeASTSymbol("*"), makeASTNumber(2), makeASTNumber(3))
      ),
      makeASTNumber(3)
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(8);
  });

  it("handles evaluating a deeply nested expression", () => {
    // (/ (- (+ 5 (* 2 3)) 3) 4)
    const expression = makeASTListOf(
      makeASTSymbol("/"),
      makeASTListOf(
        makeASTSymbol("-"),
        makeASTListOf(
          makeASTSymbol("+"),
          makeASTNumber(5),
          makeASTListOf(makeASTSymbol("*"), makeASTNumber(2), makeASTNumber(3))
        ),
        makeASTNumber(3)
      ),
      makeASTNumber(4)
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(2);
  });

  it("handles evaluating a deeply nested expression with larger numbers", () => {
    // (/ (- (+ 515 (* 87 311)) 302) 27)
    const expression = makeASTListOf(
      makeASTSymbol("/"),
      makeASTListOf(
        makeASTSymbol("-"),
        makeASTListOf(
          makeASTSymbol("+"),
          makeASTNumber(515),
          makeASTListOf(
            makeASTSymbol("*"),
            makeASTNumber(87),
            makeASTNumber(311)
          )
        ),
        makeASTNumber(302)
      ),
      makeASTNumber(27)
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(1010);
  });

  it("handles negative numbers", () => {
    // (* -3 6)
    const expression = makeASTListOf(
      makeASTSymbol("*"),
      makeASTNumber(-3),
      makeASTNumber(6)
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(-18);
  });

  it("handles negative numbers in a deeply nested expression", () => {
    // (/ (- (+ 515 (* -87 311)) 296) 27)
    const expression = makeASTListOf(
      makeASTSymbol("/"),
      makeASTListOf(
        makeASTSymbol("-"),
        makeASTListOf(
          makeASTSymbol("+"),
          makeASTNumber(515),
          makeASTListOf(
            makeASTSymbol("*"),
            makeASTNumber(-87),
            makeASTNumber(311)
          )
        ),
        makeASTNumber(296)
      ),
      makeASTNumber(27)
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.value).toBe(-994);
  });

  it("throws an error when an unbound symbol is encountered", () => {
    // (abc 1 2 3)
    const expression = makeASTListOf(
      makeASTSymbol("abc"),
      makeASTNumber(1),
      makeASTNumber(2),
      makeASTNumber(3)
    );

    expect(() => {
      evaluate(expression, Step2Environment.environment);
    }).toThrowError("Unbound symbol abc");
  });

  it("evaluates each of the elements of a vector", () => {
    const expression = makeASTVectorOf(
      makeASTNumber(1),
      makeASTNumber(2),
      makeASTListOf(makeASTSymbol("+"), makeASTNumber(1), makeASTNumber(2))
    );
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(
      result.equals(
        makeASTVectorOf(makeASTNumber(1), makeASTNumber(2), makeASTNumber(3))
      )
    ).toBe(true);
  });

  it("evaluates hashmap values with string keys", () => {
    const expression = makeASTHashMapOf([
      makeASTString("a"),
      makeASTListOf(makeASTSymbol("+"), makeASTNumber(7), makeASTNumber(8)),
    ]);
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(
      result.equals(makeASTHashMapOf([makeASTString("a"), makeASTNumber(15)]))
    ).toBe(true);
  });

  it("evaluates hashmap values with keyword keys", () => {
    const expression = makeASTHashMapOf([
      makeASTKeyword("a"),
      makeASTListOf(makeASTSymbol("+"), makeASTNumber(7), makeASTNumber(8)),
    ]);
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(
      result.equals(makeASTHashMapOf([makeASTKeyword("a"), makeASTNumber(15)]))
    ).toBe(true);
  });

  it("evaluates hashmap keys", () => {
    const expression = makeASTHashMapOf([
      makeASTListOf(makeASTSymbol("/"), makeASTNumber(4), makeASTNumber(2)),
      makeASTListOf(makeASTSymbol("+"), makeASTNumber(7), makeASTNumber(8)),
    ]);
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(
      result.equals(makeASTHashMapOf([makeASTNumber(2), makeASTNumber(15)]))
    ).toBe(true);
  });

  it("evaluates an empty list to an empty list", () => {
    const expression = makeASTList();
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.equals(makeASTList())).toBe(true);
  });

  it("evaluates an empty vector to an empty vector", () => {
    const expression = makeASTVector();
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.equals(makeASTVector())).toBe(true);
  });

  it("evaluates an empty hashmap to an empty hashmap", () => {
    const expression = makeASTHashMap();
    const result = evaluate(
      expression,
      Step2Environment.environment
    ) as ASTNode;

    expect(result.equals(makeASTHashMap())).toBe(true);
  });
});
