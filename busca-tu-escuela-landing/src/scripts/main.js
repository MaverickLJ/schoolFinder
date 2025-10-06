/**
 * SchoolFinder Landing Page - Main JavaScript
 * Handles search functionality, geolocation, and user interactions
 */

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

    this.currentValue = 'Municipio';
    this.highlightedIndex = -1;
    this.filteredOptions = [];

    this.init();
  }
  
  init() {
    this.setupNavbar();
    this.setupSearchForm();
    this.setupLocationCombobox();
    this.setupLanguageSelector();
    this.setupInteractiveMap();
    this.setupEventListeners();
    this.updateYear();
    this.requestLocationPermission();
  }

  setupLanguageSelector() {
    const languageItems = document.querySelectorAll('.language-item');
    const languageBtn = document.getElementById('languageDropdown');

    if (!languageBtn || languageItems.length === 0) {
      console.log('Language selector elements not found');
      return;
    }

    // Handle language selection
    languageItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const selectedLang = item.dataset.lang;
        const flagElement = item.querySelector('.flag-icon');
        const langName = item.querySelector('.lang-name').textContent;
        const langCode = selectedLang.toUpperCase();
        
        // Update active state
        languageItems.forEach(opt => opt.classList.remove('active'));
        item.classList.add('active');
        
        // Update button display
        const btnFlag = languageBtn.querySelector('.flag-icon');
        const btnText = languageBtn.querySelector('.lang-text');
        
        if (btnFlag && btnText && flagElement) {
          // Clone the SVG flag
          const newFlag = flagElement.cloneNode(true);
          btnFlag.parentNode.replaceChild(newFlag, btnFlag);
          btnText.textContent = langCode;
        }
        
        // Show notification
        this.showNotification(`Idioma cambiado a ${langName}`, 'success');
        
        console.log('Language changed to:', selectedLang);
      });
    });

    console.log('Language selector initialized with Bootstrap dropdown');
  }

  setupInteractiveMap() {
    console.log('Starting setupInteractiveMap...');
    
    const mapContainer = document.getElementById('schoolMap');
    const locateMeBtn = document.getElementById('locateMe');
    const schoolTypeFilter = document.getElementById('schoolTypeFilter');
    const distanceFilter = document.getElementById('distanceFilter');
    const schoolsList = document.getElementById('nearbySchoolsList');
    const schoolCount = document.getElementById('schoolCount');

    console.log('Map container found:', !!mapContainer);
    console.log('Other elements found:', {
      locateMe: !!locateMeBtn,
      typeFilter: !!schoolTypeFilter,
      distanceFilter: !!distanceFilter,
      schoolsList: !!schoolsList,
      schoolCount: !!schoolCount
    });

    if (!mapContainer) {
      console.error('Map container not found - ID: schoolMap');
      return;
    }

    // Sample school data for Puerto Rico
    this.sampleSchools = [
      { name: "Escuela Elemental José de Diego", type: "elementary", lat: 18.466065, lng: -66.105755, distance: "0.5 km", municipality: "San Juan" },
      { name: "Escuela Intermedia Juan Ponce de León", type: "intermediate", lat: 18.468195, lng: -66.116596, distance: "1.2 km", municipality: "San Juan" },
      { name: "Escuela Superior Central", type: "high", lat: 18.464585, lng: -66.117240, distance: "1.8 km", municipality: "San Juan" },
      { name: "Colegio San José", type: "k12", lat: 18.457291, lng: -66.079611, distance: "2.1 km", municipality: "San Juan" },
      { name: "Escuela Elemental Rafael Hernández", type: "elementary", lat: 18.445291, lng: -66.099611, distance: "2.8 km", municipality: "Guaynabo" },
      { name: "Escuela Superior Ramón Power y Giralt", type: "high", lat: 18.475291, lng: -66.089611, distance: "3.2 km", municipality: "San Juan" }
    ];

    // Initialize filtered schools immediately
    this.filteredSchools = [...this.sampleSchools];

    // Setup event listeners
    if (locateMeBtn) {
      locateMeBtn.addEventListener('click', () => this.locateUser());
    }

    if (schoolTypeFilter) {
      schoolTypeFilter.addEventListener('change', () => this.filterSchools());
    }

    if (distanceFilter) {
      distanceFilter.addEventListener('change', () => this.filterSchools());
    }

    // Initialize the map simulation immediately - no delay
    this.initializeMapSimulation();
    
    console.log('Interactive map initialized');
  }

  initializeMapSimulation() {
    console.log('Initializing map simulation...');
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    console.log('Map placeholder found:', !!mapPlaceholder);
    
    if (!mapPlaceholder) {
      console.error('Map placeholder not found');
      return;
    }

    // Initialize filtered schools with all schools
    this.filteredSchools = [...this.sampleSchools];
    console.log('Schools initialized:', this.filteredSchools.length);
    
    // Load map immediately - no timeout
    console.log('Loading map content...');
    
    mapPlaceholder.innerHTML = `
      <div class="simulated-map">
        <div class="map-pins">
          <div class="map-pin pin-1" style="top: 25%; left: 45%;" data-school="0">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin pin-2" style="top: 35%; left: 55%;" data-school="1">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin pin-3" style="top: 45%; left: 40%;" data-school="2">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin pin-4" style="top: 55%; left: 65%;" data-school="3">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin pin-5" style="top: 30%; left: 70%;" data-school="4">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin pin-6" style="top: 40%; left: 30%;" data-school="5">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="user-location" style="top: 40%; left: 50%;">
            <i class="bi bi-person-fill"></i>
          </div>
        </div>
      </div>
    `;

    console.log('Map HTML loaded, adding event listeners...');

    // Add pin click handlers
    const pins = document.querySelectorAll('.map-pin');
    console.log('Found pins:', pins.length);
    
    pins.forEach((pin, index) => {
      pin.addEventListener('click', (e) => {
        const schoolIndex = parseInt(e.currentTarget.dataset.school);
        console.log('Pin clicked:', schoolIndex);
        this.highlightSchool(schoolIndex);
      });
    });

    // Update schools list and count
    this.updateSchoolsList();
    
    console.log('Map simulation loaded successfully');
  }

  filterSchools() {
    const typeFilter = document.getElementById('schoolTypeFilter')?.value || 'all';
    const distanceFilter = document.getElementById('distanceFilter')?.value || '10';
    
    let filteredSchools = this.sampleSchools;
    
    if (typeFilter !== 'all') {
      filteredSchools = filteredSchools.filter(school => school.type === typeFilter);
    }
    
    // Simple distance filtering (in a real app, this would be more sophisticated)
    const maxDistance = parseInt(distanceFilter);
    if (maxDistance < 50) {
      filteredSchools = filteredSchools.filter(school => {
        const distance = parseFloat(school.distance);
        return distance <= maxDistance;
      });
    }

    this.filteredSchools = filteredSchools;
    this.updateSchoolsList();
    this.updateMapPins();
  }

  updateSchoolsList() {
    const schoolsList = document.getElementById('nearbySchoolsList');
    const schoolCount = document.getElementById('schoolCount');
    const schools = this.filteredSchools || this.sampleSchools || [];
    
    console.log('Updating schools list with', schools.length, 'schools');
    
    // Update school count with better styling
    const resultsInfo = document.querySelector('.results-info');
    const schoolCountLabel = document.getElementById('schoolCountLabel');
    
    if (schoolCount) {
      schoolCount.textContent = schools.length;
      
      if (resultsInfo) {
        if (schools.length === 0) {
          resultsInfo.classList.add('no-results');
          resultsInfo.classList.remove('has-results');
          if (schoolCountLabel) {
            schoolCountLabel.textContent = 'escuelas en esta área';
          }
        } else {
          resultsInfo.classList.add('has-results');
          resultsInfo.classList.remove('no-results');
          if (schoolCountLabel) {
            schoolCountLabel.textContent = schools.length === 1 ? 'escuela encontrada' : 'escuelas encontradas';
          }
        }
      }
    }
    
    if (schoolsList) {
      if (schools.length === 0) {
        schoolsList.innerHTML = `
          <div class="text-center py-4 text-muted">
            <i class="bi bi-geo-alt mb-3 d-block" style="font-size: 2.5rem; color: var(--primary-400);"></i>
            <h6 class="mb-2" style="color: var(--neutral-600);">No hay escuelas en esta área</h6>
            <p class="mb-0 small" style="color: var(--neutral-500);">Prueba ajustando tu ubicación o filtros de búsqueda</p>
          </div>
        `;
        return;
      }
      
      schoolsList.innerHTML = schools.slice(0, 3).map((school, index) => `
        <div class="school-item" data-school-index="${index}">
          <div class="school-info">
            <div class="school-name">${school.name}</div>
            <div class="school-details">${this.getSchoolTypeText(school.type)} • ${school.municipality}</div>
          </div>
          <div class="school-distance">${school.distance}</div>
        </div>
      `).join('');

      // Add click handlers
      schoolsList.querySelectorAll('.school-item').forEach((item, index) => {
        item.addEventListener('click', () => this.highlightSchool(index));
      });
    }
  }

  updateMapPins() {
    const pins = document.querySelectorAll('.map-pin');
    const schools = this.filteredSchools || this.sampleSchools;
    
    pins.forEach((pin, index) => {
      if (index < schools.length) {
        pin.style.display = 'block';
        pin.classList.remove('filtered-out');
      } else {
        pin.style.display = 'none';
        pin.classList.add('filtered-out');
      }
    });
  }

  highlightSchool(index) {
    // Remove previous highlights
    document.querySelectorAll('.map-pin, .school-item').forEach(el => {
      el.classList.remove('highlighted');
    });

    // Highlight selected school
    const pin = document.querySelector(`[data-school="${index}"]`);
    const schoolItem = document.querySelector(`[data-school-index="${index}"]`);
    
    if (pin) pin.classList.add('highlighted');
    if (schoolItem) schoolItem.classList.add('highlighted');

    // Show school info
    const schools = this.filteredSchools || this.sampleSchools;
    if (schools[index]) {
      this.showNotification(`Mostrando ${schools[index].name}`, 'info');
    }
  }

  getSchoolTypeText(type) {
    const types = {
      'elementary': 'Elemental',
      'intermediate': 'Intermedia', 
      'high': 'Superior',
      'k12': 'K-12'
    };
    return types[type] || type;
  }

  locateUser() {
    const locateBtn = document.getElementById('locateMe');
    
    if (locateBtn) {
      locateBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin me-1"></i>Ubicando...';
      locateBtn.disabled = true;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (locateBtn) {
            locateBtn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Ubicado';
            setTimeout(() => {
              locateBtn.innerHTML = '<i class="bi bi-crosshair me-1"></i>Mi ubicación';
              locateBtn.disabled = false;
            }, 2000);
          }
          
          this.showNotification('Ubicación actualizada correctamente', 'success');
          
          // Update user location on map
          const userPin = document.querySelector('.user-location');
          if (userPin) {
            userPin.classList.add('located');
          }
        },
        (error) => {
          if (locateBtn) {
            locateBtn.innerHTML = '<i class="bi bi-crosshair me-1"></i>Mi ubicación';
            locateBtn.disabled = false;
          }
          this.showNotification('No se pudo obtener tu ubicación', 'error');
        }
      );
    } else {
      if (locateBtn) {
        locateBtn.innerHTML = '<i class="bi bi-crosshair me-1"></i>Mi ubicación';
        locateBtn.disabled = false;
      }
      this.showNotification('Geolocalización no disponible', 'error');
    }
  }

  setupEventListeners() {
    // Search functionality
    document.getElementById('btnSearch')?.addEventListener('click', () => this.handleSearch());
    document.getElementById('q')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });

    // CTA buttons
    document.getElementById('btnNear')?.addEventListener('click', () => this.handleNearbySearch());
    document.getElementById('btnFav')?.addEventListener('click', () => this.handleFavorites());
    document.getElementById('btnTest')?.addEventListener('click', () => this.handleTest());

    // Location input enhancement
    this.enhanceLocationSelect();
  }

  updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  enhanceLocationSelect() {
    this.setupLocationAutocomplete();
  }

  setupLocationAutocomplete() {
    const locationSelect = document.getElementById('locationSelect');
    if (!locationSelect) return;

    // Populate the select with all municipalities
    locationSelect.innerHTML = this.municipalities
      .map(municipality => 
        `<option value="${municipality}" ${municipality === 'San Juan' ? 'selected' : ''}>${municipality}</option>`
      ).join('');

    // Add smooth transition effect when changing
    locationSelect.addEventListener('change', (e) => {
      locationSelect.style.transform = 'scale(0.98)';
      setTimeout(() => {
        locationSelect.style.transform = 'scale(1)';
      }, 150);
    });
  }

  async requestLocationPermission() {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: true,
            maximumAge: 300000 // 5 minutes
          });
        });
        
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        this.updateLocationDisplay();
      } catch (error) {
        console.log('Location access denied or unavailable:', error.message);
      }
    }
  }

  updateLocationDisplay() {
    if (this.userLocation) {
      const countrySelect = document.getElementById('country');
      if (countrySelect) {
        // In a real app, you'd use reverse geocoding to get the actual municipality
        // For now, we'll keep San Juan as default
        countrySelect.value = 'San Juan';
      }
    }
  }

  handleSearch() {
    const query = document.getElementById('q')?.value.trim();
    const location = document.getElementById('locationSelect')?.value || 'San Juan';
    const searchWrap = document.querySelector('.search-wrap');
    
    if (!query) {
      this.showNotification('Por favor, ingresa el nombre o tipo de escuela', 'warning');
      const input = document.getElementById('q');
      input?.focus();
      
      // Shake effect for empty search
      searchWrap?.classList.add('shake');
      setTimeout(() => searchWrap?.classList.remove('shake'), 500);
      return;
    }

    // Add searching class for visual feedback
    searchWrap?.classList.add('searching');
    this.showLoading();
    
    // Simulate search delay with realistic timing
    setTimeout(() => {
      this.hideLoading();
      searchWrap?.classList.remove('searching');
      this.navigateToResults(query, location);
    }, 1200);
  }

  handleNearbySearch() {
    if (!this.userLocation) {
      if ('geolocation' in navigator) {
        this.showLoading('Obteniendo tu ubicación...');
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.hideLoading();
            this.navigateToResults('', '', 'nearby');
          },
          (error) => {
            this.hideLoading();
            this.showNotification('No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación.', 'error');
          }
        );
      } else {
        this.showNotification('Tu navegador no soporta geolocalización', 'error');
      }
    } else {
      this.navigateToResults('', '', 'nearby');
    }
  }

  handleFavorites() {
    this.navigateToResults('', '', 'favorites');
  }

  handleTest() {
    this.showNotification('El test de afinidad estará disponible próximamente', 'info');
    // In a real app, you would navigate to a test wizard
  }

  navigateToResults(query = '', location = '', type = 'search') {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (this.userLocation) {
      params.set('lat', this.userLocation.lat.toString());
      params.set('lng', this.userLocation.lng.toString());
    }
    
    // Navigate to results page
    window.location.href = `result.html?${params.toString()}`;
  }

  showLoading(message = 'Buscando escuelas...') {
    this.isLoading = true;
    const searchBtn = document.getElementById('btnSearch');
    if (searchBtn) {
      searchBtn.classList.add('loading');
      searchBtn.disabled = true;
      searchBtn.innerHTML = `<i class="bi bi-hourglass-split"></i>`;
    }
  }

  hideLoading() {
    this.isLoading = false;
    const searchBtn = document.getElementById('btnSearch');
    if (searchBtn) {
      searchBtn.classList.remove('loading');
      searchBtn.disabled = false;
      searchBtn.innerHTML = `<i class="bi bi-search"></i>`;
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  setupNavbarScrollEffect() {
    const navbar = document.querySelector('.sf-navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  setupNavbar() {
    this.setupNavbarScrollEffect();
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
    
    if (value === '') {
      // If empty, show all options
      this.filteredOptions = [...this.locationData];
    } else {
      // Filter based on input
      this.filteredOptions = this.locationData.filter(location => 
        location.toLowerCase().includes(value)
      );
    }
    
    this.highlightedIndex = -1;
    this.updateOptions();
    this.showDropdown();
  }

  showDropdown() {
    if (!this.locationDropdown) return;
    
    // Make sure we have options to show
    if (this.filteredOptions.length === 0) {
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
}

// Initialize map immediately when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the main app
  new SchoolFinderApp();
  
  // Force initialize the map as backup
  setTimeout(() => {
    initializeMapDirectly();
  }, 500);
});

// Direct map initialization function
function initializeMapDirectly() {
  console.log('=== DIRECT MAP INITIALIZATION START ===');
  console.log('Current URL:', window.location.href);
  console.log('Document ready state:', document.readyState);
  
  const mapPlaceholder = document.querySelector('.map-placeholder');
  const schoolCount = document.getElementById('schoolCount');
  const schoolsList = document.getElementById('nearbySchoolsList');
  
  console.log('Elements found:', {
    mapPlaceholder: !!mapPlaceholder,
    schoolCount: !!schoolCount,
    schoolsList: !!schoolsList
  });
  
  if (!mapPlaceholder) {
    console.error('❌ Map placeholder not found!');
    console.log('Available elements in DOM:', 
      Array.from(document.querySelectorAll('div')).slice(0, 10).map(el => ({
        tag: el.tagName,
        id: el.id,
        class: el.className.substring(0, 50)
      }))
    );
    return;
  }
  
  console.log('Using map placeholder element with classes:', mapPlaceholder.className);

  console.log('Loading map directly...');
  
  // Sample schools data
  const schools = [
    { name: "Escuela Elemental José de Diego", type: "Elemental", municipality: "San Juan", distance: "0.5 km" },
    { name: "Escuela Intermedia Juan Ponce de León", type: "Intermedia", municipality: "San Juan", distance: "1.2 km" },
    { name: "Escuela Superior Central", type: "Superior", municipality: "San Juan", distance: "1.8 km" },
    { name: "Colegio San José", type: "K-12", municipality: "San Juan", distance: "2.1 km" },
    { name: "Escuela Elemental Rafael Hernández", type: "Elemental", municipality: "Guaynabo", distance: "2.8 km" },
    { name: "Escuela Superior Ramón Power y Giralt", type: "Superior", municipality: "San Juan", distance: "3.2 km" }
  ];

  // Load map content into placeholder
  console.log('Replacing map content in placeholder...');
  mapPlaceholder.innerHTML = `
    <div class="simulated-map">
      <div class="map-pins">
        <div class="map-pin" style="top: 25%; left: 45%;" data-school="0">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <div class="map-pin" style="top: 35%; left: 55%;" data-school="1">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <div class="map-pin" style="top: 45%; left: 40%;" data-school="2">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <div class="map-pin" style="top: 55%; left: 65%;" data-school="3">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <div class="map-pin" style="top: 30%; left: 70%;" data-school="4">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <div class="map-pin" style="top: 40%; left: 30%;" data-school="5">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <div class="user-location" style="top: 40%; left: 50%;">
          <i class="bi bi-person-fill"></i>
        </div>
      </div>
    </div>
  `;
  
  console.log('✅ Map HTML content replaced successfully');
  console.log('New map placeholder content length:', mapPlaceholder.innerHTML.length);

  // Update school count with styling
  const resultsInfo = document.querySelector('.results-info');
  const schoolCountLabel = document.getElementById('schoolCountLabel');
  
  if (schoolCount) {
    schoolCount.textContent = schools.length;
    
    if (resultsInfo) {
      if (schools.length === 0) {
        resultsInfo.classList.add('no-results');
        resultsInfo.classList.remove('has-results');
        if (schoolCountLabel) {
          schoolCountLabel.textContent = 'escuelas en esta área';
        }
      } else {
        resultsInfo.classList.add('has-results');
        resultsInfo.classList.remove('no-results');
        if (schoolCountLabel) {
          schoolCountLabel.textContent = schools.length === 1 ? 'escuela encontrada' : 'escuelas encontradas';
        }
      }
    }
  }

  // Update schools list
  if (schoolsList) {
    schoolsList.innerHTML = schools.slice(0, 3).map((school, index) => `
      <div class="school-item" data-school-index="${index}">
        <div class="school-info">
          <div class="school-name">${school.name}</div>
          <div class="school-details">${school.type} • ${school.municipality}</div>
        </div>
        <div class="school-distance">${school.distance}</div>
      </div>
    `).join('');

    // Add click handlers to school items
    schoolsList.querySelectorAll('.school-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        // Remove previous highlights
        document.querySelectorAll('.map-pin, .school-item').forEach(el => {
          el.classList.remove('highlighted');
        });
        
        // Highlight selected
        const pin = document.querySelector(`[data-school="${index}"]`);
        if (pin) pin.classList.add('highlighted');
        item.classList.add('highlighted');
      });
    });
  }

  // Add click handlers to map pins
  const pins = document.querySelectorAll('.map-pin');
  pins.forEach((pin, index) => {
    pin.addEventListener('click', () => {
      // Remove previous highlights
      document.querySelectorAll('.map-pin, .school-item').forEach(el => {
        el.classList.remove('highlighted');
      });
      
      // Highlight selected
      pin.classList.add('highlighted');
      const schoolItem = document.querySelector(`[data-school-index="${index}"]`);
      if (schoolItem) schoolItem.classList.add('highlighted');
    });
  });

  console.log('Map loaded directly successfully!');
}

