var cars=[]
var people=[]
var stores=[]

//fs allows user to read or write files
var fs = require("fs");

//since server.js requires usage of this module, we have to export this particular function. Hence
//we use the module.export and assign it to this function.
module.exports.initialize=function(){
//fs.readFile will be done in sequence. readFile will read JSON files and will do
//either 2 things. If error occurs, it will do err. the data from each JSON will
//be parsed into each array I created. If error doesn't occur, it will do resolve().
    return new Promise (function(resolve, reject){
        fs.readFile('./data/cars.json', 'utf8', (err, data) => {      
            if (err) {
              reject(err); 
              return;
            }     
            cars=JSON.parse(data);
       
            fs.readFile("./data/people.json", "utf8", (err,data)=>{
                if (err){
                    reject({message: "unable to read file"});
                    return;
                }
                people=JSON.parse(data);

                    fs.readFile("./data/stores.json", "utf8", (err,data)=>{
                        if (err){
                            reject({message: "unable to read file"});
                            return;
                        }
                        stores=JSON.parse(data);
                        resolve({message: "successful"});                     
                    });
            });
        });
    });
}

//this function will be called if /people is requested. Basically determines the length of the array
//if array is somehow empty, a reject() will be issued and passed to server.js via module.export
//so error message can be sent
module.exports.getAllPeople=function(){
    return new Promise(function(resolve,reject){
        if(people.length===0){
            reject({message: "no results returned"});
        }
        resolve(people);
    })
}

module.exports.getCars=function(){
    return new Promise(function(resolve,reject){
        if (cars.length===0){
            reject({message: "no results returned"});
        }
        resolve(cars);
    })
}

module.exports.getStores=function(){
    return new Promise(function(resolve, reject){
        if (stores.lenght===0){
            reject({message: "no results returned"});
        }
        resolve(stores);
    })
}

