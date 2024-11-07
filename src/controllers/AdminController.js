const db = require('../models/index')

class AdminController {
    getAdminPage(req, res) {
        return res.render('admin', {
            layout: false,
        })
    }
}

module.exports =  new AdminController