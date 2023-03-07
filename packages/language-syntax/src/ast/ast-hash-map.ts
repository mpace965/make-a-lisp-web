import { Map, Record, RecordOf } from "immutable";

import { ASTNode } from "./ast-node";

export interface ASTHashMapProps {
  name: "hash-map";
  value: Map<ASTNode, ASTNode>;
}

const makeASTHashMapRecord = Record<ASTHashMapProps>({
  name: "hash-map",
  value: Map(),
});

export const makeASTHashMap = (value?: Map<ASTNode, ASTNode>) =>
  makeASTHashMapRecord({ value });

export const makeASTHashMapOf = (...pairs: Array<[ASTNode, ASTNode]>) =>
  makeASTHashMap(Map(pairs));

export type ASTHashMap = RecordOf<ASTHashMapProps>;
