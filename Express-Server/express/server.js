const app = require('./app');
const port = process.env.PORT || 58000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
