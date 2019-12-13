const sls = require('serverless-http');
const app = require('./app');
const binaryMimeTypes = require('./binaryMimeTypes');
//module.exports.run = sls(app)

// or as a promise
//const run = sls(app);
//module.exports.run = async (event, context) => {
  //return await run(event, context);
//};


module.exports.run = sls(app, {
  binary: binaryMimeTypes
});
