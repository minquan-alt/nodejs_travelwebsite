let threshold = 5 // Độ cao ngưỡng
let lastScrollTop = 0
const header = document.querySelector('header')

window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop

    if (currentScroll > threshold && currentScroll > lastScrollTop) {
        header.classList.add('hidden')
    } else if (
        currentScroll < lastScrollTop &&
        currentScroll < lastScrollTop - threshold
    ) {
        header.classList.remove('hidden')
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
})
$('document').ready(function () {
    let beChanged = false
    $('.dropdown.search').on('click', '.dropdown-item', function (event) {
        event.preventDefault()
        console.log('Chứa init không: ', $(this).hasClass('init'))
        console.log('Chứa data-value không: ', $(this).attr('data-value'))

        let selectedValue = $(this).text()
        let parentOfItem = $(this).closest('.dropdown')
        let findToggleInParentOfItem = parentOfItem.find('.dropdown-toggle')

        if ($(this).hasClass('init')) {
            beChanged = true
            const dataValue = findToggleInParentOfItem.attr('data-value')
            if (dataValue !== undefined) {
                findToggleInParentOfItem.removeAttr('data-value')
                var textDefault = $(this).attr('text-default')
                console.log(textDefault)
                findToggleInParentOfItem.text(textDefault)
            }
            return
        }

        findToggleInParentOfItem
            .text(selectedValue)
            .attr('data-value', selectedValue)
    })

    $('#btnSearch').click(function (event) {
        event.preventDefault()
        const searchParams = {
            departure_location: $('#destinationDropdown').attr('data-value'),
            month: $('#seasonDropdown').attr('data-value'),
            type: $('#tourDropdown').attr('data-value'),
        }

        if (
            searchParams.departure_location ||
            searchParams.month ||
            searchParams.type ||
            beChanged
        ) {
            let url = '/search?'

            Object.keys(searchParams).forEach((key) => {
                url += `${key}=${searchParams[key]}&`
            })
            url = url.endsWith('&') ? url.slice(0, -1) : url
            console.log(url)
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.text())
                .then((text) => {
                    console.log(text)
                    // if (data.success) {
                    // console.log('Tours Data:', data.tours)
                    $('#tour-container').html(text)
                    const offset = $('#tour-container').offset().top - 90
                    $('html, body').animate(
                        {
                            scrollTop: offset,
                        },
                        0
                    )
                    // document.getElementById('tour-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // } else {
                    // console.log('Failure')
                    // }
                })
        } else {
            console.log('Nothing to search')
        }
    })
})
