class SiteController {
    home(req, res) {
        res.render('home');
    }
}

module.exports = new SiteController();
