const express = require("express")
const bodyParser = require("body-parser");
const { render } = require("ejs");


const app = express()

var items = ["Buy Food","Go Workout"];
var workItems = [];

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", 'ejs');

app.get("/", (req, res) => {
    var today = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var day = weekday[today.getDay()];

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US",options)

    // if(currentDay === 6 || currentDay === 0){
    //     day = "Weekend";
    // }else{
    //     day = "Weekday";
    // }

    res.render("list", { listTitle: day, newListItems: items, route: "/"});

})

app.get("/work", (req,res)=>{
    res.render("list", {listTitle: "Work List", newListItems:workItems, route: "/work"})
})
app.get("/about", (req,res)=>{
    res.render("about")
})

app.post("/", (req,res)=>{
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})
app.post("/work", (req,res)=>{
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, () => {
    console.log("Server running in port 3000")
})

