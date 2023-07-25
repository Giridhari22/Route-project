// why we need to sync the database?
// = jo sari tables ban gayi hai usko database m rakhne k liye

const productModel = require("../Models/productModel");


const sync=async()=>{
   await productModel.sync();
}


module.exports.SyncModels=sync
