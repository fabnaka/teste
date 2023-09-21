import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, BelongsTo } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("Diretor")
@Table({
    modelName: "Diretor",
    tableName: "diretor",
    updatedAt: false,
    createdAt: false,
})
export default class Diretor extends Model {
    
    @Field((Type) => Int)
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id?: number;

    @Field((Type) => String, { nullable: true })
    @Column({
      type: DataType.STRING(255),
    })
    nome?: string;

    @Field((Type) => String, { nullable: true })
    @Column({
      type: DataType.STRING(20),
    })
    cpf?: string;
}