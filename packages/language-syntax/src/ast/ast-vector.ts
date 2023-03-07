import { List, Record, RecordOf } from "immutable";

import { ASTNode } from "./ast-node";

export interface ASTVectorProps {
  name: "vector";
  value: List<ASTNode>;
}

const makeASTVectorRecord = Record<ASTVectorProps>({
  name: "vector",
  value: List(),
});

export const makeASTVector = (value?: List<ASTNode>) =>
  makeASTVectorRecord({ value });

export const makeASTVectorOf = (...nodes: Array<ASTNode>) =>
  makeASTVector(List(nodes));

export type ASTVector = RecordOf<ASTVectorProps>;
