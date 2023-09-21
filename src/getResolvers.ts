import { NonEmptyArray } from "type-graphql";
import DiretorResolver from "./resolvers/diretor/DiretorResolver";


export const getResolvers = (): NonEmptyArray<Function> | NonEmptyArray<string> => {
  return [
    DiretorResolver
  ];
}