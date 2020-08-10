import { MigrationInterface, QueryRunner } from "typeorm";

export class MoviesTable1597024258125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), 
                "api_movie_id" INT NOT NULL,
                "original_title" TEXT NOT NULL
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "movies"`, undefined);
    }

}
