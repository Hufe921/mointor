'use strict';
module.exports = (sequelize, DataTypes) => {
  var ErrorEntity = sequelize.define('ErrorEntity', {
    msg: DataTypes.STRING,
    url: DataTypes.STRING,
    line: DataTypes.STRING,
    col: DataTypes.STRING,
    nowTime: DataTypes.DATE
  }, {});
  ErrorEntity.associate = function(models) {
    // associations can be defined here
  };
  return ErrorEntity;
};