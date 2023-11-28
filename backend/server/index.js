const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs').promises 
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const multer = require('multer')
const http = require('http');
// const socketIO = require('socket.io');
const server = http.createServer(app);
// const io = socketIO(server);
const socketIo = require('socket.io')
// const { spawn } = require('child_process');
// const { readdirSync } = require("fs");
require('dotenv').config()

// const corsOptions = {
//     // origin: 'http://10.107.209.24:3000', // test
//     origin: 'http://localhost:3000',
//     credentials: true,
//   }

const io = socketIo(server,{ 
  cors: {
    origin: '*'
  }
})


// let pythonClient = null;
io.on('connection', (socket) => {
  console.log('A client connected');
  socket.join('menu-room')

    socket.on('message', (data) => {
      console.log('Received message:', data);
      io.to('menu-room').emit('Menu', data)
    });
  
    socket.on('success', (data) => {
      console.log('Received message:', data);
      io.to('menu-room').emit('Succ', data)
    });
    
  

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});




  server.listen(3002, err=> {
    if(err) console.log(err)
    console.log('Server running on Port' , 3002)
  })



app.use(cors(io))
app.set('_port', process.env.PORT)
app.use(express.json())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
     res.setHeader('Access-Control-Allow-Credentials', true);
   next();
   });
 