// MULTIPLE EMERGENCY MAP LOADERS
console.log('🚨 Emergency map loader executing...');

// Try multiple times with different delays
[100, 500, 1000, 2000].forEach(delay => {
  setTimeout(() => {
    const emergencyPlaceholder = document.querySelector('.map-placeholder');
    if (emergencyPlaceholder && (emergencyPlaceholder.innerHTML.includes('Cargando') || emergencyPlaceholder.innerHTML.includes('loading'))) {
      console.log(`🚨 Emergency map loading triggered at ${delay}ms!`);
      emergencyPlaceholder.innerHTML = `
        <div class="simulated-map">
          <div class="map-pins">
            <div class="map-pin" style="top: 25%; left: 45%;" data-school="0"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="map-pin" style="top: 35%; left: 55%;" data-school="1"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="map-pin" style="top: 45%; left: 35%;" data-school="2"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="map-pin" style="top: 55%; left: 65%;" data-school="3"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="map-pin" style="top: 30%; left: 70%;" data-school="4"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="map-pin" style="top: 40%; left: 30%;" data-school="5"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="user-location" style="top: 40%; left: 50%;"><i class="bi bi-person-fill"></i></div>
          </div>
        </div>
      `;
      
      // Update counters immediately
      const schoolCount = document.getElementById('schoolCount');
      const schoolCountLabel = document.getElementById('schoolCountLabel');
      const resultsInfo = document.querySelector('.results-info');
      
      if (schoolCount) {
        schoolCount.textContent = '6';
        if (resultsInfo) {
          resultsInfo.classList.add('has-results');
          resultsInfo.classList.remove('no-results');
        }
        if (schoolCountLabel) {
          schoolCountLabel.textContent = 'escuelas encontradas';
        }
      }
      
      console.log(`✅ Emergency map loaded at ${delay}ms!`);
      return true;
    }
  }, delay);
});

