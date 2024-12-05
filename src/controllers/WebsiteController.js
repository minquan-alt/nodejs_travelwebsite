const websiteService = require('../services/WebsiteService')
const path = require('path')
const pool = require('../config/connectDB')
class WebsiteController {
    async searchTours(req, res) {
        try {
            console.log(req.url)
            const result = await websiteService.searchTours(req.query)
            if (result.success) {
                console.log('After Search URL:', result.data) // Kiểm tra URL sau khi tìm kiếm
                res.render('tour/show', {
                    layout: false,
                    success: true,
                    tours: result.data,
                })
            } else {
                res.json({
                    success: false,
                })
            }
        } catch (err) {
            console.log('Error: ', err)
        }
    }
    async getHomePage(req, res) {
        try {
            const result = await websiteService.renderHomepage(req)
            const { tours, destinations, isLoggedIn, isAdmin } = result.data
            if (isAdmin) {
                return res.redirect('/admin')
            }
            console.log(tours)
            res.render('homepage', {
                tours: tours,
                destinations: destinations,
                isLoggedIn,
                path,
            })
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    }
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error Logging out')
            }
            res.redirect('/homepage')
        })
    }

    uploadFile(req, res, next) {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
    }
    uploadMultiple(req, res, next) {
        const files = req.files
        if (!files) {
            const error = new Error('Please upload files')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(files)
    }
    async getTourDetailPage(req, res) {
        try {
            const { tourId } = req.query; // Lấy tourId từ query string
            if (!tourId) {
                return res.status(400).send('Tour ID is required');
            }

            // Query dữ liệu từ database cho tour cụ thể
            const [tourRows] = await pool.query('SELECT * FROM Tours WHERE id = ?', [tourId]);

            if (tourRows.length === 0) {
                return res.status(404).send('Tour not found');
            }

            const tour = tourRows[0];

            // Query danh sách tất cả các tour (allTours)
            const [allToursRows] = await pool.query('SELECT * FROM Tours');

            // Lấy 4 tour ngẫu nhiên
            const randomTours = allToursRows.sort(() => Math.random() - 0.5).slice(0, 4); // Lấy 4 tour ngẫu nhiên

            // Query danh sách điểm tham quan từ bảng Tours_Attractions
            const [attractionsRows] = await pool.query(
                'SELECT name, image FROM Tours_Attractions WHERE tour_id = ?',
                [tourId]
            );
            console.log('Attractions:', attractionsRows);

            let isLoggedIn = false;
            if (req.session && req.session.user) {
                isLoggedIn = true;
            }

            // Render giao diện chi tiết tour
            res.render('tour_detail', {
                layout: false,
                isLoggedIn,
                tour,
                tour_attraction: attractionsRows,
                tours: randomTours, // Đảm bảo tours được truyền vào view
            });
        } catch (error) {
            console.log('Error fetching tour detail:', error);
            res.status(500).send(`Internal Server Error: ${error.message}`);
        }
    }
}

module.exports = new WebsiteController()
