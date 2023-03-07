import { List, Map } from "immutable";

import {
  ASTNode,
  makeASTHashMap,
  makeASTKeyword,
  makeASTList,
  makeASTNumber,
  makeASTString,
  makeASTSymbol,
} from "..";

export const expression = makeASTList(
  List.of<ASTNode>(makeASTSymbol("+"), makeASTNumber(2), makeASTNumber(5))
);

export const expression2 = makeASTList(
  List.of<ASTNode>(
    makeASTSymbol("+"),
    makeASTNumber(2),
    makeASTList(
      List.of<ASTNode>(makeASTSymbol("*"), makeASTNumber(3), makeASTNumber(4))
    ),
    makeASTList(
      List.of<ASTNode>(
        makeASTSymbol("*"),
        makeASTNumber(3),
        makeASTNumber(4),
        makeASTList(
          List.of<ASTNode>(
            makeASTSymbol("*"),
            makeASTNumber(3),
            makeASTNumber(4)
          )
        ),
        makeASTList(
          List.of<ASTNode>(
            makeASTSymbol("*"),
            makeASTNumber(3),
            makeASTNumber(4)
          )
        ),
        makeASTList(
          List.of<ASTNode>(
            makeASTSymbol("*"),
            makeASTNumber(3),
            makeASTNumber(4)
          )
        ),
        makeASTList(
          List.of<ASTNode>(
            makeASTSymbol("*"),
            makeASTNumber(3),
            makeASTNumber(4)
          )
        ),
        makeASTList(
          List.of<ASTNode>(
            makeASTSymbol("*"),
            makeASTNumber(3),
            makeASTNumber(4)
          )
        )
      )
    ),
    makeASTList(
      List.of<ASTNode>(makeASTSymbol("*"), makeASTNumber(3), makeASTNumber(4))
    )
  )
);

export const expression3 = makeASTHashMap(
  Map([
    [makeASTKeyword("hello"), makeASTString("world")],
    [
      makeASTKeyword("this is"),
      makeASTList(List.of(makeASTString("a"), makeASTString("list"))),
    ],
  ] as Array<[ASTNode, ASTNode]>)
);
