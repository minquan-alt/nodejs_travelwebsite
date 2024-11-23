function time() {
    var today = new Date()
    var weekday = new Array(7)
    weekday[0] = 'Chủ Nhật'
    weekday[1] = 'Thứ Hai'
    weekday[2] = 'Thứ Ba'
    weekday[3] = 'Thứ Tư'
    weekday[4] = 'Thứ Năm'
    weekday[5] = 'Thứ Sáu'
    weekday[6] = 'Thứ Bảy'
    var day = weekday[today.getDay()]
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    var h = today.getHours()
    var m = today.getMinutes()
    var s = today.getSeconds()
    m = checkTime(m)
    s = checkTime(s)
    nowTime = h + ' giờ ' + m + ' phút ' + s + ' giây'
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = day + ', ' + dd + '/' + mm + '/' + yyyy
    tmp = '<span class="date"> ' + today + ' - ' + nowTime + '</span>'
    document.getElementById('clock').innerHTML = tmp
    clocktime = setTimeout('time()', '1000', 'Javascript')

    function checkTime(i) {
        if (i < 10) {
            i = '0' + i
        }
        return i
    }
}

$(document).ready(function () {
    const menuItems = $('.app-menu__item')
    menuItems.each(function () {
        $(this).on('click', function (event) {
            event.preventDefault()
            if ($(this).hasClass('active')) {
                return
            }
            const url = $(this).attr('data-url')
            console.log(`admin${url}`)

            fetch(`admin${url}`)
                .then((response) => response.text())
                .then((data) => {
                    console.log('data: ', data)
                    $('.dynamic-content').html(data)
                    // Thay đổi URL trong trình duyệt mà không tải lại trang
                    menuItems.removeClass('active')
                    $(this).addClass('active')
                    // Thêm lớp active vào item hiện tại
                })
                .catch((err) => {
                    console.log('Show error: ', err)
                    $('.dynamic-content').html(
                        '<p>Không thể tải dữ liệu, vui lòng thử lại sau.</p>'
                    )
                })
        })
    })
})
