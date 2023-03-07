import { Map } from "immutable";
import { ASTNumber, makeASTNumber, makeASTSymbol } from "language-syntax";

import { Environment } from "./environment";

export const environment = Map([
  [
    makeASTSymbol("+"),
    ({ value: valueA }: ASTNumber, { value: valueB }: ASTNumber) =>
      makeASTNumber(valueA + valueB),
  ],
  [
    makeASTSymbol("-"),
    ({ value: valueA }: ASTNumber, { value: valueB }: ASTNumber) =>
      makeASTNumber(valueA - valueB),
  ],
  [
    makeASTSymbol("*"),
    ({ value: valueA }: ASTNumber, { value: valueB }: ASTNumber) =>
      makeASTNumber(valueA * valueB),
  ],
  [
    makeASTSymbol("/"),
    ({ value: valueA }: ASTNumber, { value: valueB }: ASTNumber) =>
      makeASTNumber(Math.floor(valueA / valueB)),
  ],
]) as Environment;
