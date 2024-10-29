const newsRouter = require('./news');
const siteRouter = require('./site');
const searchRouter = require('./search');

function route(app) {
       app.get('/search', searchRouter);

                        app.get('/news', newsRouter);
          app.get('/', siteRouter);
}

module.exports = route;
