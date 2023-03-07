import { ASTBoolean } from "./ast-boolean";
import { ASTHashMap } from "./ast-hash-map";
import { ASTKeyword } from "./ast-keyword";
import { ASTList } from "./ast-list";
import { ASTNil } from "./ast-nil";
import { ASTNumber } from "./ast-number";
import { ASTString } from "./ast-string";
import { ASTSymbol } from "./ast-symbol";
import { ASTVector } from "./ast-vector";

export type ASTNode =
  | ASTBoolean
  | ASTHashMap
  | ASTKeyword
  | ASTList
  | ASTNil
  | ASTNumber
  | ASTString
  | ASTSymbol
  | ASTVector;
