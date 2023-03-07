import { Record, RecordOf } from "immutable";

export interface ASTKeywordProps {
  name: "keyword";
  value: string;
}

const makeASTKeywordRecord = Record<ASTKeywordProps>({
  name: "keyword",
  value: "",
});

export const makeASTKeyword = (value?: string) =>
  makeASTKeywordRecord({ value });

export type ASTKeyword = RecordOf<ASTKeywordProps>;
