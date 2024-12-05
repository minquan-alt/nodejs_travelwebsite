function validDayNight(day, night) {
    day = parseInt(day, 10)
    night = parseInt(night, 10)
    if (isNaN(day) || isNaN(night)) return false
    return Math.abs(day - night) < 2
}

function validTime(time_go, time_back) {
    const start = new Date(time_go)
    const end = new Date(time_back)
    return (
        start instanceof Date &&
        !isNaN(start) &&
        end instanceof Date &&
        !isNaN(end) &&
        start < end
    )
}

function validPrice(original_price, discounted_price) {
    original_price = parseFloat(original_price)
    discounted_price = parseFloat(discounted_price)
    if (isNaN(original_price) || isNaN(discounted_price)) return false
    return original_price >= discounted_price
}

function validationTourForm(data) {
    if (!validDayNight(data.days, data.nights)) {
        return {
            success: false,
            message: 'Ngày đêm không hợp lệ.',
        }
    }
    if (!validTime(data.time_go, data.time_back)) {
        return {
            success: false,
            message: 'Ngày đi và ngày về không hợp lệ.',
        }
    }
    if (!validPrice(data.original_price, data.discounted_price)) {
        return {
            success: false,
            message: 'Giá gốc không hợp lệ.',
        }
    }
    return {
        success: true,
        message: 'Form đã hợp lệ.',
    }
}

