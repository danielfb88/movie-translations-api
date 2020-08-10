import { EntityRepository, Repository } from "typeorm";
import { Translation } from "../models";

@EntityRepository(Translation)
export class TranslationRepository extends Repository<Translation> {}
