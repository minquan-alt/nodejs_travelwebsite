const db = require('../config/connectDB')

class AdminController {
    getCustomerManagement(req, res) {
        try {
            return res.render('customer_management', {
                layout: false,
                scripts: '<script src="/js/customer_management.js"></script>',
            })
        } catch (error) {
            console.log('Error rendering customer management page:', error)
        }
    }
    getTourManagement(req, res) {
        try {
            return res.render('tour_management', {
                layout: false,
                scripts: '<script src="/js/tour_management.js"></script>',
            })
        } catch (error) {
            console.log('Error rendering tour management page')
        }
    }
    getAdminPage(req, res) {
        return res.render('admin_index', {
            layout: 'layouts/admin',
            scripts: '',
        })
    }
}

module.exports = new AdminController()
