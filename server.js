const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articlesRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({createdAt: 'desc'});
  res.render('articles/index', {articles: articles});
});

// ROUTER
app.use('/articles', articlesRouter);

// LISTEN PORT
app.listen('5000', () => {
  console.log('Server started on port 3000');
});