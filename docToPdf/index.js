import express from 'express';
import multer from 'multer';
import docxtopdf from 'docx-pdf';
import path from 'path';

const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;

app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, "/index.html");
    res.sendFile(indexPath);
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

app.post('/docxtopdf', upload.single('file'), (req, res) => {
    console.log('file path', req.file.path);

    const outputFilePath = Date.now() + "output.pdf";

    docxtopdf(req.file.path, outputFilePath, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.download(outputFilePath, () => { });
        }

    });
})

app.listen(PORT, () => {
    console.log("Server is listening on localhost")
});