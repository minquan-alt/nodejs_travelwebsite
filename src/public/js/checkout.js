$(window).on('beforeunload', function () {
    // Đổi con trỏ chuột thành dạng loading
    $('body').css('cursor', 'wait')
})

const line2 = document.querySelector('.line2') // Thông tin tổng quan
const cusInfoContainer = document.querySelector('.cus-info') // Thông tin chi tiết
const increaseBtns = document.querySelectorAll('.increase')
const decreaseBtns = document.querySelectorAll('.decrease')
const countElements = document.querySelectorAll('.count') // Các <span class="count">
const max_number = $('.max_people').data('max-of-people')
let total_price = 0
console.log('max_number: ', max_number)

const passengerTypes = ['Người lớn', 'Trẻ em', 'Em bé']

const prices = $('.decrease')
    .map(function () {
        return $(this).data('price')
    })
    .get()
console.log(prices)

// Mảng lưu trữ số thứ tự hiện tại của từng loại khách
const passengerCounters = [1, 0, 0] // Đếm số khách theo từng loại (Người lớn bắt đầu từ 1)

// Hàm cập nhật tổng tiền
function updateTotalAmount() {
    let totalAmount = 0

    // Duyệt qua tất cả các loại khách và tính tổng tiền
    passengerCounters.forEach((count, index) => {
        totalAmount += count * prices[index] // Tính tổng tiền cho từng loại khách
    })

    // Cập nhật hiển thị tổng tiền
    const totalAmountElement = document.querySelector('.line3 .blue')
    totalAmountElement.textContent = totalAmount.toLocaleString('vi-VN')
    total_price = totalAmount
}

// Sự kiện tăng số lượng
increaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let total = 0
        passengerCounters.forEach((val) => {
            total += val
        })
        if (total >= max_number) {
            Swal.fire({
                icon: 'error',
                title: 'Quá số lượng!',
                text: 'Đã đạt số lượng khách tối đa.',
            })
            return
        }
        // Tăng số thứ tự của loại khách
        passengerCounters[index]++

        // Cập nhật số lượng hiển thị trong <span class="count">
        const currentCount = parseInt(countElements[index].textContent) + 1
        countElements[index].textContent = currentCount

        // Thêm dòng mới vào `line2`
        const lineItemHTML = `
            <div class="line-item" data-index="${index}" data-order="${passengerCounters[index]}">
              <div class="left-item"> 
                <h3><strong>${passengerTypes[index]} ${passengerCounters[index]}</strong></h3>
              </div>
              <div class="between-item">  
                <p>${prices[index].toLocaleString('vi-VN')} </p>
              </div>
              <div class="right-item">
                <p>VND</p>
                </div>
            </div>
          `
        line2.insertAdjacentHTML('beforeend', lineItemHTML)

        // Hiện `line2` nếu bị ẩn
        line2.style.display = 'block'

        // Thêm biểu mẫu mới vào `cusInfoContainer`
        const newFormHTML = `
            <div class="grey passenger-info">
              <h3><strong>${passengerTypes[index]} thứ ${passengerCounters[index]}</strong></h3>
              <div class="thongtin">
                <div class="loaikhach">
                  <label for="khach${index}-${passengerCounters[index]}" class="form-label">Loại khách</label>
                  <input type="text" class="form-control" id="khach${index}-${passengerCounters[index]}" value="${passengerTypes[index]}" readonly required>
                </div>
                <div class="hoten">
                  <label for="name${index}-${passengerCounters[index]}" class="form-label">Họ tên</label>
                  <label class="red">(*) Vui lòng nhập không dấu</label>
                  <input type="text" class="form-control" id="name${index}-${passengerCounters[index]}" required>
                </div>
                <div class="sdt">
                  <label for="phone${index}-${passengerCounters[index]}" class="form-label">Số điện thoại</label>
                  <label class="red">(*)</label>
                  <input type="tel" class="form-control" id="phone${index}-${passengerCounters[index]}" required>
                </div>
                <div class="date">
                  <label for="date${index}-${passengerCounters[index]}" class="form-label">Ngày sinh</label>
                  <label class="red">(*)</label>
                  <input type="date" class="form-control" id="date${index}-${passengerCounters[index]}" required>
                </div>
              </div>
            </div>
          `
        cusInfoContainer.insertAdjacentHTML('beforeend', newFormHTML)

        // Cập nhật tổng tiền sau khi thêm khách
        updateTotalAmount()
    })
})

