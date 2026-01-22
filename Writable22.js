const fs=require("fs");
const path=require("path");

const inputFilePath=path.join(__dirname,"input.txt");
const outputFilePath=path.join(__dirname,"output.txt");
// Create a readable stream it read the txt (file chunks by chunks),used for(large file ,streaming ,coping,gbs/mbs)
const inputStream=fs.createReadStream(inputFilePath,"utf-8");

inputStream.on("data",(chunk)=>{
    console.log("Data is reading in chunks: ",chunk);
})

//inputstream.pip(outstream);//read or write dono krne ke liye use hota h txtfile ko fetch krne ker liye



//using fs module blocking(jab tak puri file read nhi ho jayegi tab tak age nhi bdega), full file ko ak hi bar m ram ko kr deta h,uses(for small files,quick read ,no performance issues);
/*try {
    console.log(fs.readFileSync(inputFilePath,"utf-8"));
} catch (error) {
    console.log(error);
}*/


