const router = require('express').Router();
const multer = require ('multer');
const app = express();
const exhbs = require('express-handlebars');

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

// form submission for multer
function submitForm() {
    const formData = new FormData();
    formData.append('fileUpload', document.getElementById('fileUpload').files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}

// server side code to render uploaded handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// configuration

const storage = multer.diskStorage({
    destination: function(require, file, cb) {
        cb(null, '.api/cam-multer.js/');
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