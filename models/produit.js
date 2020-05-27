'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  Produit.associate = function(models) {
    Produit.hasMany(models.Commentaire, {
      onDelete: "cascade"
    });
    Produit.hasMany(models.Note, {
      onDelete: "cascade"
    });
    Produit.hasMany(models.Panier, {
      onDelete: "cascade"
    });
  };
  return Produit;
};