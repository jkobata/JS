const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const path = require('path');

const app = express();

const redisClient = redis.createClient();
const server = require('http').createServer(app);


const getCache = (key) =>
{
    return new Promise((resolve, reject)=>{
        redisClient.get(key,(err,value) => {
            if(err)
            {
                reject(err)
            }
            else{
                resolve(value)
            }
        })

    })
}
const setCache = (key,value) =>
{
    new Promise((resolve,reject)=>{
        redisClient.set(key,value,'EX',10,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(true)
            }
        } )
    })
}


app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res) => {
res.render('index.html')

});


app.get('/get/:id', async(req, res) =>{
    const id = req.params.id
    const value = await getCache('get'+ id)
    if(value)
    {
        res.send(JSON.stringify(value))
    }
    else{
        const idvalue = req.params.id
        res.send('deu errado')
        setCache('get'+id, idvalue)
    }

});