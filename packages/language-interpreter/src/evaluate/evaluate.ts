import {
  ASTHashMap,
  ASTList,
  ASTNode,
  ASTSymbol,
  ASTVector,
} from "language-syntax";

import { Environment, EnvironmentValue } from "../environment";

export function evaluate(
  node: ASTNode,
  environment: Environment
): EnvironmentValue {
  if (node.name === "symbol") {
    return evaluateSymbol(node, environment);
  }

  if (node.name === "list") {
    if (node.value.isEmpty()) {
      return node;
    }

    const evaluatedList = evaluateList(node, environment);
    // TODO: remove this horrible hack once function types are completed
    const firstElement = evaluatedList.value.get(0) as unknown as
      | EnvironmentValue
      | undefined;
    const rest = evaluatedList.value.skip(1);

    if (firstElement && typeof firstElement === "function") {
      return firstElement(...rest);
    }

    return evaluatedList;
  }

  if (node.name === "vector") {
    return evaluateVector(node, environment);
  }

  if (node.name === "hash-map") {
    return evaluateHashMap(node, environment);
  }

  return node;
}

function evaluateSymbol(
  node: ASTSymbol,
  environment: Environment
): EnvironmentValue {
  const value = environment.get(node);

  if (value) {
    return value;
  }

  throw new UnboundSymbolError(`Unbound symbol ${node.value}`);
}

class UnboundSymbolError extends Error {}

function evaluateList(node: ASTList, environment: Environment): ASTList {
  return node.update("value", (value) =>
    value.map((listElement) => evaluate(listElement, environment) as ASTNode)
  );
}

function evaluateVector(node: ASTVector, environment: Environment): ASTVector {
  return node.update("value", (value) =>
    value.map(
      (vectorElement) => evaluate(vectorElement, environment) as ASTNode
    )
  );
}

function evaluateHashMap(
  node: ASTHashMap,
  environment: Environment
): ASTHashMap {
  return node.update("value", (value) =>
    value.mapEntries(([key, value]) => [
      evaluate(key, environment) as ASTNode,
      evaluate(value, environment) as ASTNode,
    ])
  );
}
