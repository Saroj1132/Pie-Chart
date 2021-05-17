const express=require('express')
const app=express()
const db=require('./config/db')
const mongoose=require('mongoose')
const user=require('./model/user')
const path=require('path')

mongoose.connect(db.url, (err, res)=>{
    console.log('Connection succesfully')
})
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.render("users")    
})

app.post('/', (req, res)=>{
    const {Name, Email}=req.body
    
    const tbluser=new user({
        Name:Name,
        Email:Email,
        CreateDate:Date.now()
    })
    tbluser.save()
    .then(user=>{
        res.redirect('/')
    })
})

app.get('/listuser', (req, res)=>{
    user.find()
    .exec()
    .then(doc=>{
        res.render("Listuser", {records:doc})
    })
})


app.get('/deleteuser', (req, res)=>{
    deleteuser.find()
    .exec()
    .then(doc=>{
        res.render("deleteduser", {records:doc})
    })
})

app.get('/charm', (req, res)=>{
    const aggregateOpts=[
        {$group:{_id:{$month:"$CreateDate"}, noofuser:{$sum:1}}},
        {$project:{
            _id:1,
            noofuser:1
        }}
    ]
    user.aggregate(aggregateOpts).sort({_id:-1}).limit(5).then(months=>{
        console.log(months)
        var user=[]
        var month=[]
        for(var i in months){
            user.push(months[i].noofuser)
          if(months[i]._id==1){
            month.push("Januaray")
          }else if(months[i]._id==2){
            month.push('February')
          }else if(months[i]._id==3){
            month.push('March')
          }else if(months[i]._id==4){
            month.push('April')
          }else if(months[i]._id==5){
            month.push('May')
          }else if(months[i]._id==6){
            month.push('June')
          }else if(months[i]._id==7){
            month.push('July')
          }else if(months[i]._id==8){
            month.push('August')
          }else if(months[i]._id==9){
            month.push('September')
          }else if(months[i]._id==10){
            month.push('Octember')
          }else if(months[i]._id==11){
            month.push('November')
          }else if(months[i]._id==12){
            month.push('December')
          }
          
         
          // console.log('sdf',a)
          // month.push(a)
        }
        var list = month.map(s => "" + s )
        console.log(list)
        console.log(user)
      
        res.render("piecharmdata", {
            noofmonth:list, 
            noofuser:user
        })
    })
    
})

app.listen(3000)