// Additional loader when window is fully loaded
window.addEventListener('load', function() {
  console.log('🌍 Window fully loaded, final map check...');
  setTimeout(() => {
    const finalPlaceholder = document.querySelector('.map-placeholder');
    if (finalPlaceholder && (finalPlaceholder.innerHTML.includes('Cargando') || finalPlaceholder.innerHTML.includes('loading'))) {
      console.log('🔥 FINAL EMERGENCY MAP LOAD!');
      finalPlaceholder.innerHTML = `
        <div class="simulated-map" style="background: linear-gradient(135deg, #e8f5f3 0%, #f0f9f7 50%, #e1f2ef 100%); width: 100%; height: 100%; position: relative;">
          <div class="map-pins" style="position: relative; width: 100%; height: 100%;">
            <div class="map-pin" style="position: absolute; top: 25%; left: 45%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer;"><i class="bi bi-geo-alt-fill" style="transform: rotate(45deg);"></i></div>
            <div class="map-pin" style="position: absolute; top: 35%; left: 55%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer;"><i class="bi bi-geo-alt-fill" style="transform: rotate(45deg);"></i></div>
            <div class="map-pin" style="position: absolute; top: 45%; left: 35%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer;"><i class="bi bi-geo-alt-fill" style="transform: rotate(45deg);"></i></div>
            <div class="user-location" style="position: absolute; top: 40%; left: 50%; width: 28px; height: 28px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="bi bi-person-fill"></i></div>
          </div>
        </div>
      `;
      console.log('🎉 FINAL MAP LOADED WITH INLINE STYLES!');
    }
  }, 100);
});

