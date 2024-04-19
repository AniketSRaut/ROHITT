const express = require('express') 


const router = express.Router();

const db = require('../db')
const utils = require('../utils')

router.get('/getAllActive',(req,res)=>{

    const statement = `select * from product where isDelete = 0;`

    db.pool.query(statement,(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(result))
        }
    })
})


router.get('/getAll',(req,res)=>{

    const statement = `select * from product;`

    db.pool.query(statement,(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(result))
        }
    })
})



router.get('/getById/:id',(req,res)=>{
    const {id}= req.params
    const statement = `select * from product where id =?;`

    db.pool.query(statement,[id],(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(result))
        }
    })
})

router.post('/addProduct',(req,res)=>{
    // const {id}= req.params

    const{proName , proPrice}= req.body
    const statement = `insert into product (proName , proPrice) values (?,?);`

    db.pool.execute(statement,[proName , proPrice],(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(" Product Added Successfully ... "))
        }
    })
})


router.put('/update/:id',(req,res)=>{
    const {id}= req.params

    const{proName , proPrice}= req.body
    const statement = `update product set proName= ?, proPrice = ? where id = ?;`

    db.pool.execute(statement,[proName , proPrice ,id],(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(" Updated Successfully ... "))
        }
    })
})



router.delete('/delete/:id',(req,res)=>{
    const {id}= req.params

    const{proName , proPrice}= req.body
    const statement = `update product set isDelete = 1 where id = ?;`

    db.pool.execute(statement,[id],(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(" Deleted Successfully ... "))
        }
    })
})

module.exports = router