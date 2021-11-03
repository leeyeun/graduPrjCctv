const path = require('path');
const model = require('./model');

const salt  = require(path.join(__dirname, 'config', 'db.json')).salt
const hashing = require(path.join(__dirname, 'config', 'hashing.js'));

const user_ip = require("ip");

const multer = require('multer');

module.exports = {
    needs: () => upload,
    api : {
        login : (req, res) => {
            const body = req.body;
            const hash = hashing.enc(body.id, body.password, salt)

            model.api.login(body, hash, result => {
                var obj = {};
                if(result[0]) {
                    obj['suc'] = result[0].dataValues;
                    obj['msg'] = '로그인 성공';
                    obj['ip'] = user_ip.address();

                } else {
                    obj['suc'] = false;
                    obj['msg'] = '로그인 실패';
                }
              
                res.send(obj);
            })
            
          },
    },
    add : {
        //회원가입
        user : (req, res) => {
            const body = req.body;
            console.log(body);
    
            const hash_pw = hashing.enc(body.id, body.password, salt);
            
            model.add.user(body, hash_pw, result => {
                res.send(result);
            })
        },

        store : (req, res) => {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'upload/')//저장 위치
                },
                filename: function (req, file, cb) {
                    cb(null, file.originalname)//저장될 이름
                }
            })
            const upload = multer({ storage: storage });
            
            const body = req.body;
            console.log(req.body);

            model.add.store(body, result => {
                if(result){
                    res.send(true);
                }
            })
        }
    },
    
    get : {
        store : (req, res) => {
            const body = req.body;

            model.get.store(body, result => {
                if(result){
                    res.send(result);
                }
            })
        },
        store_cnt : (req, res) => {
            const body = req.body;

            model.get.store_cnt(body, cnt => {
                const result = { cnt : cnt }
                res.send(result);
            })
        },

        store_data : (req, res) => {
            const body = req.body;

            model.get.store_data(body, data => {
                res.send(data);
            }) 
        }
    },
    delete : {
        store : (req, res) => {
            const body = req.body;

            model.delete.store(body, () => {
                res.send(true)
            })
        }
    },
    update : {
        store : (req, res) => {
            const body = req.body;

            model.update.store(body, data => {
                res.send(true)
            })
        },
        view_cnt : (req, res) => {
            const body = req.body;

            model.update.view_cnt(body, result => {
                if(result) {
                    res.send(true);
                }
            })
        }
    },
    // upload : {
    //     image : (req, res) => {
    //         const body = req.body;
    //         const image = req.file.path;

    //         model.upload.store(body, image, data => {
    //             res.send(true)
    //         })
    //     }
        
    // }
}