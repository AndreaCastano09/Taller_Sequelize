//creamos una carpeta en src llamada models y dentro todoModels
const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize");

const Todo = sequelize.define(
"todos",
{
    //Model attributes are defined here
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },

    title: {
    type: DataTypes.STRING,
    allowNull: true,
    },

    completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    },
},

{
    timestamps: false,
}
);

Todo.sync({ alter: true });

module.exports = Todo;
