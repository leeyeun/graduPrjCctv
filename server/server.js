const express = require('express');
const app = express();
const router = require('./route');

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();
//sequelize.sync({ force: true }); 초기화

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
// const {
//     Teacher,
//     Sequelize: { Op }
// } = require('./models');
// sequelize.query('SET NAMES utf8');


//조회
app.get('/get/data', (req, res) => {
    Teacher.findAll()
    .then( result => { res.send(result) })
    .catch( err => { throw err })
}) 
//추가
app.post('/add/data', (req, res) => {
    console.log(req.body)

      Teacher.create({
          name : req.body.data
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
}) 
//수정
app.post('/modify/data', (req, res) => {
    Teacher.update({ name : req.body.modify.name }, {
        where : { id : req.body.modify.id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})
//삭제
app.post('/delete/data', (req, res) => {
    Teacher.destroy({
        where : { id : req.body.delete.id }
    })
    .then( res.sendStatus(200) )
    .catch( err => { throw err })
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`)
});