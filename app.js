
var express         = require('express');
    bodyParser      = require('body-parser'),
    app             = express(),
    mongoose        = require('mongoose');


const url = process.env.MONGO_URL || "mongodb://localhost:27017/States"

mongoose.connect('mongodb+srv://kapil123:kapil123@cluster0.wjkqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then((result) => {
    console.log("MongoDb Atlas Connected Successfuly")
}).catch((err) => {
    console.log(" This is Error "+ err  )
});    

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');  

var stateSchema = new mongoose.Schema({
    name:String,
    image: String,
    history:String
});

var State = mongoose.model("state", stateSchema);

// State.create(
//     {
//         name:"Maharashtra", 
//         image:"https://www.eyeonasia.gov.sg/images/india-selected/maharashtra-profile.jpg"
//     },
//     {
//         name:"Gujrat",
//         image:"https://i.ytimg.com/vi/d4ymoRcPKeA/sddefault.jpg"
//     }, (err, state) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log("New state create");
//             console.log(State);
//         }
//     })


app.get('/', (req, res) => {
    res.render('landing');
});
app.get("/states", (req, res) => {
   // Get al states from DB
   State.find({}, (err, allStates) => {
       if(err) {
           console.log(err);
       }
       else {
        res.render('index', {states:allStates});
       }
   })
   
});

app.post('/states', (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var history = req.body.history;
    var newState = {name:name, image:image, history:history}
// Create new state
State.create(newState, (err, newlyCreated) => {
    if(err) {
        console.log(err);
    }
    else {
        res.redirect('/states');
    }
})

});

app.get('/states/new', (req, res) => {
    res.render("new.ejs")
});


// Show more info About one state
app.get('/states/:id', (req, res) => {
    State.findById(req.params.id, (err, foundState) => {
        if(err) {
            console.log(err)
        }
        else {
            res.render("show", {state:foundState});
        }
    })
    
})





let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Express server started at port  : ${port}`);
});
