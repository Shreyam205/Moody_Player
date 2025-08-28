const express = require('express')
const multer = require('multer')
const router = express.Router()

const upload = multer({storage:multer.memoryStorage()})

// {
//     title: text,
//     artist: text,
//     audio: file
// }


router.post('/songs', upload.single("audio"),(req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.status(201).json({
        message: 'Song created successfully',
        song: req.body
    })
})




module.exports = router