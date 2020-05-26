'use strict';
module.exports = (sequelize, DataTypes) => {
  const Panier = sequelize.define('Panier', {});
  Panier.associate = function(models) {
    Panier.belongsTo(models.Produit,{
      foreignKey:{
        allowNull: false
      }
    });
    Panier.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Panier;
};