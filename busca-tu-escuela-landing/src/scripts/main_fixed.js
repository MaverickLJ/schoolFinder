class SchoolFinderApp {
  constructor() {
    this.locationData = [
      'San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas', 'Guaynabo', 
      'Mayagüez', 'Trujillo Alto', 'Arecibo', 'Toa Baja', 'Toa Alta', 
      'Aguadilla', 'Humacao', 'Cayey', 'Manatí', 'Vega Baja', 'Dorado',
      'Fajardo', 'Yauco', 'Juana Díaz', 'Cidra', 'Gurabo', 'Coamo',
      'San Germán', 'Cabo Rojo', 'Isabela', 'Camuy', 'Hatillo',
      'San Lorenzo', 'Las Piedras', 'Canóvanas', 'Luquillo'
    ];

    this.currentValue = '';
    this.highlightedIndex = -1;
    this.filteredOptions = [];

    this.init();
  }
  
  init() {
    this.setupNavbar();
    this.setupSearchForm();
    this.setupLocationCombobox();
    this.setupEventListeners();
    this.updateYear();
  }

  setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Search button
    const searchBtn = document.getElementById('btnSearch');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.handleSearch());
    }

    // CTA buttons
    const btnNear = document.getElementById('btnNear');
    const btnFav = document.getElementById('btnFav');
    const btnTest = document.getElementById('btnTest');

    if (btnNear) btnNear.addEventListener('click', () => this.handleNearbySearch());
    if (btnFav) btnFav.addEventListener('click', () => this.handleFavorites());
    if (btnTest) btnTest.addEventListener('click', () => this.handleTest());
  }

  updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
  }

  setupNavbar() {
    // Navbar scroll effect is handled in setupEventListeners
  }

  setupSearchForm() {
    const searchBtn = document.querySelector('.search-btn');
    const schoolInput = document.querySelector('.school-input');
    
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.handleSearch());
    }
    
    if (schoolInput) {
      schoolInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSearch();
        }
      });
    }
  }

  setupLocationCombobox() {
    this.locationInput = document.getElementById('locationInput');
    this.locationDropdown = document.getElementById('locationDropdown');
    this.locationOptions = document.getElementById('locationOptions');
    
    if (!this.locationInput || !this.locationDropdown || !this.locationOptions) {
      console.error('Location combobox elements not found');
      return;
    }

    // Initialize filtered options with all locations
    this.filteredOptions = [...this.locationData];

    // Event listeners
    this.locationInput.addEventListener('input', (e) => this.handleInputChange(e));
    this.locationInput.addEventListener('focus', () => this.showDropdown());
    this.locationInput.addEventListener('click', () => this.showDropdown());
    this.locationInput.addEventListener('blur', () => this.hideDropdown());
    this.locationInput.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
    
    // Initialize options display
    this.updateOptions();
    
    console.log('Location combobox initialized with', this.locationData.length, 'municipalities');
  }

  handleInputChange(e) {
    const value = e.target.value.toLowerCase().trim();
    console.log('Input changed:', value);
    
    if (value === '') {
      // If empty, show all options
      this.filteredOptions = [...this.locationData];
    } else {
      // Filter based on input
      this.filteredOptions = this.locationData.filter(location => 
        location.toLowerCase().includes(value)
      );
    }
    
    console.log('Filtered options:', this.filteredOptions.length, 'found');
    this.highlightedIndex = -1;
    this.updateOptions();
    this.showDropdown();
  }

  showDropdown() {
    if (!this.locationDropdown) return;
    
    // Make sure we have options to show
    if (this.filteredOptions.length === 0 && this.locationInput.value.trim() === '') {
      this.filteredOptions = [...this.locationData];
      this.updateOptions();
    }
    
    this.locationDropdown.classList.add('show');
    this.locationInput.setAttribute('aria-expanded', 'true');
  }

  hideDropdown() {
    if (!this.locationDropdown) return;
    setTimeout(() => {
      this.locationDropdown.classList.remove('show');
      this.locationInput.setAttribute('aria-expanded', 'false');
    }, 150);
  }

  handleKeyNavigation(e) {
    const options = this.filteredOptions;
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, options.length - 1);
        this.updateHighlight();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        this.updateHighlight();
        break;
        
      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < options.length) {
          this.selectOption(options[this.highlightedIndex]);
        }
        break;
        
      case 'Escape':
        this.hideDropdown();
        this.locationInput.blur();
        break;
    }
  }

  updateOptions() {
    if (!this.locationOptions) return;
    
    if (this.filteredOptions.length === 0) {
      this.locationOptions.innerHTML = '<div class="location-no-results">No se encontraron municipios</div>';
      return;
    }

    this.locationOptions.innerHTML = this.filteredOptions
      .map((location, index) => `
        <div class="location-option" data-index="${index}" data-value="${location}">
          ${location}
        </div>
      `).join('');

    // Add click listeners
    this.locationOptions.querySelectorAll('.location-option').forEach(option => {
      option.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.selectOption(option.dataset.value);
      });
      
      option.addEventListener('mouseenter', () => {
        this.highlightedIndex = parseInt(option.dataset.index);
        this.updateHighlight();
      });
    });
  }

  updateHighlight() {
    const options = this.locationOptions.querySelectorAll('.location-option');
    options.forEach((option, index) => {
      option.classList.toggle('highlighted', index === this.highlightedIndex);
    });
  }

  selectOption(value) {
    this.currentValue = value;
    this.locationInput.value = value;
    this.hideDropdown();
    this.locationInput.blur();
  }

  handleSearch() {
    const schoolQuery = document.querySelector('.school-input')?.value || '';
    const location = this.currentValue || this.locationInput?.value || '';
    
    if (!schoolQuery.trim() && !location.trim()) {
      this.showNotification('Por favor ingresa el nombre de una escuela o selecciona un municipio', 'warning');
      return;
    }

    this.showLoading();
    this.navigateToResults(schoolQuery, location, 'search');
  }

  handleNearbySearch() {
    this.showLoading('Buscando tu ubicación...');
    
    if (!navigator.geolocation) {
      this.hideLoading();
      this.showNotification('Tu navegador no soporta geolocalización', 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.hideLoading();
        this.navigateToResults('', `${position.coords.latitude},${position.coords.longitude}`, 'nearby');
      },
      (error) => {
        this.hideLoading();
        this.showNotification('No se pudo obtener tu ubicación. Por favor permite el acceso a la ubicación.', 'error');
      }
    );
  }

  handleFavorites() {
    this.showLoading('Cargando escuelas favoritas...');
    this.navigateToResults('', '', 'favorites');
  }

  handleTest() {
    this.showLoading('Preparando test de personalización...');
    setTimeout(() => {
      this.hideLoading();
      this.showNotification('Funcionalidad en desarrollo', 'info');
    }, 1500);
  }

  navigateToResults(query = '', location = '', type = 'search') {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    
    setTimeout(() => {
      window.location.href = `result.html?${params.toString()}`;
    }, 1000);
  }

  showLoading(message = 'Buscando escuelas...') {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'globalLoader';
      loader.innerHTML = `
        <div class="loader-backdrop">
          <div class="loader-content">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <p class="mb-0">${message}</p>
          </div>
        </div>
      `;
      document.body.appendChild(loader);
    }
    loader.style.display = 'block';
  }

  hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SchoolFinderApp();
});