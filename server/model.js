const sequelize = require('./models').sequelize;

const {
    User,
    Store,
    Like,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        //로그인
        login : (body, hash, callback) => {
            User.findAll({
                where : { [Op.and]: [{ id : body.id, password : hash }] }
            })
            .then(data => {
                callback(data)
                console.log('data');
            })
            .catch(err => {
                throw err;
            })
        },
    },
    add : {
        //회원가입
        user : (body, hash_pw, callback) => {
            User.count({
                where : { id : body.id }
            })
            .then(cnt => {
                if(cnt > 0) {
                    callback(false);
                }
                else {
                    User.create({
                        admin : 'N',
                        id : body.id,
                        password : hash_pw,
                        name : body.name,
                        email : body.email
                    })
                    .then( () => callback(true) );
                }
            })
        },
        //가게 등록
        store : (body, callback) => {
           
            Store.create({
                storeName : body.storeName,
                address : body.address,
                number : body.number,
                time : body.time,
                sit : body.sit,
                introduce : body.introduce,
                image : body.image,
                view_cnt : 0,
                likes : 0,
                curHead : 0,
                latitude : body.latitude,
                longitude : body.longitude

            }).then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    },

    get : {
        store : (body, callback) => {
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }

            Store.findAll({

                where : {
                    storeName : {
                        [Op.like] : search
                    }
                },

                limit : (body.page * body.limit),
                offset : (body.page - 1) * body.limit,
                order: sequelize.literal('storeid DESC')
            })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
            
        },
        store_sit : (callback)=>{
            Store.findAll()
            .then(data => {
                callback(data);
            })
            .catch(err => {
                throw err;
            })
        },
        store_cnt : (body, callback) => {
            let search = "%%";
            if(body.search){
                search = '%' + body.search + '%';
            }

            Store.count({
                where : {
                    storeName : {
                        [Op.like] : search
                    },
                    
                }
            })
            .then(result => {
                callback(result);
            })
        },

        store_data : (body, callback) =>{
            Store.findAll({
                where : { storeid : body.storeid }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },
        
        store_address :(body, callback) =>{
            Store.findAll()
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },
        
    },
    delete : {
        store : (body, callback) => {
            Store.destroy({
                where : { storeid : body.storeid}
            })
            .then( () => { callback(true) })
            .catch(err => { throw err; })
        }
    },
    update : {
        store : (body, callback) => {
            Store.update({
                storeName : body.storeName,
                address : body.address,
                number : body.number,
                time : body.time,
                sit : body.sit,
                introduce : body.introduce,
                image : body.image,
                latitude : body.latitude,
                longitude : body.longitude
            }, {
                where : { storeid : body.storeid }
            })
            .then( () => { callback(true) })
            .catch( err => { throw err; })
        },
        view_cnt : (body, callback) => {
            Store.update({view_cnt : sequelize.literal('view_cnt + 1')},{
                where : { storeid : body.storeid }
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        },
    }
}