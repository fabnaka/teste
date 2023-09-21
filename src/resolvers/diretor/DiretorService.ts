import { Transaction } from "sequelize/types";
import { Service } from "typedi";
import { sequelize } from "../..";
import { DiretorFilterInput, DiretorInput } from "../../interfaces/DiretorDef";
import Diretor from "../../models/Diretor";
import { SessionToken } from "../../types";
import CrudUtils from "../../utils/primeng/CrudUtils";
import { IPrimeDataTableRequest } from "../../utils/primeng/DataTableDef";


@Service()
export class DiretorService {

    async filtrar(input: IPrimeDataTableRequest<DiretorFilterInput>, usuario: SessionToken | undefined) {
        return await Diretor.findAndCountAll<Diretor>({
            limit: input.rows,
            offset: input.first,
            order: CrudUtils.getOrder(input),
            where: CrudUtils.processFilters(input.filters, {})
        });
    }

    async porId(id: number) {
        return await Diretor.findByPk(id);
    }

    async criarAlterar(data: DiretorInput) {
        let t: Transaction = await sequelize.transaction();
        try {

            let diretor = await Diretor.findByPk<Diretor>(data.id);

            if (diretor) {
                diretor.setAttributes({ ...data });
            } else {
                diretor = Diretor.build({ ...data });
            }
            await diretor.save({ transaction: t });

            await t.commit();
            return diretor;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async listar() {
        return await Diretor.findAll();
    }

}