import { List, Record, RecordOf } from "immutable";

import { ASTNode } from "./ast-node";

export interface ASTListProps {
  name: "list";
  value: List<ASTNode>;
}

const makeASTListRecord = Record<ASTListProps>({
  name: "list",
  value: List(),
});

export const makeASTList = (value?: List<ASTNode>) =>
  makeASTListRecord({ value });

export const makeASTListOf = (...nodes: Array<ASTNode>) =>
  makeASTList(List(nodes));

export type ASTList = RecordOf<ASTListProps>;
