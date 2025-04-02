require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 11667;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
