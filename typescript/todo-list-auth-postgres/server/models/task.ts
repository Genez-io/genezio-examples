import { Model } from "sequelize";

export class TaskModel extends Model {
  taskId!: number;
  title!: string;
  solved!: boolean;
  ownerId!: string;
  date!: Date;
}