// Sự kiện giảm số lượng
decreaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (passengerCounters[index] > 0) {
            if (index === 0 && passengerCounters[index] <= 1) {
                // Không giảm số lượng Người lớn xuống 0
                return
            }
            // Giảm số thứ tự của loại khách
            passengerCounters[index]--

            // Cập nhật số lượng hiển thị trong <span class="count">
            const currentCount = parseInt(countElements[index].textContent) - 1
            countElements[index].textContent = Math.max(0, currentCount) // Không giảm dưới 0

            // Tìm và xóa dòng cuối cùng trong `line2`
            const lineItems = line2.querySelectorAll(
                `.line-item[data-index="${index}"]`
            )
            const lastLineItem = lineItems[lineItems.length - 1]
            if (lastLineItem) {
                line2.removeChild(lastLineItem)
            }

            // Tìm và xóa biểu mẫu tương ứng trong `cusInfoContainer`
            const forms = cusInfoContainer.querySelectorAll('.grey')
            for (let i = forms.length - 1; i >= 0; i--) {
                const formIndex = parseInt(
                    forms[i]
                        .querySelector('.loaikhach input')
                        .id.match(/\d+/)[0]
                )
                const formOrder = parseInt(
                    forms[i]
                        .querySelector('.loaikhach input')
                        .id.match(/-(\d+)$/)[1]
                ) // Lấy đúng số thứ tự
                if (
                    formIndex === index &&
                    formOrder === passengerCounters[index] + 1
                ) {
                    cusInfoContainer.removeChild(forms[i])
                    break
                }
            }

            // Ẩn `line2` nếu không còn dòng nào
            if (line2.children.length === 0) {
                line2.style.display = 'none'
            }

            // Cập nhật tổng tiền sau khi giảm khách
            updateTotalAmount()
        }
    })
})

// Khởi tạo tổng tiền ban đầu

const phoneReg = /^(0|\+84)[3-9][0-9]{8}$/
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function checkValidCustomer(customer) {
    if (!customer.full_name || customer.full_name.trim() === '') {
        return {
            valid: false,
            message: 'Vui lòng điền đầy đủ thông tin liên lạc!',
        }
    }
    if (!customer.phone || customer.phone.trim() === '') {
        return {
            valid: false,
            message: 'Vui lòng điền đầy đủ thông tin liên lạc!',
        }
    } else if (!phoneReg.test(customer.phone.trim())) {
        return {
            valid: false,
            message: `Số điện thoại trong thông tin liên lạc không hợp lệ!`,
        }
    }
    if (!customer.email || customer.email.trim() === '') {
        return {
            valid: false,
            message: 'Vui lòng điền đầy đủ thông tin liên lạc!',
        }
    } else if (!emailReg.test(customer.email.trim())) {
        return {
            valid: false,
            message: `Email trong thông tin liên lạc không hợp lệ!`,
        }
    }
    if (!customer.city || customer.city.trim() === '') {
        return {
            valid: false,
            message: 'Vui lòng điền đầy đủ thông tin liên lạc!',
        }
    }
    return {
        valid: true,
    }
}

