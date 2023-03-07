import { Record, RecordOf } from "immutable";

export interface ASTBooleanProps {
  name: "boolean";
  value: boolean;
}

const makeASTBooleanRecord = Record<ASTBooleanProps>({
  name: "boolean",
  value: false,
});

export const makeASTBoolean = (value?: boolean) =>
  makeASTBooleanRecord({ value });

export type ASTBoolean = RecordOf<ASTBooleanProps>;
