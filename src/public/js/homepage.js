document.getElementById('btnLoadMore').addEventListener('click', function () {
    const tourContainer = document.getElementById('tour-container')
    const currentPage = parseInt(this.dataset.page || '1', 10) + 1 // Lấy trang hiện tại
    this.dataset.page = currentPage // Cập nhật số trang
    console.log('currentpage: ', currentPage)
    fetch(`/homepage?page=${currentPage}`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
        .then((response) => response.json())
        .then((data) => {
            const { tours } = data
            if (tours.length > 0) {
                tours.forEach((tour) => {
                    const tourHTML = `
                        <div class="col-md-4 mb-4 tour-item">
                            <div class="card tour-card">
                                <img src="${tour.image}" class="card-img-top" alt="${tour.tour_name}">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="tour-info">
                                            <i class="fas fa-sun"></i> ${tour.days} ngày
                                            <i class="fas fa-moon"></i> ${tour.nights} đêm
                                        </span>
                                    </div>
                                    <h5 class="tour-title">${tour.tour_name}</h5>
                                    <div class="d-flex align-items-center mb-2">
                                        ${'<i class="fas fa-star text-warning"></i>'.repeat(Math.floor(tour.rating))}
                                        ${tour.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
                                    </div>
                                    <p class="card-text">${tour.description}</p>
                                    <ul class="list-unstyled mb-3">
                                        <li><strong>Khởi hành:</strong> ${tour.departure_location}</li>
                                        <li><strong>Mã tour:</strong> ${tour.tour_code}</li>
                                    </ul>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <a href="/tour_detail/${tour.id}" class="btn btn-primary btn-sm">Chọn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                    tourContainer.insertAdjacentHTML('beforeend', tourHTML)
                })
            } else {
                document.getElementById('btnLoadMore').style.display = 'none'
            }
        })
        .catch((error) => {
            console.error('Error loading more tours:', error)
        })
})

$(window).on('load', function () {
    AOS.init({
        duration: 1000, // Set the default duration for all AOS animations
    })
    // Ẩn loading khi DOM và ảnh đã tải xong
    $('#loading').hide()
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
    document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation() // Ngăn sự kiện lan ra ngoài
            const dropdownMenu = this.nextElementSibling
            dropdownMenu.classList.toggle('show')
        })
    })

    // Đóng dropdown khi click ra ngoài
    window.addEventListener('click', function (e) {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu.show')
        dropdownMenus.forEach((menu) => {
            if (!menu.contains(e.target)) {
                menu.classList.remove('show')
            }
        })
    })

    document.querySelectorAll('.dropdown-item').forEach((item) => {
        item.addEventListener('click', function () {
            const parentDropdownMenu = this.closest('.dropdown-menu')
            parentDropdownMenu.classList.remove('show')
        })
    })

    // Đóng dropdown khi click ra ngoài
    window.addEventListener('click', function (e) {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu.show')
        dropdownMenus.forEach((menu) => {
            if (!menu.contains(e.target)) {
                menu.classList.remove('show')
            }
        })
    })

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
        $('#loading-tour').show()
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
            let url = `/search?`

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
                .catch((error) => {
                    console.error('Error:', error)
                })
                .finally(() => {
                    $('#loading-tour').hide()
                })
        } else {
            console.log('Nothing to search')
            $('#loading-tour').hide()
        }
    })

    // $('a').on('click', function(event){
    //     event.preventDefault()
    //     console.log('data-value: ', $(this).attr('href'))
    // })

    $(document)
        .on('mouseenter', '.menu-item', function () {
            $(this).css('color', 'blue')
        })
        .on('mouseleave', '.menu-item', function () {
            $(this).css('color', '') // Quay về màu mặc định
        })
})
