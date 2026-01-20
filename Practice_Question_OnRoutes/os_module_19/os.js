const os=require("os");
const totalmemory=os.totalmem()/(1024*1024*1024);
const freememory=os.freemem()/(1024*1024*1024);
const platform=os.platform();
const cpu=os.cpus()[0].model//
const uptime=os.uptime()/3600;//system kisne sec se chal rahh  h

console.log("Total memory:",totalmemory);
console.log("Free memory:",freememory);
console.log("CPus: ",cpu);
console.log("Platform: ",platform);
console.log("Uptime:",uptime);
