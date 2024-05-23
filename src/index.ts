import Server from './provider/Server';
import {PORT,NODE_ENV} from './config';
import express from 'express';
import VideogameController from'./controllers/VideogameController'
import ProductController from './controllers/ProductController';

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true})
    ],
    controllers:[
        VideogameController.instance,
        ProductController.instance
    ]
});

server.init();