$(document).ready(function () {
    $('#confirmDeleteButton').on('click', function () {
        rowToDelete = $('#deleteRow').closest('tr')
        rowToDelete.remove()
        $('#ModalDelete').modal('hide')
    })
    $('#deleteRow').on('click', function () {
        $('#ModalDelete').modal('show')
    })
})
