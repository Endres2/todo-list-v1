const express = require("express")
const bodyParser = require("body-parser");
const e = require("express");

const app = express()

var items = ["Buy Food","Go Workout"];

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

    res.render("list", { kindOfDay: day, newListItems: items });

})
app.post("/", (req,res)=>{
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server running in port 3000")
})

