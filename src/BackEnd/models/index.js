import Sequelize from 'sequelize';
import messageModel from './message';
import userModel from './user';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    }
);

const models = {
    User: userModel(sequelize, Sequelize.DataTypes),
    Message: messageModel(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;
