const express = require('express');
const app = express();
// First middleware
app.use((req, res, next) => {
    req.user ="Anushya Sivanupandian"
    console.log('First middleware');
    next();
});

app.get('/',(req,res)=> {
    console.log('request user :',req.user)
    res.send('Hello World')
})

// //Second middleware
// app.use((req, res, next) => {
//    console.log('Second middleware');
//    next();
// });
// Custom middleware
function logMethodAndUrl(req, res, next) {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next();
   }
app.use(logMethodAndUrl);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  // Trigger an error
  app.get('/error', (req, res) => {
    throw new Error('Oops!');
  });

app.listen(3000, () => console.log('Server started on port 3000'));

app.use('/users/:userId', (req, res, next) => {
  if (!isValidUserId(req.params.userId)) {
     res.status(400).send('Invalid User ID');
  } else { next();
  }
});