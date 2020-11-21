const mongo = require('mongodb')
const ObjectID = mongo.ObjectID;

let db;

async function init() {
  db = await require('../datasources/mongodb.js').init();
}
init();

function getAssessments() {
  return new Promise((resolve, reject) => {
    const collection = db.collection('assessments');

    collection.find({}).toArray(function(err, docs) {
      if (err !== null) {
        console.error(err)
        reject(err);
        return;
      }

      console.log("Found the following records");
      console.log(docs)
      resolve(docs);
    });
  });
}

function getAssessmentsByJobId(job_id) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('assessments');

    collection.find({job_id}).toArray(function(err, docs) {
      if (err !== null) {
        console.error(err)
        reject(err);
        return;
      }

      console.log("Found the following records");
      console.log(docs)
      resolve(docs);
    });
  });
}

function getAssessment(id) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('assessments');

    collection.findOne({_id: new ObjectID(id)}).toArray(function(err, docs) {
      if (err !== null) {
        console.error(err)
        reject(err);
        return;
      }

      console.log("Found the following records");
      console.log(docs)
      resolve(docs);
    });
  });
}

function postAssessment(data) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('assessments');

    collection.insertOne(data, function(err, result) {
      if (err !== null) {
        console.error(err)
        reject(err);
        return;
      }

      // assert.equal(3, result.result.n);
      // assert.equal(3, result.ops.length);
      // console.log("Inserted 3 documents into the collection");
      resolve({
        _id: result.insertedId,
        ...data
      });
    });
  });
}

function patchAssessment(id, data) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('assessments');

    collection.updateOne({_id: new ObjectID(id)}, { $set: data }, function(err, result) {
      if (err !== null) {
        console.error(err)
        reject(err);
        return;
      }

      // console.log("Updated documents into the collection");
      resolve({
        _id: id,
        ...data
      });
    });
  });
}

function deleteAssessment(id) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('assessments');

    collection.deleteOne({_id: new ObjectID(id)}, { $set: data }, function(err, result) {
      if (err !== null) {
        console.error(err)
        reject(err);
        return;
      }

      // console.log("Updated documents into the collection");
      resolve(result);
    });
  });
}

module.exports = {
  getAssessments,
  getAssessmentsByJobId,
  getAssessment,
  postAssessment,
  patchAssessment,
  deleteAssessment,
}

