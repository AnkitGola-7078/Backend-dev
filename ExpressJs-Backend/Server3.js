const express = require("express");
const app=express();
const fs=require("fs");
const PORT=4000;
app.use(express.urlencoded({ extended: true }));

//ejs se server side rendering hoti h , ejs me hum html ke andar js code likh sakte h , jisse dynamic content generate hota h
app.set("view engine","ejs");
const students=[
       {name:"Ankit",branch:"CSE"},
       {name:"Rahul",branch:"ECE"},
       {name:"Priya",branch:"ME"}, 
       {name:"Sneha",branch:"CSE"}
];

app.get("/",(req,res)=>{
     res.render("form",{allstudents:students});
});


app.post("/student/register",(req,res)=>{
    // const newstudent={
    //     name:req.body.name,
    //     branch:req.body.branch
    // };
    // let students=[];

    // // Purane data read karo agar file exist karti hai
    // try {
    //   const data = fs.readFile("students.json", "utf8");
    //   students = JSON.parse(data);
    // } catch (err) {
    //     students = [];
    // }

    // students.push(newstudent);
    
    // fs.writeFile("students.json",JSON.stringify(students,null,2),(err)=>{
    //     if(err){
    //         return res.send("Error saving data");
    //     } 
    //     res.send("Student Registered");  
    // });

    console.log("form",req.body);
    res.send("Registed");
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});