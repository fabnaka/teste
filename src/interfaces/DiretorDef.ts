import { Field, InputType, Int, ObjectType } from 'type-graphql';
import Diretor from '../models/Diretor';
import { IPrimeDataTableRequest, PrimeDataTableRequest, PrimeDataTableResponse, PrimeFilterItemInt, PrimeFilterItemString, PrimeFilterItemStringArray } from '../utils/primeng/DataTableDef';

@InputType("DiretorFilterInput")
export class DiretorFilterInput {
  @Field(type => PrimeFilterItemInt, { nullable: true })
  id?: PrimeFilterItemInt;

  @Field(type => PrimeFilterItemString, { nullable: true })
  nome?: PrimeFilterItemString;

  @Field(type => PrimeFilterItemString, { nullable: true })
  cpf?: PrimeFilterItemString;
}

@InputType("DiretorListInput")
export class DiretorListInput extends PrimeDataTableRequest(DiretorFilterInput) implements IPrimeDataTableRequest<DiretorFilterInput> { }

@ObjectType("DiretorDataTable")
export class DiretorDataTable extends PrimeDataTableResponse(Diretor) { }

@InputType("DiretorInput")
export class DiretorInput {
  @Field((Type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  nome?: string;

  @Field((type) => String, { nullable: true })
  cpf?: string;
}