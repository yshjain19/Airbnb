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
        const iconItems = Array.from(document.querySelectorAll('.icon-item'))

        const applyFilters = () => {
            const searchValue = (searchInput?.value || '').trim().toLowerCase()
            const selectedLocation = (locationSelect?.value || '').trim().toLowerCase()
            const maxPrice = Number(priceSelect?.value || 0)
            
            // Get active keywords from selected category icon
            let activeKeywords = []
            const activeIcon = iconItems.find(i => i.classList.contains('active'))
            if (activeIcon) {
                const keywordsAttr = activeIcon.dataset.keywords || ''
                activeKeywords = keywordsAttr.toLowerCase().split(/\s+/).filter(Boolean)
            }

            let visibleCount = 0

            cards.forEach(card => {
                const title = (card.dataset.title || '').trim().toLowerCase()
                const location = (card.dataset.location || '').trim().toLowerCase()
                const description = (card.dataset.description || '').trim().toLowerCase()
                const price = Number(card.dataset.price || 0)

                // Match text search
                const matchesSearch = !searchValue || 
                                      title.includes(searchValue) || 
                                      location.includes(searchValue) || 
                                      description.includes(searchValue)

                // Match location selection
                const matchesLocation = !selectedLocation || location === selectedLocation

                // Match price selection
                const matchesPrice = !maxPrice || price <= maxPrice

                // Match icon keywords (at least one keyword matches description, title or location)
                let matchesIcon = true
                if (activeKeywords.length > 0) {
                    matchesIcon = activeKeywords.some(keyword => 
                        title.includes(keyword) || 
                        location.includes(keyword) || 
                        description.includes(keyword)
                    )
                }

                const isVisible = matchesSearch && matchesLocation && matchesPrice && matchesIcon

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
            iconItems.forEach(i => i.classList.remove('active'))
            applyFilters()
        })

        // Icon bar interactions: toggle active state and apply filters
        if (iconItems.length) {
            iconItems.forEach(item => {
                item.addEventListener('click', () => {
                    const isActive = item.classList.contains('active')
                    iconItems.forEach(i => i.classList.remove('active'))
                    if (!isActive) item.classList.add('active')
                    applyFilters()
                })
            })
        }

        filterForm.addEventListener('submit', event => event.preventDefault())
        applyFilters()
    }
})()