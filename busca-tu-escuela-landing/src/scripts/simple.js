// School Finder App - Simplified Version
document.addEventListener('DOMContentLoaded', function() {
  console.log('SchoolFinder loaded');
  
  // Municipality data
  const municipalities = [
    'San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas', 'Guaynabo', 
    'Mayagüez', 'Trujillo Alto', 'Arecibo', 'Toa Baja', 'Toa Alta', 
    'Aguadilla', 'Humacao', 'Cayey', 'Manatí', 'Vega Baja', 'Dorado',
    'Fajardo', 'Yauco', 'Juana Díaz', 'Cidra', 'Gurabo', 'Coamo',
    'San Germán', 'Cabo Rojo', 'Isabela', 'Camuy', 'Hatillo',
    'San Lorenzo', 'Las Piedras', 'Canóvanas', 'Luquillo'
  ];

  // Get elements
  const locationInput = document.getElementById('locationInput');
  const locationDropdown = document.getElementById('locationDropdown');
  const locationOptions = document.getElementById('locationOptions');

  if (!locationInput || !locationDropdown || !locationOptions) {
    console.error('Elements not found');
    return;
  }

  console.log('Elements found, setting up autocomplete');

  let filteredMunicipalities = [...municipalities];
  let selectedIndex = -1;

  // Show all options initially
  function updateDropdown() {
    locationOptions.innerHTML = '';
    
    if (filteredMunicipalities.length === 0) {
      locationOptions.innerHTML = '<div class="location-no-results">No se encontraron municipios</div>';
      return;
    }

    filteredMunicipalities.forEach((municipality, index) => {
      const div = document.createElement('div');
      div.className = 'location-option';
      div.textContent = municipality;
      div.setAttribute('data-index', index);
      
      // Click handler
      div.addEventListener('click', function() {
        locationInput.value = municipality;
        hideDropdown();
      });
      
      // Hover handler
      div.addEventListener('mouseenter', function() {
        selectedIndex = index;
        updateHighlight();
      });
      
      locationOptions.appendChild(div);
    });
  }

  function updateHighlight() {
    const options = locationOptions.querySelectorAll('.location-option');
    options.forEach((option, index) => {
      if (index === selectedIndex) {
        option.classList.add('highlighted');
      } else {
        option.classList.remove('highlighted');
      }
    });
  }

  function showDropdown() {
    console.log('Showing dropdown');
    locationDropdown.classList.add('show');
    locationInput.setAttribute('aria-expanded', 'true');
  }

  function hideDropdown() {
    console.log('Hiding dropdown');
    setTimeout(() => {
      locationDropdown.classList.remove('show');
      locationInput.setAttribute('aria-expanded', 'false');
    }, 150);
  }

  // Event listeners
  locationInput.addEventListener('input', function(e) {
    const value = e.target.value.toLowerCase().trim();
    console.log('Input changed to:', value);
    
    if (value === '') {
      filteredMunicipalities = [...municipalities];
    } else {
      filteredMunicipalities = municipalities.filter(municipality => 
        municipality.toLowerCase().includes(value)
      );
    }
    
    console.log('Filtered results:', filteredMunicipalities.length);
    selectedIndex = -1;
    updateDropdown();
    showDropdown();
  });

  locationInput.addEventListener('focus', function() {
    console.log('Input focused');
    if (filteredMunicipalities.length === 0) {
      filteredMunicipalities = [...municipalities];
      updateDropdown();
    }
    showDropdown();
  });

  locationInput.addEventListener('click', function() {
    console.log('Input clicked');
    if (filteredMunicipalities.length === 0) {
      filteredMunicipalities = [...municipalities];
      updateDropdown();
    }
    showDropdown();
  });

  locationInput.addEventListener('blur', function() {
    console.log('Input blurred');
    hideDropdown();
  });

  locationInput.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, filteredMunicipalities.length - 1);
        updateHighlight();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateHighlight();
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredMunicipalities.length) {
          locationInput.value = filteredMunicipalities[selectedIndex];
          hideDropdown();
        }
        break;
        
      case 'Escape':
        hideDropdown();
        locationInput.blur();
        break;
    }
  });

  // Initialize
  filteredMunicipalities = [...municipalities];
  updateDropdown();
  
  console.log('Autocomplete initialized successfully');

  // Basic search functionality
  const searchButton = document.getElementById('btnSearch');
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      const schoolName = document.querySelector('.school-input')?.value || '';
      const municipality = locationInput.value || '';
      
      console.log('Search clicked:', { schoolName, municipality });
      
      if (!schoolName && !municipality) {
        showNotification('Por favor ingresa el nombre de una escuela o selecciona un municipio', 'warning');
        return;
      }
      
      // Simulate search with loading
      showLoading('Buscando escuelas...');
      setTimeout(() => {
        hideLoading();
        showNotification(`Búsqueda completada: ${schoolName} en ${municipality}`, 'success');
      }, 2000);
    });
  }

  // Quick option buttons
  const btnNear = document.getElementById('btnNear');
  const btnFav = document.getElementById('btnFav');
  const btnTest = document.getElementById('btnTest');

  if (btnNear) {
    btnNear.addEventListener('click', function() {
      showLoading('Detectando tu ubicación...');
      setTimeout(() => {
        hideLoading();
        showNotification('Funcionalidad de ubicación en desarrollo', 'info');
      }, 1500);
    });
  }

  if (btnFav) {
    btnFav.addEventListener('click', function() {
      showLoading('Cargando escuelas favoritas...');
      setTimeout(() => {
        hideLoading();
        showNotification('Mostrando escuelas mejor valoradas', 'success');
      }, 1500);
    });
  }

  if (btnTest) {
    btnTest.addEventListener('click', function() {
      showLoading('Preparando herramienta de comparación...');
      setTimeout(() => {
        hideLoading();
        showNotification('Funcionalidad de comparación en desarrollo', 'info');
      }, 1500);
    });
  }

  // Utility functions
  function showLoading(message = 'Cargando...') {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'globalLoader';
      loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
      `;
      loader.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <div style="width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top: 3px solid var(--brand); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
          <p style="margin: 0; color: var(--neutral-700); font-weight: 500;">${message}</p>
        </div>
      `;
      document.body.appendChild(loader);
      
      // Add CSS animation
      if (!document.getElementById('spinAnimation')) {
        const style = document.createElement('style');
        style.id = 'spinAnimation';
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }
    }
    loader.style.display = 'flex';
  }

  function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      color: ${colors[type] || colors.info};
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-left: 4px solid ${colors[type] || colors.info};
      z-index: 10001;
      max-width: 400px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add slide-in animation
    if (!document.getElementById('slideInAnimation')) {
      const style = document.createElement('style');
      style.id = 'slideInAnimation';
      style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
      }
    }, 4000);
  }

  // Update year
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);
});