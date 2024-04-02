const express       = require('express');
const exphbs        = require('express-handlebars');
const app           = express();
const path          = require('path');
const db            = require('./db/connection');
const bodyParser    = require('body-parser');
const Job           = require('./models/Job');
const Sequelize     = require('sequelize');
const { serialize } = require('v8');
const Op            = Sequelize.Op;
const PORT = 3000;

app.listen(PORT,function(){
    console.log(`O Express está rodando na porta ${PORT}`)
});
//body parser

app.use(bodyParser.urlencoded({extended: false }));

//handle bars//

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine' , 'handlebars');
//static folder//

app.use(express.static(path.join(__dirname,'public')))

//db connection

db
.authenticate()
.then(()=>
{
    console.log("Conectou com sucesso")
    
})
.catch(err=>{
    console.log("Ocorreu um erro ao conectar",err)
});

//rotas
app.get('/',(req,res)=>{

    let search = req.query.job;
    let querry = '%'+search+'%'; // busca semelhantes
    if(!search){
    Job.findAll({order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs=>{

        res.render('index',{
            jobs
        });
    })
    .catch(err => console.log(err));
}else{
    Job.findAll({
        where: {title: {[Op.like]: querry}},
        order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            console.log(search);
            console.log(search);

            res.render('index',{
                jobs,search
            });
        })
        .catch(err => console.log(err));
}

});
// jobs routs

app.use('/jobs',require('./routes/jobs'))