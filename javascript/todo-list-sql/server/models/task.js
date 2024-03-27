export default (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    solved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn("now"),
    },
  });

  return Task;
};
