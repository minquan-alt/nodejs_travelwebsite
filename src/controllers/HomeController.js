const db = require('../models/index')

let getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll()
        return res.render('homepage', {
            data: JSON.stringify(data),
        })
    } catch (error) {
        console.log(error)
    }
}
let getRegisterPage = (req, res) => {}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

module.exports = {
    getHomePage,
    getAboutPage,
}
