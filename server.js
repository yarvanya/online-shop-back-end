const app = require('./server/app');
const port = parseInt(process.env.PORT, 10) || 8080;

app.listen(port, () => {
  console.log(`The server is running at localhost: ${port}`);
});
