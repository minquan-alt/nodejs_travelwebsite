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
    $(document).on('click', '.deleteRow', function () {
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
                        Swal.fire({
                            title: 'Good job!',
                            text: 'Delete tour successfully!',
                            icon: 'success',
                        })
                    } else {
                        Swal.fire({
                            title: 'Oh no!',
                            text: data.message,
                            icon: 'error',
                        })
                    }
                })
                .catch((err) => {
                    console.log('Lỗi khi gửi dữ liệu: ', err)
                    Swal.fire({
                        title: 'Oh no!',
                        text: 'Having error! Please try again.',
                        icon: 'error',
                    })
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
        var customerPhone = $(this).data('customer-phone')
        var customerEmail = $(this).data('customer-email')
        var customerAddress = $(this).data('customer-address')
        var customerCountry = $(this).data('customer-country')

        // Điền dữ liệu vào các trường trong modal
        $('#editCustomerId').val(customerId)
        $('#editCustomerName').val(customerName)
        $('#editPhone').val(customerPhone)
        $('#editEmail').val(customerEmail)
        $('#editAddress').val(customerAddress)
        $('#editCountry').val(customerCountry)
    })

    $('#updateCustomer').on('click', function () {
        const updatedData = {
            full_name: $('#editCustomerName').val(),
            city: $('#editAddress').val(),
            phone: $('#editPhone').val(),
            email: $('#editEmail').val(),
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
                    Swal.fire({
                        title: 'Good job!',
                        text: 'Update customer successfully!',
                        icon: 'success',
                    })
                } else if (!data.success) {
                    alert(data.message)
                } else {
                    alert('Unknown response')
                }
            })
            .catch((err) => {
                console.log('Lỗi khi gửi dữ liệu: ', err)
                Swal.fire({
                    title: 'Oh no!',
                    text: 'Having error! Please try again.',
                    icon: 'error',
                })
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
                    Swal.fire({
                        title: 'Good job!',
                        text: 'Add customer successfully!',
                        icon: 'success',
                    })
                    this.reset()
                } else if (!data.success) {
                    Swal.fire({
                        title: 'Oh no!',
                        text: data.message,
                        icon: 'error',
                    })
                } else {
                    Swal.fire({
                        title: 'Oh no!',
                        text: 'Unknown error.',
                        icon: 'error',
                    })
                }
            })
            .catch((err) => {
                console.log('Lỗi khi gửi dữ liệu: ', err)
                Swal.fire({
                    title: 'Oh no!',
                    text: 'Having error! Please try again.',
                    icon: 'error',
                })
            })
    })
})
