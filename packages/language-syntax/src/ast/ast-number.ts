import { Record, RecordOf } from "immutable";

export interface ASTNumberProps {
  name: "number";
  value: number;
}

const makeASTNumberRecord = Record<ASTNumberProps>({
  name: "number",
  value: 0,
});

export const makeASTNumber = (value?: number) => makeASTNumberRecord({ value });

export type ASTNumber = RecordOf<ASTNumberProps>;
