$(document).ready(function () {
    // Xóa dữ liệu lưu trong modal khi đóng modal
    $('#ModalDelete').on('hidden.bs.modal', function () {
        $(this).removeData('tour-id').removeData('row-element')
        console.log('Dữ liệu modal đã được xóa.') // Debug
    })

    // Chức năng: Check tất cả các checkbox
    $('#all').on('change', function () {
        let isChecked = $(this).prop('checked')
        $('input[name="check1"]').prop('checked', isChecked)
    })

    // Chức năng: Xóa tất cả các dòng được chọn
    $('#deleteAll').on('click', function () {
        const checkedRows = $('input[name="check1"]:checked')
        if (checkedRows.length === 0) {
            Swal.fire({
                title: 'There is no tour to delete!',
                icon: 'error',
            })
        } else {
            const listIds = []
            checkedRows.each(function () {
                listIds.push(
                    $(this).closest('tr').find('#tour-id').text().trim()
                )
            })

            // Hiển thị modal xóa nếu có dòng được chọn
            $('#ModalDeleteAll').data('ids', listIds.join(','))
            $('#ModalDeleteAll').modal('show')
        }
    })

    // Xác nhận xóa tất cả và gọi API xóa
    $('#confirmDeleteAllButton').on('click', async function () {
        const deletedIds = $('#ModalDeleteAll').data('ids').split(',')
        console.log(deletedIds)

        try {
            for (const deleteTourId of deletedIds) {
                const response = await fetch(
                    `/api/tour_management/delete_tour/${deleteTourId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const data = await response.json()
                if (data.success) {
                    $(`#tour-row-${deleteTourId}`).remove() // Xóa dòng khỏi giao diện
                } else {
                    console.error(
                        `Failed to delete tour with ID: ${deleteTourId}`
                    )
                }
            }

            console.log('Deleted Successfully')
            $('#ModalDeleteAll').modal('hide')
            Swal.fire({
                title: 'Deleted successfully!',
                icon: 'success',
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Deleted failed!',
                icon: 'error',
            })
        }
    })

    // Chức năng: Lưu thay đổi (minh họa console log)
    $('#save1').on('click', function () {
        const rowsData = []
        $('#sampleTable tbody tr').each(function () {
            const rowData = {
                maDatTour: $(this).find('td').eq(1).text().trim(),
                maTour: $(this).find('td').eq(2).text().trim(),
                tenTour: $(this).find('td').eq(3).text().trim(),
                giaTour: $(this).find('td').eq(4).text().trim(),
                tinhTrang: $(this).find('select').val(),
            }
            rowsData.push(rowData)
        })
        console.log('Saved Data:', rowsData)
        Swal.fire({
            title: 'Thay đổi đã được lưu!',
            icon: 'success',
        })
    })
})
