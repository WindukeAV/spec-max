const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/public', express.static(path.join(__dirname, '/public')));

const routing = require('./routing.json');

for (const route of routing) {
  app.get(`${route.path}`, (req, res) => {
    if (route.page) {
      const { title, description, body, head } = route.page;
      
      res.render('index', {
        isContentRendered: false,
        title,
        description,
        headCustomContent: head,
        content: body,
      });
    }
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