function stringDate(stringDate) {
    const arr = stringDate.split('/').map((ele) => parseInt(ele))
    console.log(arr)
    const d = new Date(arr[2], arr[1] - 1, arr[0])
    let datestring =
        d.getFullYear().toString().padStart(4, '0') +
        '-' +
        (d.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        d.getDate().toString().padStart(2, '0')
    return datestring
}

function dateToFormat(myDate) {
    const d = new Date(myDate)
    let datestring =
        d.getFullYear().toString().padStart(4, '0') +
        '-' +
        (d.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        d.getDate().toString().padStart(2, '0')
    return datestring
}
$(document).ready(function () {
    let initialValues = {}

    $(document).on('click', '#basicEdit', function () {
        const row = $(this).closest('tr')
        const tour_id = row.find('td').eq(1).text().trim()
        const tour_name = row.find('td').eq(3).text().trim()
        const time_go_str = row.find('td').eq(4).text().trim()
        const time_back_str = row.find('td').eq(5).text().trim()
        const max_quantity_of_people = row.find('td').eq(6).text().trim()
        const original_price = row.find('td').eq(7).text().trim()
        const discounted_price = row.find('td').eq(8).text().trim()

        const time_go = stringDate(time_go_str)
        const time_back = stringDate(time_back_str)

        $('#basicTourId').val(tour_id)
        $('#basicTourName').val(tour_name)
        $('#basicTimeGo').val(time_go)
        $('#basicTimeBack').val(time_back)
        $('#basicMaxQuantity').val(max_quantity_of_people)
        $('#basicOriginalPrice').val(original_price)
        $('#basicDiscountedPrice').val(discounted_price)

        $('#basicEditModal').modal('show')
    })
    // When the modal is hidden

    $(document).on('click', '#detailEdit', function (event) {
        event.preventDefault()
        $('#basicEditModal').modal('hide')
        const id = $('#basicTourId').val()
        console.log(id)
        fetch(`/api/tour_management/get_one_tour/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const [tourData] = data.data
                    initialValues = {
                        tour_name: tourData.tour_name,
                        description: tourData.description,
                        days: tourData.days,
                        nights: tourData.nights,
                        departure_location: tourData.departure_location,
                        tour_code: tourData.tour_code,
                        original_price: tourData.original_price,
                        discounted_price: tourData.discounted_price,
                        is_featured: tourData.is_featured,
                        is_active: tourData.is_active,
                        type: tourData.type,
                        nation: tourData.nation,
                        max_quantity_of_people: tourData.max_quantity_of_people,
                        time_go: dateToFormat(tourData.time_go),
                        time_back: dateToFormat(tourData.time_back),
                    }

                    $('#updateName').val(tourData.tour_name) // Tour Name
                    $('#updateDescription').val(tourData.description) // Description
                    $('#updateDays').val(tourData.days) // Days
                    $('#updateNights').val(tourData.nights) // Nights
                    $('#updateRating').val(tourData.rating) // Rating
                    $('#updateDepartureLocation').val(
                        tourData.departure_location
                    ) // Departure Location
                    $('#updateTourCode').val(tourData.tour_code) // Tour Code
                    $('#updateOriginalPrice').val(tourData.original_price) // Original Price
                    $('#updateDiscountedPrice').val(tourData.discounted_price) // Discounted Price
                    $('#updateIsFeatured').val(tourData.is_featured) // Featured (Select)
                    $('#updateIsActive').val(tourData.is_active) // Active (Select)
                    $('#updateType').val(tourData.type) // Type
                    $('#updateNation').val(tourData.nation) // Nation
                    $('#updateMaxQuantity').val(tourData.max_quantity_of_people) // Max Quantity of People
                    $('#updateTimeGo').val(dateToFormat(tourData.time_go)) // Time Go
                    $('#updateTimeBack').val(dateToFormat(tourData.time_back)) // Time Back
                    $('#updatePreviewImage').attr('src', tourData.image) // Hiển thị hình ảnh
                }
            })
    })
    $(document).on('submit', '#updateTourForm', function (event) {
        event.preventDefault()
        // Lấy giá trị hiện tại của form
        console.log('Check for debug: ')
        const currentValues = {
            tour_name: $('#updateName').val(),
            description: $('#updateDescription').val(),
            days: $('#updateDays').val(),
            nights: $('#updateNights').val(),
            departure_location: $('#updateDepartureLocation').val(),
            tour_code: $('#updateTourCode').val(),
            original_price: $('#updateOriginalPrice').val(),
            discounted_price: $('#updateDiscountedPrice').val(),
            is_featured: $('#updateIsFeatured').val(),
            is_active: $('#updateIsActive').val(),
            type: $('#updateType').val(),
            nation: $('#updateNation').val(),
            max_quantity_of_people: $('#updateMaxQuantity').val(),
            time_go: $('#updateTimeGo').val(),
            time_back: $('#updateTimeBack').val(),
        }

        // Kiểm tra sự thay đổi và cập nhật FormData
        const updateFormData = new FormData()

        let isChanged = false
        Object.keys(initialValues).forEach((key) => {
            console.log(
                `initial ${key}: ${initialValues[key]}, current ${key}: ${currentValues[key]} `
            )
            console.log(
                `is changed: ${initialValues[key] != currentValues[key]}`
            )
            // So sánh giá trị của từng trường (có thể chuyển đổi về kiểu dữ liệu thống nhất)
            if (initialValues[key] != currentValues[key]) {
                isChanged = true
            }
        })
        const fileInput = $('#updateFile')[0]
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0]
            updateFormData.append('image', file)
            isChanged = true
        }

        if (isChanged) {
            initialValues = {}
            console.log('Data has changed, updating FormData...')
            // Cập nhật FormData với các giá trị hiện tại
            Object.keys(currentValues).forEach((key) => {
                updateFormData.append(key, currentValues[key])
            })

            // Thêm file nếu có

            console.log('Dữ liệu trong updateFormData:')
            for (const [key, value] of updateFormData.entries()) {
                console.log(`${key}: ${value}`)
            }

            // Gửi request update
            const id = $('#basicTourId').val()
            fetch(`/api/tour_management/update_tour/${id}`, {
                method: 'POST',
                body: updateFormData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        fetch('/api/tour_management/get_tours')
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.success) {
                                    console.log('Get tours thanh cong')
                                }
                            })
                        console.log('Tour updated successfully!')
                        $('#ModalUpdate').modal('hide')
                    } else {
                        console.error('Failed to update the tour.')
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        } else {
            console.log('No changes detected')
            $('#ModalUpdate').modal('hide')
        }
    })

    $('#confirmDeleteButton').on('click', function () {
        rowToDelete = $('#deleteRow').closest('tr')
        deleteId = rowToDelete.find('td').eq(1).text()
        console.log('deleteId: ', deleteId)
        fetch(`/admin/tour_management/delete/${deleteId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                console.log('Đã xoá thành công')
            })
            .catch((error) => {
                console.log('Unknown Error: ', error)
            })

        rowToDelete.remove()
        $('#ModalDelete').modal('hide')
        $('#ModalDelete').attr('aria-hidden', 'true')
    })
    $('#deleteRow').on('click', function () {
        $('#ModalDelete').modal('show')
        $('#ModalDelete').attr('aria-hidden', 'false')
    })

    $('#save-tour').on('click', function (event) {
        event.preventDefault() // Ngăn gửi form mặc định

        const formData = new FormData()
        const formDataArray = $('#createtourForm').serializeArray()

        // Thêm các trường thông thường vào FormData
        formDataArray.forEach((field) => {
            formData.append(field.name, field.value)
        })

        // Kiểm tra file input
        const fileInput = $('#file')[0]
        if (!fileInput || fileInput.files.length === 0) {
            alert('No file selected!')
            return
        }
        const file = fileInput.files[0]
        formData.append('image', file) // Thêm file vào FormData

        // Validate dữ liệu
        const formDataObject = {}
        formDataArray.forEach((field) => {
            formDataObject[field.name] = field.value
        })
        formDataObject['image'] = file.name

        const { success, message } = validationTourForm(formDataObject)
        if (!success) {
            alert(message)
            return
        }
        console.log('Dữ liệu trong FormData:')
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }

        // Gửi request bằng fetch
        fetch('/admin/tour_management/add', {
            method: 'POST',
            body: formData, // FormData tự động thiết lập headers
        })
            .then((response) => {
                if (
                    response.headers
                        .get('Content-Type')
                        .includes('application/json')
                ) {
                    return response.json()
                } else {
                    return response.text()
                }
            })
            .then((data) => {
                if (typeof data === 'string') {
                    $('.tour-container').html(data)
                    $('#ModalCreate').modal('hide')
                    $('#createtourForm')[0].reset()
                } else if (!data.success) {
                    alert(data.message)
                } else {
                    alert('Unknown response')
                }
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    })

    // Ngăn form submit
    $('#createtourForm').on('submit', function (event) {
        event.preventDefault() // Ngăn gửi form
    })
    function handleFileChange(event, previewId) {
        var file = event.target.files[0]
        if (file) {
            var reader = new FileReader()
            reader.onload = function (e) {
                $(previewId).attr('src', e.target.result) // Cập nhật ảnh preview
                $(previewId).show() // Hiển thị ảnh preview
            }
            reader.readAsDataURL(file) // Đọc file và chuyển thành data URL
        }
    }

    // Áp dụng cho file input #file
    $('#file').on('change', function (event) {
        handleFileChange(event, '#previewImage') // Đảm bảo preview cho file input #file
    })

    // Áp dụng cho file input #updateFile
    $('#updateFile').on('change', function (event) {
        handleFileChange(event, '#updatePreviewImage') // Đảm bảo preview cho file input #updateFile
    })

    const modalCreate = document.getElementById('ModalCreate')

    modalCreate.addEventListener('shown.bs.modal', () => {
        document.getElementById('tourName').focus() // Focus on the first input field
    })

    modalCreate.addEventListener('hidden.bs.modal', () => {
        document.querySelector('[data-bs-target="#ModalCreate"]').focus() // Return focus to the trigger button
    })
    $('.shrink-image').on('click', function () {
        const srcImage = $('#updatePreviewImage').attr('src')
        console.log('src image: ', srcImage)

        // Mã hóa URL để xử lý khoảng trắng
        const encodedSrcImage = encodeURI(srcImage)

        $('.preview')
            .css('background-image', `url(${encodedSrcImage})`)
            .toggleClass('show-preview')
        $('.overlay').addClass('show')
    })

    $('.close-btn, .overlay').on('click', function (event) {
        event.preventDefault()
        $('.preview').removeClass('show-preview')
        $('.overlay').removeClass('show')
    })
})
