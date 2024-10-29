class SearchController {
    index(req, res) {
        res.render('search');
    }
}

module.exports = new SearchController();
