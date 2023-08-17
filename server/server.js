////require module or package here
require("dotenv").config()

let express = require("express");
let app = express();
let port =  process.env.PORT || 8000;
let cors = require("cors")
let bodyparser = require("body-parser");
let multer = require("multer");
let path = require("path");
let mongoose = require("mongoose")
let paypal = require('paypal-rest-sdk')

//// db address here

let url = "mongodb+srv://fakirmuzaffar771:Muzaffar@cluster0.wupzbuz.mongodb.net/?retryWrites=true&w=majority"
//.// parser boolen value for conncection
let par = {
    useNewUrlparser: true
}
///////connect database with backend 

mongoose.connect(url, par).then((res) => {
    console.log('eastablish');
}).catch((er) => {
    console.log(er)
})
///////paypal integration config
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': 'AdsMeHT_J_1WI4EiG3wQagT8jc86GmnrtTTv6xchTVQvKMYMw4bv2A3Usq4J5qhNQIaWvfKS9CDwBS9V'
    ,
    'client_secret': 'EJyqzSsDfVhlSlU_LsSaWpLelzN4pgPFthyqLA1zLD128RtL8g2V1ovStZumxMkGYBC2Mo1_GDEbnsTa'
});


//Multer files uploadinmg 
let storage = multer.diskStorage({
    destination:  path.join(__dirname, 'image'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage
})
///////creating a schem a for storin a value in our database 

let sc = new mongoose.Schema({
    img: String,
    date: String

})
let amount;

let collection = new mongoose.model("collection", sc);
/////midlewares all here
app.use(bodyparser.json({ limit: "10000kb" }));
app.use(bodyparser.urlencoded({ limit: "10000kb", extended: true }));
app.use(cors())
app.use(express.static(path.join(__dirname,"../image/build")))
app.use(express.static(__dirname,"image"))

//////Routing all here
let datee = new Date();

app.post("/", upload.single("img"), (req, res) => {
        let url = req.protocol + "://" + req.get("host");

    let data = new collection({
        img: url+"image"+req.file.filename,
        date: datee.toISOString().split("T")[0]
    })
    data.save();

})
app.get("/data", async (req, res) => {
    let dat = await collection.find({});
    res.json({ data: dat })
})

app.delete('/del/:id',async(req,res)=>{
   await collection.findByIdAndDelete(req.params.id)
})

app.post("/req", (req, res) => {
    amount = req.body.text;
})
////paypal post route 
app.get('/pay', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://google.com",
            "cancel_url": "https://facebook.com"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "HELP TO THE DEVELOPER",
                    "sku": "001",
                    "price": `${amount}`,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": `${amount}`
            },
            "description": "HELPING TO DEVELOPER"
        }]
    };
    paypal.payment.create(create_payment_json, (err, payment) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.send({ url: payment.links[i].href })

                }

            }
        }
    })
})


///port running here  

app.listen(port)
