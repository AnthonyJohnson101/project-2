const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {
  get numUpvotes() {
    let upvotes = this.upvotes.split(",");
    return upvotes;
  };

  get numDownvotes() {
    let downvotes = this.downvotes.split(",");
    return downvotes;
  };
};

Recipe.init(
  {
    recipeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipename: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    recipehoto: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
    },
    preptime: {
      type: DataTypes.STRING,
    },
    cooktime: {
      type: DataTypes.STRING,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    submitteduser: {
      type: DataTypes.STRING,
    },
    timesubmitstamp: {
      type: DataTypes.STRING,
    },
    upvotes: {
      type: DataTypes.TEXT,
    },
    downvotes: {
      type: DataTypes.TEXT,
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
    nuts: {
      type: DataTypes.BOOLEAN,
    },
    dairy: {
      type: DataTypes.BOOLEAN,
    },
    seafood: {
      type: DataTypes.BOOLEAN,
    },
    alcohol: {
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'recipes',
  }
  );

module.exports = Recipe;