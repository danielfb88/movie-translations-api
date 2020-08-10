import { MigrationInterface, QueryRunner } from "typeorm";

export class TranslationTable1597025752475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "translations" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), 
                "movie_id" uuid NOT NULL REFERENCES movies(id),
                "iso_3166_1" TEXT NOT NULL,
                "iso_639_1" TEXT NOT NULL,
                "name" TEXT NOT NULL,
                "english_name" TEXT NOT NULL,
                "title" TEXT,
                "overview" TEXT,
                "homepage" TEXT
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "translations"`, undefined);
    }

}
