//mongo db helper operations

const assert = require('assert').strict;

/*params:
db_obj - mongodb db object
coll_str - name of collection
document - json-formatted document
callback - callback funtion to be called on the insert result object
*/
exports.insertDocument = (db_obj, coll_str, document, callback) => {
//get colleciton object of db
    const coll = db_obj.collection(coll_str);
    //call insert one function
    coll.insertOne(document, (err, res) => {
        //do the assertion
        assert.strictEqual(err, null);
        console.log("Inserted " + res.result.n + " documents into " + coll_str);
        callback(res);
    });
};

exports.findDocuments = (db_obj, coll_str, callback) =>{
    const coll = db_obj.collection(coll_str);
    coll.find({}).toArray((err, res) => {
        assert.strictEqual(err, null);
        callback(res);
    });
};

exports.removeDocument = (db_obj, coll_str, document, callback) => {
    //get the collection
    const coll = db_obj.collection(coll_str);
    coll.deleteOne(document,(err,res)=>{
        assert.strictEqual(err, null);
        console.log("Removed document: ", document);
        callback(res);
    });
};

exports.updateDocument = (db_obj, coll_str, document, update, callback) => {
     //get the collection
    const coll = db_obj.collection(coll_str);
    coll.updateOne(document, {$set: update}, null, (err, res) => {
        assert.strictEqual(err, null);
        console.log("Updated document: ", document);
        console.log("with", update);
        callback(res);
    });
};