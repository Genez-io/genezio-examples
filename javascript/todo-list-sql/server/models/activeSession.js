export default (sequelize, DataTypes) => {
  const activeSession = sequelize.define("ActiveSession", {
    token: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
     defaultValue: sequelize.fn("now"),
    },
  });

  return activeSession;
};
