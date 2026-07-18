// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })

    const filterForm = document.getElementById('listingFilterForm')
    if (filterForm) {
        const searchInput = document.getElementById('filterSearch')
        const locationSelect = document.getElementById('filterLocation')
        const priceSelect = document.getElementById('filterPrice')
        const clearButton = document.getElementById('clearFiltersBtn')
        const cards = Array.from(document.querySelectorAll('.listing-card'))
        const emptyState = document.getElementById('filterEmptyState')

        const applyFilters = () => {
            const searchValue = (searchInput?.value || '').trim().toLowerCase()
            const selectedLocation = (locationSelect?.value || '').trim().toLowerCase()
            const maxPrice = Number(priceSelect?.value || 0)
            let visibleCount = 0

            cards.forEach(card => {
                const title = card.dataset.title || ''
                const location = card.dataset.location || ''
                const price = Number(card.dataset.price || 0)
                const matchesSearch = !searchValue || title.includes(searchValue) || location.includes(searchValue)
                const matchesLocation = !selectedLocation || location === selectedLocation
                const matchesPrice = !maxPrice || price <= maxPrice
                const isVisible = matchesSearch && matchesLocation && matchesPrice

                card.style.display = isVisible ? '' : 'none'
                if (isVisible) visibleCount += 1
            })

            if (emptyState) {
                emptyState.classList.toggle('d-none', visibleCount !== 0)
            }
        }

        searchInput?.addEventListener('input', applyFilters)
        locationSelect?.addEventListener('change', applyFilters)
        priceSelect?.addEventListener('change', applyFilters)
        clearButton?.addEventListener('click', () => {
            if (searchInput) searchInput.value = ''
            if (locationSelect) locationSelect.value = ''
            if (priceSelect) priceSelect.value = ''
            applyFilters()
        })

        filterForm.addEventListener('submit', event => event.preventDefault())
        applyFilters()
    }

    // Icon bar interactions: map to keyword-based search and toggle active state
    const iconItems = Array.from(document.querySelectorAll('.icon-item'))
    if (iconItems.length) {
        iconItems.forEach(item => {
            item.addEventListener('click', () => {
                // toggle active
                const isActive = item.classList.contains('active')
                iconItems.forEach(i => i.classList.remove('active'))
                if (!isActive) item.classList.add('active')

                const keywords = isActive ? '' : (item.dataset.keywords || '')
                if (searchInput) searchInput.value = keywords
                // clear other controls when using icon quick-filter
                if (!keywords && locationSelect) locationSelect.value = ''
                if (!keywords && priceSelect) priceSelect.value = ''
                applyFilters()
            })
        })

        // Ensure clear button also clears active icon
        clearButton?.addEventListener('click', () => {
            iconItems.forEach(i => i.classList.remove('active'))
        })
    }
})()