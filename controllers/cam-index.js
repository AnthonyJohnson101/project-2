const router = require('express').Router();
const multer = require ('multer');
const app = express();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

// configuration

const storage = multer.diskStorage({
    destination: function(require, file, cb) {
        cb(null, 'uploads/');
    },
});

const upload = multer({ storage: storage });

//route for file upload

app.post('/upload', upload.single('file'), function(req, res) {
    res.send("Upload Successful");
});

//start server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});