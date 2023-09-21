import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { DiretorDataTable, DiretorInput, DiretorListInput } from "../../interfaces/DiretorDef";
import Diretor from "../../models/Diretor";
import { ContextInterface } from "../../types";

/* import { PERM } from "../../perm.enum"; */ //IMPLEMENTAR PERMISSÕES
/* import { buildPerm, CheckPerm } from "../../utils/checkPerm"; */

import { DiretorService } from "./DiretorService";

@Service()
@Resolver(of => Diretor)
export default class DiretorResolver {

  constructor(
    private diretorService: DiretorService
  ) { }

  /* @Authorized() */
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Query(() => DiretorDataTable, { nullable: true })
  async filtrarDiretor(
    @Arg('filter') filter: DiretorListInput,
    @Ctx() ctx: ContextInterface
  ) {
    return await this.diretorService.filtrar(filter, ctx.usuario);
  }

  /* @Authorized() */
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Query(() => Diretor, { nullable: true })
  async buscarDiretorPorId(
    @Arg('id', Type => Int) id: number
  ) {
    return await this.diretorService.porId(id);
  }

  /* @Authorized() */
  /* @UseMiddleware(CheckPerm([...buildPerm({
    isInsert: PERM.Empresa.Cadastrar,
    isUpdate: PERM.Empresa.Editar,
    isDelete: PERM.Empresa.Excluir
  })])) */
  @Mutation(() => Diretor, { nullable: true })
  async criarAlterarDiretor(
    @Arg('data') data: DiretorInput
  ) {
    console.log(data)
    console.log(this.diretorService)

    try {
      let diretor = await Diretor.findByPk<Diretor>(data.id);

      if (diretor) {
        diretor.setAttributes({ ...data });
      } else {
        diretor = Diretor.build({ ...data });
      }
      await diretor.save();

      return diretor;
    } catch (error) {
      throw error;
    }



    return await this.diretorService.criarAlterar(data);
  }

  /* @Authorized() */
  @Query(() => [Diretor], { nullable: true })
  async listarDiretor(
    @Ctx() ctx: ContextInterface
  ) {
    return await this.diretorService.listar();
  }

}