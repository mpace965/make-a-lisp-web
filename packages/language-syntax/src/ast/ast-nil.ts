import { Record, RecordOf } from "immutable";

type Nil = typeof Nil;
const Nil = Symbol.for("nil");

export interface ASTNilProps {
  name: "nil";
  value: Nil;
}

const makeASTNilRecord = Record<ASTNilProps>({ name: "nil", value: Nil });

export const makeASTNil = () => makeASTNilRecord();

export type ASTNil = RecordOf<ASTNilProps>;