function checkValidPassengers(passengers) {
    let index = 1 // Bắt đầu từ 1 thay vì 0 để dễ đọc
    for (let passenger of passengers) {
        if (
            !passenger.passenger_name ||
            passenger.passenger_name.trim() === ''
        ) {
            return {
                valid: false,
                message: `Vui lòng điền đầy đủ thông tin cho ${passenger.passenger_type} thứ ${index}!`,
            }
        }
        if (
            !passenger.passenger_phone ||
            passenger.passenger_phone.trim() === ''
        ) {
            return {
                valid: false,
                message: `Vui lòng điền đầy đủ thông tin cho ${passenger.passenger_type} thứ ${index}!`,
            }
        } else if (!phoneReg.test(passenger.passenger_phone.trim())) {
            return {
                valid: false,
                message: `Số điện thoại của ${passenger.passenger_type} thứ ${index} không hợp lệ!`,
            }
        }
        if (!passenger.passenger_dob || passenger.passenger_dob.trim() === '') {
            return {
                valid: false,
                message: `Vui lòng điền đầy đủ thông tin cho ${passenger.passenger_type} thứ ${index}!`,
            }
        } else {
            const currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0)
            const inputDate = new Date(passenger.passenger_dob)

            if (isNaN(inputDate)) {
                return {
                    valid: false,
                    message: `Ngày sinh của ${passenger.passenger_type} thứ ${index} không hợp lệ!`,
                }
            }

            if (inputDate > currentDate) {
                return {
                    valid: false,
                    message: `Ngày sinh của ${passenger.passenger_type} thứ ${index} không hợp lệ!`,
                }
            }
        }
        index++
    }
    return {
        valid: true,
    }
}
function showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        text: message,
        timer: 3000,
        allowOutsideClick: false,
    })
}
$('.confirm').on('click', function () {
    const passengers = []
    $('.passenger-info').each(function () {
        const passenger_type = $(this).find('.loaikhach input').val()
        const passenger_name = $(this).find('.hoten input').val()
        const passenger_phone = $(this).find('.sdt input').val()
        const passenger_dob = $(this).find('.date input').val()
        passengers.push({
            passenger_type: passenger_type,
            passenger_name: passenger_name,
            passenger_dob: passenger_dob,
            passenger_phone: passenger_phone,
        })
    })
    // console.log('List of passengers: ', passengers)

    const full_name = $('.contact').find('#name').val()
    const phone = $('.contact').find('#phone').val()
    const email = $('.contact').find('#email').val()
    const city = $('.contact').find('#city').val()

    const customer = {
        full_name,
        phone,
        email,
        city,
    }

    // check for valid information
    const validCustomer = checkValidCustomer(customer)
    if (!validCustomer.valid) {
        showErrorAlert(validCustomer.message)
        return
    }

    const validPassengers = checkValidPassengers(passengers)
    if (!validPassengers.valid) {
        showErrorAlert(validPassengers.message)
        return
    }
    let all_checked = true
    $('#commit-info').each(function () {
        if (!$(this).prop('checked')) {
            all_checked = false
            return false
        }
    })
    if (!all_checked) {
        showErrorAlert('Vui lòng đọc và xác nhận các điều khoản!')
        return
    }
    $('body').css('cursor', 'wait')

    const current_url = window.location.href
    const parts = current_url.split('/')
    const tour_id = parts[parts.length - 1]
    console.log(tour_id)
    const tour = {
        id: tour_id,
        tour_name: $('#tourName').val(),
        day_go: $('#tourDayGo').val(),
        time_go: $('#tourTimeGo').val(),
        day_back: $('#tourDayBack').val(),
        time_back: $('#tourTimeBack').val(),
        days: $('#tourDays').val(),
        nights: $('#tourNights').val(),
        tour_code: $('#tourTourCode').val(),
        vehicle: $('#tourVehicle').val(),
        departure_location: $('#tourDepartureLocation').val(),
    }

    fetch('/pay', {
        body: JSON.stringify({
            customer,
            passengers,
            tour,
            total_price,
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            console.log('Data sent successfully')
            // Chuyển hướng sang trang thanh toán
            window.location.href = '/pay'
        })
        .catch((err) => {
            console.error('Error:', err)
        })

    // window.location.href = 'http://localhost:8080/pay'
})
$(document).ready(function () {
    updateTotalAmount()

    $(window).on('beforeunload', function () {
        $('body').css('cursor', 'wait')
    })

    // Khi nhấp vào liên kết
    $('a').on('click', function (e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault() // Ngăn điều hướng giả
            $('body').css('cursor', 'default') // Reset con trỏ
        } else {
            $('body').css('cursor', 'wait')
        }
    })

    $('.confirm').on('click', function (e) {
        if (!$(this).attr('href') || $(this).attr('href') === '#') {
            e.preventDefault() // Ngăn điều hướng giả
            $('body').css('cursor', 'default') // Reset con trỏ
        } else {
            $('body').css('cursor', 'wait')
        }
    })

    $('#similarInfo').change(function () {
        if ($(this).is(':checked')) {
            // Lấy giá trị từ thông tin liên lạc
            const name = $('#name').val()
            const phone = $('#phone').val()

            // Đặt giá trị vào thông tin khách đi
            $('#nameCopy').val(name)
            $('#phoneCopy').val(phone)
        } else {
            // Xóa thông tin khi bỏ tích
            $('#nameCopy').val('')
            $('#phoneCopy').val('')
        }
    })
})
