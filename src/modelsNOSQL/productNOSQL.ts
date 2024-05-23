import dynamodb from "../services/dynamoService";
import joi from 'joi';
import { PREFIX_NAME } from '../config';
 
const ProductModel = dynamodb.define('product', {
    hashKey: 'HashKeyID', // Assuming 'HashKeyID' is the hash key
    timestamps: false,
    schema: {
        HashKeyID: dynamodb.types.uuid(), // Assuming 'HashKeyID' is of type UUID
        ProductName: joi.string(),
        Price: joi.number(),
        Category: joi.string()
    },
    tableName: `Products${PREFIX_NAME}`
});
 
/* dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log('Tabla creada exitosamente')
}) */
 
export default ProductModel;