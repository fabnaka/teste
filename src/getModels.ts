import { ModelCtor } from "sequelize-typescript";
import Diretor from "./models/Diretor";

export const getModels = (): ModelCtor[] => {
    return [
        Diretor
    ];
  }