const websiteService = require('../services/WebsiteService')
const path = require('path')
const pool = require('../config/connectDB')
const axios = require('axios')
const e = require('cors')

class WebsiteController {
    constructor() {
        this.handleSuccessfulPayment = this.handleSuccessfulPayment.bind(this)
    }
    async searchTours(req, res) {
        try {
            const currentIndex = parseInt(req.query.currentIndex) || 0
            console.log(req.url)
            const result = await websiteService.searchTours(req.query)
            if (result.success) {
                console.log('After Search URL:', result.data) // Kiểm tra URL sau khi tìm kiếm
                res.render('tour/show', {
                    layout: false,
                    currentIndex: currentIndex,
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
    getTourDetailPage(req, res) {
        let isLoggedIn = false
        if (req.session && req.session.user) {
            isLoggedIn = true
        }
        res.render('tour_detail', {
            layout: false,
            isLoggedIn,
        })
    }
    async getCheckoutPage(req, res) {
        let isLoggedIn = false
        if (req.session && req.session.user) {
            isLoggedIn = true
        }
        try {
            const query = 'SELECT * FROM Tours WHERE id = ?'
            const [result] = await pool.query(query, [req.params.id])

            if (!result.length) {
                return res.status(404).send('Tour not found')
            }

            const formatDate = (time) => {
                const date = new Date(time)

                // Lấy thứ
                const daysOfWeek = [
                    'Chủ Nhật',
                    'Thứ 2',
                    'Thứ 3',
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                ]
                const dayOfWeek = daysOfWeek[date.getDay()]

                // Lấy ngày, tháng, năm
                const day = date.getDate()
                const month = date.getMonth() + 1
                const year = date.getFullYear()

                return {
                    dayOfWeek,
                    dateString: `${day.toString().padStart(2, '0')} tháng ${month.toString().padStart(2, '0')}, ${year}`,
                }
            }
            const timeGoFormatted = formatDate(result[0].time_go)
            const timeBackFormatted = formatDate(result[0].time_back)

            // Định dạng time_go và time_back
            result[0].time_go = timeGoFormatted.dateString
            result[0].time_back = timeBackFormatted.dateString
            const day_go = timeGoFormatted.dayOfWeek
            const day_back = timeBackFormatted.dayOfWeek

            res.render('checkout', {
                layout: false,
                isLoggedIn,
                tour: result[0],
                day_go,
                day_back,
            })
        } catch (error) {
            console.log('Error: Lỗi truy vấn tour cho checkout: ', error)
        }
    }
    getPayPage(req, res, next) {
        try {
            if (req.query.partnerCode) {
                return next()
            }
            // Lấy dữ liệu từ session
            const { tour, order_id, total_price, passengers } = req.session

            // Kiểm tra nếu không có dữ liệu
            if (!tour) {
                return res.redirect('/') // Chuyển hướng về trang chủ nếu không có dữ liệu
            }

            // Render trang thanh toán
            res.render('pay', {
                layout: false,
                tour,
                order_id,
                total_price,
                number_of_passengers: passengers.length,
            })
        } catch (error) {
            console.error('Error while rendering pay page:', error)
            res.status(500).send('An error occurred.')
        }
    }
    async handleSuccessfulPayment(req, res) {
        try {
            console.log('DEBUG HANDLE SUCCESSFUL PAYMENT')
            if (req.query.resultCode != '0') {
                return res.render('pay', {
                    layout: false,
                    tour,
                    order_id,
                    total_price,
                    number_of_passengers: passengers.length,
                })
            }
            const id = req.session.order_id
            console.log('order id: ', id)
            const updateQuery = 'UPDATE Orders SET status = ? WHERE id = ?'
            await pool.query(updateQuery, ['Completed', id])
            console.log('Update status order successfully')

            const { customer, passengers } = req.session
            const customerQuery =
                'INSERT INTO Customers (full_name, phone, email, city) VALUES (?, ?, ?, ?)'
            const customerParams = Object.values(customer)
            await pool.query(customerQuery, customerParams) // Chèn khách hàng vào DB
            console.log('Add customer successfully')

            // Thêm thông tin hành khách vào bảng Passengers
            if (passengers && passengers.length > 0) {
                const passengerQuery =
                    'INSERT INTO Passengers (order_id, passenger_type, passenger_name, passenger_dob, passenger_phone) VALUES (?, ?, ?, ?, ?)'

                for (const passenger of passengers) {
                    const passengerParams = [
                        id, // order_id
                        passenger.passenger_type, // passenger_type
                        passenger.passenger_name, // passenger_name
                        passenger.passenger_dob, // passenger_dob
                        passenger.passenger_phone, // passenger_phone
                    ]
                    await pool.query(passengerQuery, passengerParams) // Chèn hành khách vào DB
                    console.log('Add passenger successfully')
                }
            }
            // Thêm thông tin vào payment + debug payment
            const trans_id = req.query.transId
            console.log('trans id: ', trans_id)
            const payment_id = req.query.orderId
            console.log('payment id: ', payment_id)
            const payment_date = new Date(Number(req.query.responseTime))
            console.log('payment_date: ', payment_date)
            const payment_method = 'momo'
            const amount = req.query.amount
            console.log('amount: ', amount)
            const paymentParams = [
                payment_id,
                id,
                trans_id,
                payment_date,
                payment_method,
                amount,
            ]

            const paymentQuery =
                'INSERT INTO Payments (payment_id, order_id, trans_id, payment_date, payment_method, amount) VALUES (?, ?, ?, ?, ?, ?)'
            await pool.query(paymentQuery, paymentParams)
            console.log('Add payment successfully')

            // Xoá session
            delete req.session.customer
            delete req.session.passengers
            delete req.session.tour
            delete req.session.order_id
            delete req.session.total_price

            return res.render('payment-successful', {
                layout: false,
            })
        } catch (error) {
            console.error('Error while checking order:', error)
            return res.status(500).json({
                success: false,
                message: 'An error occurred while checking the order',
            })
        }
    }

    async postPay(req, res) {
        try {
            const { customer, passengers, tour, total_price } = req.body

            req.session.customer = customer
            req.session.passengers = passengers
            req.session.tour = tour
            const total_price_number = Number(total_price)
            const query = 'SELECT * FROM Tour_User WHERE tour_id = ?'
            const [result] = await pool.query(query, [tour.id])
            const userId = result[0].user_id
            const tourId = tour.id
            const status = 'Pending'
            const createdAt = new Date()
            const updatedAt = new Date()
            const addQuery =
                'INSERT INTO Orders (userId, tourId, total_price, status, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?)'
            const addParams = [
                userId,
                tourId,
                total_price_number,
                status,
                createdAt,
                updatedAt,
            ]

            const [addResult] = await pool.query(addQuery, addParams)
            // Lấy id của hàng vừa được thêm
            const order_id = addResult.insertId
            req.session.order_id = order_id
            req.session.total_price = total_price_number

            setTimeout(async () => {
                const checkQuery = 'SELECT status FROM Orders WHERE id = ?'
                const [rows] = await pool.query(checkQuery, [order_id])
                if (rows.length > 0 && rows[0].status === 'Completed') {
                    console.log(`Order ID ${order_id} đã được xử lý.`)
                    return
                }
                console.log(
                    'Order ID vẫn chưa được xử lý sau 10 phút. Cập nhật trạng thái thành "Canceled".'
                )

                // Cập nhật trạng thái đơn hàng thành Canceled
                const cancelQuery = 'UPDATE Orders SET status = ? WHERE id = ?'
                await pool.query(cancelQuery, [
                    'Canceled',
                    req.session.order_id,
                ])

                console.log(
                    `Order ID ${order_id} đã được cập nhật trạng thái thành "Canceled".`
                )

                // Xoá session
                delete req.session.customer
                delete req.session.passengers
                delete req.session.tour
                delete req.session.order_id
                delete req.session.total_price
            }, 600000) // 10 phút
            res.redirect('/pay')
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    async checkOrder(req, res) {
        try {
            const id = req.params.id
            console.log('id: ', id)
            const query = 'SELECT status FROM Orders WHERE id = ?'
            const [result] = await pool.query(query, [id])
            console.log('status: ', result[0].status.trim())
            if (result[0].status.trim() === 'Completed') {
                const { customer, passengers } = req.session
                const customerQuery =
                    'INSERT INTO Customers (full_name, phone, email, city) VALUES (?, ?, ?, ?)'
                const customerParams = Object.values(customer)
                await pool.query(customerQuery, customerParams) // Chèn khách hàng vào DB
                console.log('Add customer successfully')

                // Thêm thông tin hành khách vào bảng Passengers
                if (passengers && passengers.length > 0) {
                    const passengerQuery =
                        'INSERT INTO Passengers (order_id, passenger_type, passenger_name, passenger_dob, passenger_phone) VALUES (?, ?, ?, ?, ?)'

                    for (const passenger of passengers) {
                        const passengerParams = [
                            id, // order_id
                            passenger.passenger_type, // passenger_type
                            passenger.passenger_name, // passenger_name
                            passenger.passenger_dob, // passenger_dob
                            passenger.passenger_phone, // passenger_phone
                        ]
                        await pool.query(passengerQuery, passengerParams) // Chèn hành khách vào DB
                        console.log('Add passenger successfully')
                    }
                }
                // Xoá session
                delete req.session.customer
                delete req.session.passengers
                delete req.session.tour
                delete req.session.order_id
                delete req.session.total_price

                return res.json({
                    success: true,
                    redirectTo: '/homepage',
                })
            }
            return res.json({
                success: false,
            })
        } catch (error) {
            console.error('Error while checking order:', error)
            return res.status(500).json({
                success: false,
                message: 'An error occurred while checking the order',
            })
        }
    }

    async handlePayment(req, res) {
        // parameters
        console.log('amout: ', req.body.amount)
        var accessKey = 'F8BBA842ECF85'
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
        var orderInfo = 'Pay With MoMo'
        var partnerCode = 'MOMO'
        var redirectUrl = req.body.redirectTo
        var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'
        var requestType = 'payWithMethod'
        var amount = Number(req.body.amount)
        var orderId = partnerCode + new Date().getTime() + req.body.order_id
        var requestId = orderId
        var extraData = ''
        var orderGroupId = ''
        var autoCapture = true
        var lang = 'vi'

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType
        //puts raw signature
        console.log('--------------------RAW SIGNATURE----------------')
        console.log(rawSignature)
        //signature
        const crypto = require('crypto')
        var signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex')
        console.log('--------------------SIGNATURE----------------')
        console.log(signature)
        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        })
        //Create the HTTPS objects
        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
        }
        let result
        try {
            result = await axios(options)
            console.log('Ket qua cua thanh toan: ', result.data)
            return res.status(200).json(result.data)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Server error',
            })
        }
    }
}

module.exports = new WebsiteController()
