import { Record, RecordOf } from "immutable";

export interface ASTSymbolProps {
  name: "symbol";
  value: string;
}

const makeASTSymbolRecord = Record<ASTSymbolProps>({
  name: "symbol",
  value: "",
});

export const makeASTSymbol = (value?: string) => makeASTSymbolRecord({ value });

export type ASTSymbol = RecordOf<ASTSymbolProps>;
