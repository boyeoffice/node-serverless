const express = require('express')
const router = express.Router()
const axios = require('axios')
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const Image = require('../model/file');

/*const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}
*/

const upload = multer({
    /*storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter*/
});

const uploadImage = (payload) => {
    console.log(payload)
    return new Promise((resolve, reject) => {
        axios.post('http://boyeoffice.test/api/v2/file_upload', payload).then(response => {
            
            resolve(response)
        }).catch(error => {
            reject(error)
            
        })
    })
}

router.post('/upload', upload.single('image'), function(req, res, next) {
    var formData = new FormData()
    formData.append('image', req.file)
    uploadImage(formData).then(response => {
        res.json('it works')
    }).catch(error => {
        console.log(error.response.data)
        res.status(422).json(error.response.data)
    })
})


module.exports = router