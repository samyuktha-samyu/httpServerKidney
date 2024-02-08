const express = require("express"); 
const port = 3000
const app = express();
const users = [{
    name: "khan",
    kidneys: [{
        healthy: false
    }]
}]
app.use(express.json());
app.get('/', (req,res) => { //queryParams
    const khanKidneys = users[0].kidneys;
    const noOfKidneys = khanKidneys.length;
    let noOfHealthyKidneys = 0;
    for(let i=0; i<khanKidneys.length; i++){
        if(khanKidneys[i].healthy){
            noOfHealthyKidneys +=1;
        }
    }
    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;
    res.json({
        noOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    })
    // console.log(khanKidneys);
})
app.post("/", (req,res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})
app.put('/',(req,res)=>{
    if(isThereAtleastOneUnhealthyKidney()){
        for(let i=0; i<users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({});
    }else{
        res.status(411).json({
            msg: "You don't have any unhealthy kidneys"
        })
    }
    
})
app.delete('/', (req,res)=> {
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++) {
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            } 
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})
    }else{
        res.status(411).json({
            msg: "You don't have any unhealthy kidneys"
        })
    }
    
})
function isThereAtleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}
// function calculateSum(n) {
//     let ans = 0;
//     for(let i=1; i<=n; i++) {
//         ans = ans + i;
//     }
//     return ans;
// }

// app.get('/', (req,res) => {
//     const n = req.query.n;
//     const ans = calculateSum(n);
//     res.send("hi your ans is " + ans);
    

// })
// app.post('/conversations', (req, res) => {
//     // res.send('<b>wowwwwwwwwww</b>')
//     console.log(req.headers)
//     res.send({
//         msg: "2 + 2 = 4"
//     })
// })

app.listen(port)