import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePersonTables1766815407133 implements MigrationInterface {
    name = 'CreatePersonTables1766815407133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`individual_person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`birth_date\` date NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_7af205ff163ccd189e97e3358d\` (\`cpf\`), UNIQUE INDEX \`REL_13f12738c4c7a51f6c39c638ff\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fantasy_name\` varchar(100) NOT NULL, \`cnpj\` varchar(18) NOT NULL, \`company_name\` varchar(100) NULL, \`job_title\` varchar(100) NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_0faa7013667f98f17741294e0c\` (\`cnpj\`), UNIQUE INDEX \`REL_13b11f9a748ebf842c091f3166\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`individual_person\` ADD CONSTRAINT \`FK_13f12738c4c7a51f6c39c638ff4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business_person\` ADD CONSTRAINT \`FK_13b11f9a748ebf842c091f3166f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_person\` DROP FOREIGN KEY \`FK_13b11f9a748ebf842c091f3166f\``);
        await queryRunner.query(`ALTER TABLE \`individual_person\` DROP FOREIGN KEY \`FK_13f12738c4c7a51f6c39c638ff4\``);
        await queryRunner.query(`DROP INDEX \`REL_13b11f9a748ebf842c091f3166\` ON \`business_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_0faa7013667f98f17741294e0c\` ON \`business_person\``);
        await queryRunner.query(`DROP TABLE \`business_person\``);
        await queryRunner.query(`DROP INDEX \`REL_13f12738c4c7a51f6c39c638ff\` ON \`individual_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_7af205ff163ccd189e97e3358d\` ON \`individual_person\``);
        await queryRunner.query(`DROP TABLE \`individual_person\``);
    }

}
