/*jshint esversion: 6 */
const Joi = require('joi');
const express = require('express');
const app = express();
//enabling parsing of json objects in body of req
app.use(express.json());

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

//Handling HTTP POST requests
app.post('/api/courses',(req,res) => {

    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body , schema);
    const result = validateCourse(req.body);
    if(result.error){
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //read from body of post req made by postman
    const course = {
        id: courses.length + 1 ,
        name: req.body.name
    };
    //push it to our array
    courses.push(course);
    //return it in body of response toverify that its added
    res.send(course);
});

//Handling HTTP PUT requests
//Look up the course
//if it does not exist 404
//else validate
//if errors 400
//else update course
//return it to user
app.put('/api/courses/:id' , (req , res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
       return res.status(404).send("the course was not found");
    }
    const result = validateCourse(req.body);
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});

//making a function as we need to reuse joi valiadation
function validateCourse (course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course , schema);
}

//Handling HTTP DELETE request
//Look up for the course
//if does not exist 404
//else delete it
//return course to the user
app.delete('/api/courses/:id' , (req , res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
       return res.status(404).send("the course was not found");
    } 
    const index = courses.indexOf(course);
    courses.splice(index , 1);
    res.send(course);
});

//Environment variable
const port = process.env.PORT || 3000 ;

app.listen(port , () => {
    console.log(`Listening on port ${port}...`);
});