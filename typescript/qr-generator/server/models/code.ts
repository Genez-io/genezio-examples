import { Model } from "sequelize";

export class CodeModel extends Model {
  codeId!: number;
  title!: string;
  ownerId!: string;
  codeText!: string;
  date!: Date;
}
