$(window).on('load', function () {
    // Ẩn loading khi DOM và ảnh đã tải xong
    $('#loading').hide()
    AOS.init({
        duration: 1500,
        once: true,
    })

    let prevScrollpos = window.scrollY // Initialize with scrollY
    let threshold = 50 // Set a threshold value for scroll position
    let ticking = false

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                let currentScrollPos = window.scrollY

                // If scrolling down and the scroll position is greater than threshold
                if (
                    prevScrollpos > currentScrollPos &&
                    currentScrollPos > threshold
                ) {
                    document.querySelector('header').classList.remove('hidden')
                } else if (
                    prevScrollpos < currentScrollPos &&
                    currentScrollPos > threshold
                ) {
                    document.querySelector('header').classList.add('hidden')
                }
                // Update prevScrollpos with the current scroll position
                prevScrollpos = currentScrollPos
                ticking = false
            })
            ticking = true
        }
    })
    // Logic xử lý thanh header ẩn/hiện khi cuộn trang

    // Sự kiện xử lý dropdown và tìm kiếm
    let beChanged = false

    $('.dropdown.search').on('click', '.dropdown-item', function (event) {
        event.preventDefault()
        let selectedValue = $(this).text()
        let parentOfItem = $(this).closest('.dropdown')
        let findToggleInParentOfItem = parentOfItem.find('.dropdown-toggle')

        if ($(this).hasClass('init')) {
            beChanged = true
            const dataValue = findToggleInParentOfItem.attr('data-value')
            if (dataValue !== undefined) {
                findToggleInParentOfItem.removeAttr('data-value')
                var textDefault = $(this).attr('text-default')
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
                    $('#tour-container').html(text)
                    const offset = $('#tour-container').offset().top - 90
                    $('html, body').animate(
                        {
                            scrollTop: offset,
                        },
                        0
                    )
                })
        } else {
            console.log('Nothing to search')
        }
    })
})
