function add(a,b){
    return a+b;
}

function remove(a,b){
    return a-b;
}

function areaOfCircle(r){
    return 3.14*r*r;
}

//"Ye function jab bhi call hota hai, to message aur current time activity.log file me add kar deta hai.
const fs = require("fs");
function logActivity(msg){
    const timestamp=new Date().toLocaleString();
    const logMessage= `[${timestamp}]- ${msg}\n`;
    
    //using appendfile so it does not override previous logs
    fs.appendFile('activity.log',logMessage,(err) =>{
        if(err){
            console.log("Failed to write log");
        }
    });
}


module.exports={add,remove,areaOfCircle,logActivity};//-  यहाँ module.exports ने add और remove functions को बाहर expose कर दिया, ताकि दूसरे files में require करके use कर सको

