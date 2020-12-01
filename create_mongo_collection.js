const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/projectdb";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("projectdb");
    dbo.createCollection("users", function(err, res){
        if(err) throw err;
        console.log("Collection created");
        db.close();
    });
    //dbo.listCollections();
});