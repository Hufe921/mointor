'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActionEntity = sequelize.define('ActionEntity', {
    whiteScreenTime: DataTypes.STRING,
    readyTime: DataTypes.STRING,
    allLoadTime: DataTypes.STRING,
    mobile: DataTypes.STRING,
    nowTime: DataTypes.DATE,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  ActionEntity.associate = function (models) {
    // associations can be defined here
  };
  return ActionEntity;
};