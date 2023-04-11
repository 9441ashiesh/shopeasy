const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


//middel ware 
app.use(bodyparser.json());
app.use(morgan('tiny'));



const Productschema = mongoose.Schema({
    name : String,
    image : String,
    count: Number
}) 

const Product = mongoose.model('Product',Productschema);


require('dotenv/config');

const api = process.env.url1;
const connections = process.env.connections;

app.post(`${api}/Products`,(req,res)=>{
    const product={
        id:1,
        name:"babu",
        image:"some_url"
    }
    res.send(product);
})


app.post(`${api}/Products`,(req,res)=>{
    const product = new Product({
        name : req.body.name,
        image : req.body.image,
        count : req.body.count
    })

    product.Save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})


// app.post(`${api}/products`,(req,res)=>{
//      const newproduct = req.body;
//      console.log(newproduct)
//     res.send(newproduct);
// })



mongoose.connect(connections,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName: 'data'
})
.then(()=>{
    console.log("hey!,your database connection is ready...... ")
}).catch((err)=>{
    console.log(err)
})



// setTimeout(()=>{
//     console.log("how much time i want to wait bro ");
//   },7000);})








app.listen(3000, ()=>{
    console.log("server is in prot 3000")
})