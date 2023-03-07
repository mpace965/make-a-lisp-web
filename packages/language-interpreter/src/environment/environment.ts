import { Map } from "immutable";
import { ASTNode, ASTSymbol } from "language-syntax";

export type Environment = Map<ASTSymbol, EnvironmentValue>;

export type EnvironmentValue = ASTNode | EnvironmentFn;
type EnvironmentFn = (...nodes: ASTNode[]) => ASTNode;
