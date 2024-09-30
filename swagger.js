const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    // Project two
    title: 'Project 2',
    description: 'API For Project two'
  },
  host: 'localhost:3000',
  //host: '',
  schemes: ['https','http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });

// dont forget to install 
// npm install swagger-ui-express
// npm install swagger-autogen