// Immediate map loading - no waiting
(function() {
  console.log('🚀 Starting immediate map initialization...');
  
  function loadMapNow() {
    console.log('📍 Loading map content now...');
    
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (!mapPlaceholder) {
      console.error('❌ Map placeholder not found!');
      return false;
    }
    
    console.log('✅ Map placeholder found, loading content...');
    
    // Sample schools data
    const schools = [
      { name: "Escuela Elemental José de Diego", type: "Elemental", municipality: "San Juan", distance: "0.5 km" },
      { name: "Escuela Intermedia Juan Ponce de León", type: "Intermedia", municipality: "San Juan", distance: "1.2 km" },
      { name: "Escuela Superior Central", type: "Superior", municipality: "San Juan", distance: "1.8 km" },
      { name: "Colegio San José", type: "K-12", municipality: "San Juan", distance: "2.1 km" },
      { name: "Escuela Elemental Rafael Hernández", type: "Elemental", municipality: "Guaynabo", distance: "2.8 km" },
      { name: "Escuela Superior Ramón Power y Giralt", type: "Superior", municipality: "San Juan", distance: "3.2 km" }
    ];
    
    // Replace the loading content with the actual map
    mapPlaceholder.innerHTML = `
      <div class="simulated-map">
        <div class="map-pins">
          <div class="map-pin" style="top: 25%; left: 45%;" data-school="0">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin" style="top: 35%; left: 55%;" data-school="1">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin" style="top: 45%; left: 35%;" data-school="2">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin" style="top: 55%; left: 65%;" data-school="3">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin" style="top: 30%; left: 70%;" data-school="4">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="map-pin" style="top: 40%; left: 30%;" data-school="5">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="user-location" style="top: 40%; left: 50%;">
            <i class="bi bi-person-fill"></i>
          </div>
        </div>
      </div>
    `;
    
    console.log('🗺️ Map HTML content loaded successfully');
    
    // Update school count
    const schoolCount = document.getElementById('schoolCount');
    const schoolCountLabel = document.getElementById('schoolCountLabel');
    const resultsInfo = document.querySelector('.results-info');
    
    if (schoolCount) {
      schoolCount.textContent = schools.length;
      
      if (resultsInfo) {
        resultsInfo.classList.add('has-results');
        resultsInfo.classList.remove('no-results');
        if (schoolCountLabel) {
          schoolCountLabel.textContent = 'escuelas encontradas';
        }
      }
    }
    
    // Update schools list
    const schoolsList = document.getElementById('nearbySchoolsList');
    if (schoolsList) {
      schoolsList.innerHTML = schools.slice(0, 3).map((school, index) => `
        <div class="school-item" data-school-index="${index}">
          <div class="school-info">
            <div class="school-name">${school.name}</div>
            <div class="school-details">${school.type} • ${school.municipality}</div>
          </div>
          <div class="school-distance">${school.distance}</div>
        </div>
      `).join('');
      
      // Add click handlers to school items
      schoolsList.querySelectorAll('.school-item').forEach((item, index) => {
        item.addEventListener('click', () => {
          // Remove previous highlights
          document.querySelectorAll('.map-pin, .school-item').forEach(el => {
            el.classList.remove('highlighted');
          });
          
          // Highlight selected
          const pin = document.querySelector(`[data-school="${index}"]`);
          if (pin) pin.classList.add('highlighted');
          item.classList.add('highlighted');
        });
      });
    }
    
    // Add click handlers to map pins - wait a bit for DOM update
    setTimeout(() => {
      const pins = document.querySelectorAll('.map-pin');
      console.log(`🎯 Adding click handlers to ${pins.length} pins`);
      
      pins.forEach((pin, index) => {
        pin.addEventListener('click', () => {
          console.log(`� Pin ${index} clicked`);
          
          // Remove previous highlights
          document.querySelectorAll('.map-pin, .school-item').forEach(el => {
            el.classList.remove('highlighted');
          });
          
          // Highlight selected
          pin.classList.add('highlighted');
          const schoolItem = document.querySelector(`[data-school-index="${index}"]`);
          if (schoolItem) schoolItem.classList.add('highlighted');
        });
      });
    }, 100);
    
    console.log('✅ Map loaded successfully with all interactions!');
    return true;
  }
  
  // Try loading immediately if DOM is already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMapNow);
  } else {
    loadMapNow();
  }
  
  // Additional fallback attempts
  setTimeout(() => {
    const placeholder = document.querySelector('.map-placeholder');
    if (placeholder && placeholder.innerHTML.includes('Cargando')) {
      console.log('🔄 Map still loading, trying again...');
      loadMapNow();
    }
  }, 500);
  
  setTimeout(() => {
    const placeholder = document.querySelector('.map-placeholder');
    if (placeholder && placeholder.innerHTML.includes('Cargando')) {
      console.log('⚠️ Final attempt to load map...');
      loadMapNow();
    }
  }, 1000);
})();