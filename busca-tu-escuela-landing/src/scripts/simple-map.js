// SIMPLE DIRECT MAP LOADER
console.log('🚀 Simple map loader starting...');

function replaceMapNow() {
  console.log('📍 Attempting to replace map...');
  
  const mapPlaceholder = document.querySelector('.map-placeholder');
  console.log('Map placeholder found:', !!mapPlaceholder);
  
  if (mapPlaceholder) {
    console.log('✅ Replacing map content now...');
    
    mapPlaceholder.innerHTML = `
      <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #e8f5f3 0%, #f0f9f7 50%, #e1f2ef 100%); position: relative; overflow: hidden;">
        <!-- School pins -->
        <div style="position: absolute; top: 25%; left: 45%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">
          <i class="bi bi-geo-alt-fill" style="transform: rotate(45deg); font-size: 14px;"></i>
        </div>
        <div style="position: absolute; top: 35%; left: 55%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">
          <i class="bi bi-geo-alt-fill" style="transform: rotate(45deg); font-size: 14px;"></i>
        </div>
        <div style="position: absolute; top: 45%; left: 35%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">
          <i class="bi bi-geo-alt-fill" style="transform: rotate(45deg); font-size: 14px;"></i>
        </div>
        <div style="position: absolute; top: 55%; left: 65%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">
          <i class="bi bi-geo-alt-fill" style="transform: rotate(45deg); font-size: 14px;"></i>
        </div>
        <div style="position: absolute; top: 30%; left: 70%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">
          <i class="bi bi-geo-alt-fill" style="transform: rotate(45deg); font-size: 14px;"></i>
        </div>
        <div style="position: absolute; top: 40%; left: 30%; width: 32px; height: 32px; background: #059669; color: white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">
          <i class="bi bi-geo-alt-fill" style="transform: rotate(45deg); font-size: 14px;"></i>
        </div>
        
        <!-- User location -->
        <div style="position: absolute; top: 40%; left: 50%; width: 28px; height: 28px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); border: 3px solid white;">
          <i class="bi bi-person-fill" style="font-size: 12px;"></i>
        </div>
        
        <!-- Map pattern overlay -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml;utf8,<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" xmlns=\\"http://www.w3.org/2000/svg\\"><circle cx=\\"10\\" cy=\\"10\\" r=\\"1\\" fill=\\"%23059669\\" opacity=\\"0.1\\"/></svg>') repeat; pointer-events: none;"></div>
        
        <!-- Location controls -->
        <div style="position: absolute; top: 15px; right: 15px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-radius: 8px; padding: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <button style="background: none; border: none; color: #059669; font-size: 18px; cursor: pointer; padding: 4px;" title="Mi ubicación">
            <i class="bi bi-crosshair"></i>
          </button>
        </div>
      </div>
    `;
    
    console.log('🗺️ Map HTML replaced successfully!');
    
    // Update school count
    const schoolCount = document.getElementById('schoolCount');
    const schoolCountLabel = document.getElementById('schoolCountLabel');
    const resultsInfo = document.querySelector('.results-info');
    
    if (schoolCount) {
      schoolCount.textContent = '6';
      console.log('📊 School count updated to 6');
    }
    
    if (schoolCountLabel) {
      schoolCountLabel.textContent = 'escuelas encontradas';
      console.log('🏷️ School count label updated');
    }
    
    if (resultsInfo) {
      resultsInfo.classList.add('has-results');
      resultsInfo.classList.remove('no-results');
      console.log('🎨 Results info styled');
    }
    
    // Update schools list
    const schoolsList = document.getElementById('nearbySchoolsList');
    if (schoolsList) {
      schoolsList.innerHTML = `
        <div class="school-item" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">Escuela Elemental José de Diego</div>
            <div style="font-size: 14px; color: #6b7280;">Elemental • San Juan</div>
          </div>
          <div style="font-weight: 600; color: #059669;">0.5 km</div>
        </div>
        <div class="school-item" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; margin-top: 8px;">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">Escuela Intermedia Juan Ponce de León</div>
            <div style="font-size: 14px; color: #6b7280;">Intermedia • San Juan</div>
          </div>
          <div style="font-weight: 600; color: #059669;">1.2 km</div>
        </div>
        <div class="school-item" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; margin-top: 8px;">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">Escuela Superior Central</div>
            <div style="font-size: 14px; color: #6b7280;">Superior • San Juan</div>
          </div>
          <div style="font-weight: 600; color: #059669;">1.8 km</div>
        </div>
      `;
      console.log('📋 Schools list updated');
    }
    
    console.log('🎉 MAP LOADED SUCCESSFULLY!');
    return true;
  } else {
    console.error('❌ Map placeholder not found');
    return false;
  }
}

// Try immediately
replaceMapNow();

// Try after DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', replaceMapNow);
} else {
  replaceMapNow();
}

// Try with delays as fallback
setTimeout(replaceMapNow, 100);
setTimeout(replaceMapNow, 500);
setTimeout(replaceMapNow, 1000);

// Try when window is fully loaded
window.addEventListener('load', replaceMapNow);

console.log('✅ Simple map loader initialized');