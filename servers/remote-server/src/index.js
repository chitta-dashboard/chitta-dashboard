const app = require("./app");
const port = 5002;

app.listen(port, () => {
  console.log(`Chitta dashboard remote server is up on port ${port}`);
});