app.use(express.static('./public'))
app.use(express.static('../public_html'))
app.use(express.static('../ImgPerson'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
// readdirSync('./routes').map((r) => app.use("/api", require(`./routes/${r}`)));
const db = require('./config/database')

const storageSignature = multer.diskStorage({
  destination: path.join(__dirname, '../src/ImgPerson/', 'uploads'),
  filename: function (req, file, cb) {
    const numberPhone = req.body.numberPhone
    cb(null, numberPhone + path.extname(file.originalname))
  },
})

const uploadSignature = multer({
  storage: storageSignature,
})

app.post(process.env.API_PATH + 'RegisUser', uploadSignature.single('file'),(req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const userName = req.body.userName
  const passWord = req.body.passWord
  const nameAccount = req.body.nameAccount
  const birthDay = req.body.birthDay
  const numberPhone = req.body.numberPhone
  const status_Person = req.body.status_Person
  const image_Person = req.file.filename
  const ID_Person = "USER" + "-" + numberPhone

  db.query(
    'INSERT INTO person (ID_Person,FName_Person,LName_Person,Username_Person,Password_Person,NameAccount_Person,Birthday_Person,Phone_Person,Status_Person,Image_Person) VALUES(?,?,?,?,?,?,?,?,?,?)',
    [ID_Person,firstName,lastName,userName,passWord,nameAccount,birthDay,numberPhone,status_Person,image_Person],
    (err, result) => {
      if (err) {
        console.log("RegisUser>>>>>> : ",err)
        return res.status(500).json({msg: 'Path RegisUser Server error'})  
      }
      else{
        return res.status(200).json({msg: 'Insert Ok'})  
      }
    },
    )
})

app.get(process.env.API_PATH + 'MannageUser',(req, res) => {
  db.query('SET @i := 0', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Query executed successfully:', result);
  });
  db.query(`SELECT  @i:=@i+1 AS id,  ID_Person , FName_Person , LName_Person , Username_Person , Password_Person , NameAccount_Person ,CONCAT( DATE_FORMAT( NOW( ) , '%Y' ) +543, '-', DATE_FORMAT( NOW( ) , '%m' ) , '-', DATE_FORMAT( NOW( ) , '%d' ) ) AS Birthday_Person , Phone_Person , Status_Person , Image_Person,alcohol FROM person`,(err, result) => {
    if (err) {
      console.log("MannageUser>>>>>> : ",err)
      return res.status(500).json({msg: 'Path MannageUser Server error'})  
    }
    else{
       res.send(result)  
    }
  })

})




const storageEditImg = multer.diskStorage({
  destination: path.join(__dirname, '../src/ImgPerson/', 'uploads'),
  filename: function (req, file, cb) {
    const numberPhone = req.body.numberPhone
    cb(null, numberPhone + path.extname(file.originalname))
  },
})

const uploadImg = multer({
  storage: storageEditImg,
})


app.put(process.env.API_PATH + 'EditUser/:id', uploadImg.single('file'),(req, res) => {
  const id = req.params.id
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const userName = req.body.userName
  const passWord = req.body.passWord
  const nameAccount = req.body.nameAccount
  const birthDay = req.body.birthDay
  const numberPhone = req.body.numberPhone
  const status_Person = req.body.status_Person
  const image_Person = req.file === undefined ? req.body.filename : req.file.filename
  const ID_Person = "USER" + "-" + numberPhone
  // console.log(image_Person)
  // console.log(lastName)
  // console.log(nameAccount)
  // console.log(image_Person)
  // console.log(id)
  if (typeof req.file !== 'undefined') {
    var image_Persons = req.file.filename
    const m_path = __dirname.substring(0, __dirname.search('server'))
    const path = m_path + 'ImgPerson' + '\\' + 'uploads' + '\\' + req.body.file
     fs.unlink(path, (err) => {
      if (err) {
        console.log(`${image_Persons} cannot be deleted >>> err : ${err}`)
      } else {
        console.log(`${image_Persons} is successfully deleted`)
      }
    })
  }
  db.query(
    "UPDATE person SET FName_Person = ?, LName_Person = ?, Username_Person = ? ,NameAccount_Person = ? , Birthday_Person = ?,Phone_Person = ? ,Image_Person = ? WHERE ID_Person = ? ",
    [firstName,lastName,userName,nameAccount,birthDay,numberPhone,image_Person,id],
    (err, result) => {
      if (err) {
        console.log("EditUser>>>>>> : ",err)
        return res.status(500).json({msg: 'Path EditUser Server error'})  
      }
      else{
        return res.status(200).json({msg: 'Update Ok'})  
      }
    },
    )
})


app.delete(process.env.API_PATH + 'DeleteUser/:id/:namePic',(req, res) => {
 const idUser = req.params.id
 const namePic = req.params.namePic
//  console.log(namePic)
 db.query(`DELETE FROM person WHERE ID_Person = ? `,[idUser],(err, result) => {
  if (err) {
    console.log("DeleteUser>>>>>> : ",err)
    return res.status(500).json({msg: 'Path DeleteUser Server error'})  
  }
  else{
    res.status(200).json({msg: 'Delete Ok'}) 
  }
  fs.unlink('../src/ImgPerson/uploads/' + namePic, (err) => {
    if (err) {
        throw err;
    }

    console.log("Delete File successfully.");
});
  
})


})






app.put(process.env.API_PATH + 'UpdateStatus/:status/:id',(req, res) => {
  const id = req.params.id
  const status = req.params.status

  db.query(
    "UPDATE person SET Status_Person = ? WHERE ID_Person = ? ",
    [status,id],
    (err, result) => {
      if (err) {
        console.log("UpdateStatus>>>>>> : ",err)
        return res.status(500).json({msg: 'Path UpdateStatus Server error'})  
      }
      else{
        return res.status(200).json({msg: 'Update Ok'})  
      }
    },
    )
})


app.get(process.env.API_PATH + 'GetAllData',(req, res) => {
  db.query(
    "SELECT * FROM person",
    (err, result) => {
      if (err) {
        console.log("GetAllData>>>>>> : ",err)
        return res.status(500).json({msg: 'Path GetAllData Server error'})  
      }
      else{
        res.send(result)   
      }
    },
    )
})

app.post(process.env.API_PATH + 'Login', (req, res)=>{
  const userName = req.body.userName;
  // const password = req.body.password;

  db.query("SELECT * FROM person where Username_Person = ?",
  [userName],
  (err,result)=>{
      if(err){
         res.send({err:err});
      }else{
        res.send(result)
      }
  }
  
  )
})



app.post(process.env.API_PATH +'qrscans', (req, res) => {
  const data  = req.body.qrData;
  const date = new Date();
  const userid = req.body.userid;
  // console.log("data11111",data)
  const ID_Beverage = data === 'green margaritaLogin' ? 'Bev005' : 
  data === 'Yellow HawaiiLogin' ? 'Bev001' : 
  data === 'KamikazeLogin' ? 'Bev002' : 
  data === 'Red LadyLogin' ? 'Bev003' : 
  data === 'wiskey' ? 'Bev004' : 
  // data === 'แดงมะนาวโซดา' ? 'Bev006' :
  // data === 'เขียวมะนาวโซดา' ? 'Bev007' :
  // data === 'สับปะรดมะนาวโซดา' ? 'Bev008' :
  // data === 'แดงโซดา' ? 'Bev009' :
  // data === 'เขียว โซดา' ? 'Bev010' :
  '';
  // io.emit('data', data);
if(ID_Beverage !== '' && userid !== '' && date !== '' && data !== ''){
  // res.send(data);
  // console.log("data11111",data)
  io.emit('data', data);
  db.query(
    'INSERT INTO ordering (ID_Person,ID_Beverage,OrderDate_Order) VALUES(?,?,?)',
    [userid,ID_Beverage,date],
    (err, result) => {
      if (err) {
        console.log("RegisUser>>>>>> : ",err)
        return res.status(500).json({msg: 'Path RegisUser Server error'})  
      }
      else{
        return res.status(200).json({msg: 'Insert Ok'})  
      }
    },
    )
}


});


app.get(process.env.API_PATH + 'GetSumAlcohol/:ID_Person' , (req,res) =>{
  
  const ID_Person = req.params.ID_Person;
  const date = new Date();
  const jsonString = JSON.stringify(date);
  const parts = jsonString.split('T');
const extractedDate = parts[0];

const modifiedString = extractedDate.replace(/"/g, '');
// console.log("data",modifiedString)

  db.query(
   `SELECT * FROM ordering INNER JOIN beverage ON ordering.ID_Beverage = beverage.ID_Beverage where ordering.ID_Person = ? AND DATE(ordering.OrderDate_Order) = ?`,[ID_Person,modifiedString]  ,
    (err, result) => {
      if (err) {
        console.log("GetAllData>>>>>> : ",err)
        return res.status(500).json({msg: 'Path GetAllData Server error'})  
      }
      else{
        res.send(result)   
      }
    },
    )

})


app.get(process.env.API_PATH + 'GetBottleVolume' , (req,res) =>{
  
  

  db.query(
   `SELECT Id_Bottle AS id , Name_Bottle,Volume_Bottle FROM bottlevolume`  ,
    (err, result) => {
      if (err) {
        console.log("GetAllData>>>>>> : ",err)
        return res.status(500).json({msg: 'Path GetAllData Server error'})  
      }
      else{
        res.send(result)   
      }
    },
    )

})



app.put(process.env.API_PATH +'Addvolum', (req, res) => {
  const id = req.body.id;
  const Name_Bottle = req.body.Name_Bottle;
  const volumbottom = req.body.volumbottom;
  // console.log(id)
  // console.log(volumbottom)
  db.query(
        "UPDATE bottlevolume SET Volume_Bottle = ? WHERE Id_Bottle = ? ",
    [volumbottom,id],
        (err, result) => {
      if (err) {
        console.log("RegisUser>>>>>> : ",err)
        return res.status(500).json({msg: 'Path RegisUser Server error'})  
      }
      else{
        return res.status(200).json({msg: 'Insert Ok'})  
      }
    },
  )
  

});

app.post(process.env.API_PATH +'qrscan', (req, res) => {
  const data  = req.body.qrData;
  // const SOS  = req.body.SOS;
  // const Transcript  = req.body.Transcript;
  // Process the QR code data here and send a response
  const response = `Received QR code data: ${data}`;
  console.log("data11111",data)
  res.send(data);
  // res.send(SOS);
  // res.send(Transcript);
  // console.log(Transcript)
  // console.log(SOS)
  // io.emit('sos', SOS);
  io.emit('data', data);

});

app.listen(app.get('_port'), () =>
  console.log(`app listen on port ${app.get('_port')}`),
)