// VideogameModel.ts

import {Model, Sequelize} from 'sequelize';

interface VideogameAttributes {
  id: number;
  title: string;
  price: number;
  genre: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Videogame
    extends Model<VideogameAttributes>
    implements VideogameAttributes
  {
    public id!: number;
    public title!: string;
    public price!: number;
    public genre!: string;

    static associate(models: any) {
      // Define associations here if any
    }
  }

  Videogame.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Videogame",
    }
  );

  return Videogame;
};
