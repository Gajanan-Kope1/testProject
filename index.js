const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({host:"nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com",database:"conqtvms_dev",user:"candidate",password:"NoTeDeSt^C10.6?SxwY882}"});
connection.connect((err)=>{
    if(err)
        console.log(err.message)
    console.log("connected");
})
app.get("/products",async (req,res)=>{
    try{
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let orderBy = req.query.orderBy || 'createdAt';
        let orderDir = req.query.orderDir || 'DESC';
        let searchFields = req.query.searchFields ? req.query.searchFields.split(",") : []
        let searchVal = req.query.searchVal || "";
        connection.query(`select * from Products ORDER BY (${orderBy}) ${orderDir} OFFSET ${page} ROWS FETCH NEXT ${limit} ROWS ONLY`,(err,result,fields)=>{
            if(err){
                throw new Error(err.message);
            }
            return res.status(200).send({status:200,msg:"success",currentPage:page,pageSize:limit,data:result});
        })
    }catch(err){
        res.status(400).send({status:400,message:err.mesage,data:null});
    }
})

app.listen(3000,()=>console.log("server listening"))