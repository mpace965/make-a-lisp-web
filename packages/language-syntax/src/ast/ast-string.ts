import { Record, RecordOf } from "immutable";

export interface ASTStringProps {
  name: "string";
  value: string;
}

const makeASTStringRecord = Record<ASTStringProps>({
  name: "string",
  value: "",
});

export const makeASTString = (value?: string) => makeASTStringRecord({ value });

export type ASTString = RecordOf<ASTStringProps>;
