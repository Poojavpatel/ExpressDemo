/*jshint esversion: 6 */
const express = require('express');
const app = express();

const courses = [
    {id:1 , course:"html" , author:"abs"},
    {id:2 , course:"css" , author:"abs"},
    {id:3 , course:"js"  , author:"abs"}
];

//Defining routes
app.get('/' , ( req , res) => {
    res.send("hello friends ,chai pi lo ! ");
});

app.get('/api/courses/' , (req , res) => {
    res.send(courses);
});

// app.get('/api/courses/:id' , (req , res) => {
//     res.send(req.params);
// });

app.get('/api/courses/:year/:month' , (req , res) => {
    res.send(req.params);
});

//Query string parameters
app.get('/api/myquestion' , (req , res) => {
    res.send(req.query);
});

//handling HTTP GET requests
app.get('/api/courses/:id' , (req , res) => {
    let a = parseInt(req.params.id);
    const course = courses.find(c => c.id === a);
   // if course not found send a 404
    if(!course){
        res.status(404).send("the course was not found");
    }
    res.send(course);
});

//Environment variable
const port = process.env.PORT || 3000 ;

app.listen(port , () => {
    console.log(`Listening on port ${port}...`);
});