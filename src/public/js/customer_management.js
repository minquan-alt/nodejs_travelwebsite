$(document).ready(function () {
    $('#all').on('change', function () {
        $('input[name="check1[]"').prop('checked', $(this).prop('checked'))
    })

    $('#deleteAll').on('click', function (event) {
        const selectedIds = $('input[name="check1[]"]:checked')
            .map(function () {
                return $(this).val()
            })
            .get()
        // .get: chuyển từ jquery object qua mảng
        console.log(selectedIds)
        if (selectedIds.length === 0) {
            alert('Vui lòng chọn ít nhất một khách hàng để xóa.')
            return
        }
        $('#ModalDeleteAll').modal('show')
        $('#confirmDeleteAllButton')
            .off('click')
            .on('click', function () {
                fetch('admin/customer_management/delete_all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedIds),
                })
                    .then((response) => {
                        if (
                            response.headers
                                .get('Content-Type')
                                .includes('application/json')
                        ) {
                            // Nếu server trả về JSON, xử lý dữ liệu JSON
                            return response.json()
                        } else {
                            // Nếu server trả về text, xử lý dưới dạng văn bản
                            return response.text()
                        }
                    })
                    .then((data) => {
                        if (typeof data === 'string') {
                            $('.customer-container').html(data)
                        } else if (!data.success) {
                            if (data.data.length === 0) {
                                $('.customer-container').html(data)
                            } else {
                                alert('Undefined error')
                            }
                        } else {
                            alert('Unknown response')
                        }
                    })
                    .catch((err) => {
                        console.log('Lỗi khi gửi dữ liệu: ', err)
                        alert('Có lỗi xảy ra! Vui lòng thử lại.')
                    })

                    .finally(() => {
                        $('#all').prop('checked', false)
                        $('#ModalDeleteAll').modal('hide')
                    })
                // xu li response tu server
            })
    })
    // Xử lí xoá
    $('.deleteRow').on('click', function () {
        const deleteCustomerId = $(this).data('customer-id') // Lấy customer ID từ nút
        const deleteRowElement = $(this).closest('tr') // Lấy hàng <tr> tương ứng

        // Kiểm tra dữ liệu trước khi lưu vào modal
        if (deleteCustomerId) {
            $('#ModalDelete').data('customer-id', deleteCustomerId)
            $('#ModalDelete').data('row-element', deleteRowElement)
        } else {
            console.error('Không tìm thấy customer-id.')
        }
    })

    $('#confirmDeleteButton').on('click', function () {
        let deleteCustomerId = $('#ModalDelete').data('customer-id')
        let deleteRowElement = $('#ModalDelete').data('row-element')

        if (deleteCustomerId) {
            fetch(`admin/customer_management/delete/${deleteCustomerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        deleteRowElement.remove()
                    } else {
                        alert(data.message)
                    }
                })
                .catch((err) => {
                    console.log('Lỗi khi gửi dữ liệu: ', err)
                    alert('Có lỗi xảy ra! Vui lòng thử lại.')
                })
                .finally(() => {
                    // Dọn dẹp modal và ID
                    $('#ModalDelete').modal('hide')
                })
        } else {
            console.log('Không tìm thấy customer-id')
        }
    })
    $('#ModalDelete').on('hidden.bs.modal', function () {
        // Xóa dữ liệu lưu trong modal
        $(this).removeData('customer-id').removeData('row-element')
        console.log('Dữ liệu modal đã được xóa.') // Debug
    })
    // Xử lí sửa đổi
    $(document).on('click', '.edit', function () {
        var customerId = $(this).data('customer-id')
        var customerName = $(this).data('customer-name')
        var customerGender = $(this).data('customer-gender')
        var customerDob = $(this).data('customer-dob')
        var customerPhone = $(this).data('customer-phone')
        var customerEmail = $(this).data('customer-email')
        var customerAddress = $(this).data('customer-address')
        var customerCountry = $(this).data('customer-country')

        const dateParts = customerDob.split('/') // Tách giá trị ngày
        const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}` // Định dạng lại
        // Điền dữ liệu vào các trường trong modal
        console.log('dob in form: ', $(this).data('customer-dob'))
        $('#editCustomerId').val(customerId)
        $('#editCustomerName').val(customerName)
        $('#editGender').val(customerGender)
        $('#editDob').val(formattedDate)
        $('#editPhone').val(customerPhone)
        $('#editEmail').val(customerEmail)
        $('#editAddress').val(customerAddress)
        $('#editCountry').val(customerCountry)

        console.log('dob in modal: ', $('#editDob').val())
    })

    $('#updateCustomer').on('click', function () {
        const updatedData = {
            full_name: $('#editCustomerName').val(),
            gender: $('#editGender').val(),
            city: $('#editAddress').val(),
            phone: $('#editPhone').val(),
            email: $('#editEmail').val(),
            dob: $('#editDob').val(),
            country: $('#editCountry').val(),
        }
        console.log(updatedData.dob)
        fetch(
            `admin/customer_management/update/${$('#editCustomerId').val()}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            }
        )
            .then((response) => {
                if (
                    response.headers
                        .get('Content-Type')
                        .includes('application/json')
                ) {
                    // Nếu server trả về JSON, xử lý dữ liệu JSON
                    return response.json()
                } else {
                    // Nếu server trả về text, xử lý dưới dạng văn bản
                    return response.text()
                }
            })
            .then((data) => {
                if (typeof data === 'string') {
                    $('.customer-container').html(data)
                    $('#ModalUpdate').modal('hide')
                } else if (!data.success) {
                    alert(data.message)
                } else {
                    alert('Unknown response')
                }
            })
            .catch((err) => {
                console.log('Lỗi khi gửi dữ liệu: ', err)
                alert('Có lỗi xảy ra! Vui lòng thử lại.')
            })
    })

    $('#createCustomerForm').on('submit', function (event) {
        event.preventDefault()
        const formData = $(this).serializeArray() // Thu thập dữ liệu từ form
        let data = {}
        // Chuyển đổi dữ liệu từ dạng array sang object
        formData.forEach((field) => {
            data[field.name] = field.value
        })
        console.log('Dữ liệu được gửi:', data)
        fetch('admin/customer_management/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (
                    response.headers
                        .get('Content-Type')
                        .includes('application/json')
                ) {
                    // Nếu server trả về JSON, xử lý dữ liệu JSON
                    return response.json()
                } else {
                    // Nếu server trả về text, xử lý dưới dạng văn bản
                    return response.text()
                }
            })
            .then((data) => {
                if (typeof data === 'string') {
                    $('.customer-container').html(data)
                    $('#ModalCreate').modal('hide')
                    this.reset()
                } else if (!data.success) {
                    alert(data.message)
                } else {
                    alert('Unknown response')
                }
            })
            .catch((err) => {
                console.log('Lỗi khi gửi dữ liệu: ', err)
                alert('Có lỗi xảy ra! Vui lòng thử lại.')
            })
    })
})
