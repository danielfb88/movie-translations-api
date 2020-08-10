import { EntityRepository, Repository } from "typeorm";
import { Translaction } from "../models";

@EntityRepository(Translaction)
export class TranslactionRepository extends Repository<Translaction> {}
