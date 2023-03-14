const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_name: {
      type: DataTypes.STRING,
    },
    recipe_category: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
    },
    prep_time: {
      type: DataTypes.STRING,
    },
    cook_time: {
      type: DataTypes.STRING,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    submitted_user: {
      type: DataTypes.STRING,
    },
    submitted_timestamp: {
      type: DataTypes.STRING,
    },
    upvotes: {
      type: DataTypes.INTEGER,
    },
    downvotes: {
      type: DataTypes.INTEGER,
    },
    vegan: {
      type: DataTypes.BOOLEAN,
    },
    glutenfree: {
      type: DataTypes.BOOLEAN,
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
    },
    pescatarian: {
      type: DataTypes.BOOLEAN,
    },
    spicy: {
      type: DataTypes.INTEGER,
    },
    lowcarb: {
      type: DataTypes.BOOLEAN,
    },
    containsnuts: {
      type: DataTypes.BOOLEAN,
    },
    containsdairy: {
      type: DataTypes.BOOLEAN,
    },
    containsseafood: {
      type: DataTypes.BOOLEAN,
    },
    containsalcohol: {
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: 'recipe',
  }
  );

module.exports = Recipe;