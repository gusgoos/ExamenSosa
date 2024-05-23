// index.ts

'use strict';

import fs from 'fs';
import path from 'path';
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
const db: any = {};

let sequelize: any;

if (env === 'development')
    sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
        dialect: 'mysql',
        host: config.development.host,
        define: {
            // Avoid adding createdAt and updatedAt columns
            timestamps: false,
            // Avoid pluralizing table names
            freezeTableName: true
        }
    });

// Load database models
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach(file => {
        console.log(file);
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        console.log(model.name);
        db[model.name] = model;
    });

// Generate relationships between tables
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
