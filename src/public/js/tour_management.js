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
    $(document).on('click', '#basicEdit', function () {
        const row = $(this).closest('tr')
        const tour_id = row.find('td').eq(1).text().trim()
        const tour_name = row.find('td').eq(3).text().trim()
        const time_go_str = row.find('td').eq(4).text().trim()
        const time_back_str = row.find('td').eq(5).text().trim()
        const status = row.find('td').eq(6).text().trim()
        const max_quantity_of_people = row.find('td').eq(7).text().trim()
        const original_price = row.find('td').eq(8).text().trim()
        const discounted_price = row.find('td').eq(9).text().trim()

        const time_go = stringDate(time_go_str)
        const time_back = stringDate(time_back_str)

        $('#basicTourId').val(tour_id)
        $('#basicTourName').val(tour_name)
        $('#basicTimeGo').val(time_go)
        $('#basicTimeBack').val(time_back)
        $('#basicStatus').val(status)
        $('#basicMaxQuantity').val(max_quantity_of_people)
        $('#basicOriginalPrice').val(original_price)
        $('#basicDiscountedPrice').val(discounted_price)

        $('#basicEditModal').modal('show')
    })

    $(document).on('click', '#detailEdit', function () {
        $('#basicEditModal').modal('hide')
        const id = $('#basicTourId').val()
        fetch(`/api/tour_management/get_one_tour/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const [tourData] = data.data
                    const initialValues = {
                        tour_name: tourData.tour_name,
                        description: tourData.description,
                        days: tourData.days,
                        nights: tourData.nights,
                        rating: tourData.rating,
                        departure_location: tourData.departure_location,
                        tour_code: tourData.tour_code,
                        original_price: tourData.original_price,
                        discounted_price: tourData.discounted_price,
                        is_featured: tourData.is_featured,
                        is_active: tourData.is_active,
                        type: tourData.type,
                        nation: tourData.nation,
                        max_quantity_of_people: tourData.max_quantity_of_people,
                        time_go: tourData.time_go,
                        time_back: tourData.time_back,
                        status: tourData.status,
                        image: tourData.image,
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
                    $('#updateIsFeatured').prop(
                        'checked',
                        tourData.is_featured == 1
                    ) // Featured (Checkbox)
                    $('#updateIsActive').prop(
                        'checked',
                        tourData.is_active == 1
                    ) // Active (Checkbox)
                    $('#updateType').val(tourData.type) // Type
                    $('#updateNation').val(tourData.nation) // Nation
                    $('#updateMaxQuantity').val(tourData.max_quantity_of_people) // Max Quantity of People
                    $('#updateTimeGo').val(dateToFormat(tourData.time_go)) // Time Go
                    $('#updateTimeBack').val(dateToFormat(tourData.time_back)) // Time Back
                    $('#updateStatus').val(tourData.status) // Status
                    $('#updatePreviewImage').attr('src', tourData.image) // Hiển thị hình ảnh

                    let updatedData = {}

                    // So sánh và lưu lại giá trị thay đổi
                    $('#updateName').on('input', function () {
                        if ($(this).val() !== initialValues.tour_name) {
                            updatedData.tour_name = $(this).val()
                        } else {
                            delete updatedData.tour_name
                        }
                    })

                    $('#updateDescription').on('input', function () {
                        if ($(this).val() !== initialValues.description) {
                            updatedData.description = $(this).val()
                        } else {
                            delete updatedData.description
                        }
                    })

                    $('#updateDays').on('input', function () {
                        if ($(this).val() !== initialValues.days) {
                            updatedData.days = $(this).val()
                        } else {
                            delete updatedData.days
                        }
                    })

                    $('#updateNights').on('input', function () {
                        if ($(this).val() !== initialValues.nights) {
                            updatedData.nights = $(this).val()
                        } else {
                            delete updatedData.nights
                        }
                    })

                    $('#updateRating').on('input', function () {
                        if ($(this).val() !== initialValues.rating) {
                            updatedData.rating = $(this).val()
                        } else {
                            delete updatedData.rating
                        }
                    })

                    $('#updateDepartureLocation').on('input', function () {
                        if (
                            $(this).val() !== initialValues.departure_location
                        ) {
                            updatedData.departure_location = $(this).val()
                        } else {
                            delete updatedData.departure_location
                        }
                    })

                    $('#updateTourCode').on('input', function () {
                        if ($(this).val() !== initialValues.tour_code) {
                            updatedData.tour_code = $(this).val()
                        } else {
                            delete updatedData.tour_code
                        }
                    })

                    $('#updateOriginalPrice').on('input', function () {
                        if ($(this).val() !== initialValues.original_price) {
                            updatedData.original_price = $(this).val()
                        } else {
                            delete updatedData.original_price
                        }
                    })

                    $('#updateDiscountedPrice').on('input', function () {
                        if ($(this).val() !== initialValues.discounted_price) {
                            updatedData.discounted_price = $(this).val()
                        } else {
                            delete updatedData.discounted_price
                        }
                    })

                    $('#updateIsFeatured').on('change', function () {
                        if (
                            $(this).prop('checked') !==
                            initialValues.is_featured
                        ) {
                            updatedData.is_featured = $(this).prop('checked')
                                ? 1
                                : 0
                        } else {
                            delete updatedData.is_featured
                        }
                    })

                    $('#updateIsActive').on('change', function () {
                        if (
                            $(this).prop('checked') !== initialValues.is_active
                        ) {
                            updatedData.is_active = $(this).prop('checked')
                                ? 1
                                : 0
                        } else {
                            delete updatedData.is_active
                        }
                    })

                    $('#updateType').on('input', function () {
                        if ($(this).val() !== initialValues.type) {
                            updatedData.type = $(this).val()
                        } else {
                            delete updatedData.type
                        }
                    })

                    $('#updateNation').on('input', function () {
                        if ($(this).val() !== initialValues.nation) {
                            updatedData.nation = $(this).val()
                        } else {
                            delete updatedData.nation
                        }
                    })

                    $('#updateMaxQuantity').on('input', function () {
                        if (
                            $(this).val() !==
                            initialValues.max_quantity_of_people
                        ) {
                            updatedData.max_quantity_of_people = $(this).val()
                        } else {
                            delete updatedData.max_quantity_of_people
                        }
                    })

                    $('#updateTimeGo').on('input', function () {
                        if ($(this).val() !== initialValues.time_go) {
                            updatedData.time_go = $(this).val()
                        } else {
                            delete updatedData.time_go
                        }
                    })

                    $('#updateTimeBack').on('input', function () {
                        if ($(this).val() !== initialValues.time_back) {
                            updatedData.time_back = $(this).val()
                        } else {
                            delete updatedData.time_back
                        }
                    })

                    $('#updateStatus').on('input', function () {
                        if ($(this).val() !== initialValues.status) {
                            updatedData.status = $(this).val()
                        } else {
                            delete updatedData.status
                        }
                    })

                    // Gửi yêu cầu cập nhật nếu có thay đổi
                    function updateTourData() {
                        if (Object.keys(updatedData).length > 0) {
                            fetch('/api/update_tour', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(updatedData),
                            })
                                .then((response) => response.json())
                                .then((responseData) => {
                                    console.log(
                                        'Update successful:',
                                        responseData
                                    )
                                })
                                .catch((error) => {
                                    console.error('Error updating tour:', error)
                                })
                        } else {
                            console.log('No changes detected.')
                        }
                    }
                    $('#updateForm').on('submit', function (e) {
                        e.preventDefault()
                        updateTourData()
                    })
                } else {
                    console.log(data.message)
                }
            })
        $('#ModalUpdate').modal('show')
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
                    $('#createtourForm').reset()
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
    $('#file').on('change', function (event) {
        var file = event.target.files[0]
        if (file) {
            var reader = new FileReader()
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result)
                $('#previewImage').show() // Show the preview image after loading
            }
            reader.readAsDataURL(file)
        }
    })

    // Open modal with full image when the preview image is clicked
    $('#previewImage').on('click', function () {
        var fullImageSrc = $(this).attr('src') // Get the src of the preview image
        $('#modalImage').attr('src', fullImageSrc) // Set the src in the modal
        $('#fullImageModal').modal('show') // Show the modal
    })

    const modalCreate = document.getElementById('ModalCreate')

    modalCreate.addEventListener('shown.bs.modal', () => {
        document.getElementById('tourName').focus() // Focus on the first input field
    })

    modalCreate.addEventListener('hidden.bs.modal', () => {
        document.querySelector('[data-bs-target="#ModalCreate"]').focus() // Return focus to the trigger button
    })
})
