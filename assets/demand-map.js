/**
 * F&H - Fitness & Health
 * Interactive Demand Map & Area Product Request System
 */

(function () {
  'use strict';

  // Initial Seed Locations
  const DEFAULT_HOTSPOTS = [
    {
      id: 'alger',
      name: 'Alger',
      region: 'Wilaya d\'Alger',
      lat: 36.7538,
      lng: 3.0588,
      votes: 148,
      products: ['Peanut Protein Bar', '100% Whey Fraises', 'Pre-workout Legend'],
      places: ['Fitness Park Bab Ezzouar', 'Uno Hyper Marché', 'Pro Gym Hydra'],
      status: 'high_demand'
    },
    {
      id: 'oran',
      name: 'Oran',
      region: 'Wilaya d\'Oran',
      lat: 35.6987,
      lng: -0.6349,
      votes: 96,
      products: ['Peanut Protein Bar', 'Ghost Energy Drinks'],
      places: ['Salle Iron Gym Akid Lotfi', 'Carrefour Es-Sénia'],
      status: 'high_demand'
    },
    {
      id: 'constantine',
      name: 'Constantine',
      region: 'Wilaya de Constantine',
      lat: 36.3650,
      lng: 6.6147,
      votes: 64,
      products: ['Peanut Protein Bar', 'Whey Isolate'],
      places: ['Gold Gym Ali Mendjeli', 'Ritaj Mall'],
      status: 'high_demand'
    },
    {
      id: 'setif',
      name: 'Sétif',
      region: 'Wilaya de Sétif',
      lat: 36.1898,
      lng: 5.4108,
      votes: 52,
      products: ['Peanut Protein Bar', 'Pre-Workout Legend'],
      places: ['Park Mall Sétif', 'Power Gym 1014'],
      status: 'demand'
    },
    {
      id: 'annaba',
      name: 'Annaba',
      region: 'Wilaya d\'Annaba',
      lat: 36.9000,
      lng: 7.7667,
      votes: 47,
      products: ['Peanut Protein Bar', 'Pack Découverte'],
      places: ['Titan Gym Boulevard', 'Carrefour Seybouse'],
      status: 'demand'
    },
    {
      id: 'blida',
      name: 'Blida',
      region: 'Wilaya de Blida',
      lat: 36.4700,
      lng: 2.8300,
      votes: 41,
      products: ['Peanut Protein Bar', '100% Whey'],
      places: ['Atlas Fitness Center', 'Pro Nutrition'],
      status: 'demand'
    },
    {
      id: 'tlemcen',
      name: 'Tlemcen',
      region: 'Wilaya de Tlemcen',
      lat: 34.8783,
      lng: -1.3150,
      votes: 33,
      products: ['Peanut Protein Bar'],
      places: ['Fit Zone Imama'],
      status: 'demand'
    },
    {
      id: 'bejaia',
      name: 'Béjaïa',
      region: 'Wilaya de Béjaïa',
      lat: 36.7559,
      lng: 5.0843,
      votes: 38,
      products: ['Peanut Protein Bar', 'Ghost Energy'],
      places: ['Olympic Gym Quatre Chemins'],
      status: 'demand'
    },
    {
      id: 'batna',
      name: 'Batna',
      region: 'Wilaya de Batna',
      lat: 35.5559,
      lng: 6.1741,
      votes: 29,
      products: ['Peanut Protein Bar'],
      places: ['Salle Chahid Benboulaïd'],
      status: 'demand'
    },
    {
      id: 'tizi',
      name: 'Tizi Ouzou',
      region: 'Wilaya de Tizi Ouzou',
      lat: 36.7118,
      lng: 4.0459,
      votes: 35,
      products: ['Peanut Protein Bar', 'Whey Protéine'],
      places: ['Gym Nouvelle Ville'],
      status: 'demand'
    },
    {
      id: 'chlef',
      name: 'Chlef',
      region: 'Wilaya de Chlef',
      lat: 36.1647,
      lng: 1.3317,
      votes: 25,
      products: ['Peanut Protein Bar'],
      places: ['Centre Sportif Chlef'],
      status: 'demand'
    },
    {
      id: 'paris',
      name: 'Paris',
      region: 'Île-de-France',
      lat: 48.8566,
      lng: 2.3522,
      votes: 185,
      products: ['Peanut Protein Bar', 'Whey Isolate', 'Legend Pre-Workout'],
      places: ['Basic-Fit République', 'Fitness Park Nation', 'Monoprix'],
      status: 'high_demand'
    },
    {
      id: 'marseille',
      name: 'Marseille',
      region: 'PACA',
      lat: 43.2965,
      lng: 5.3698,
      votes: 82,
      products: ['Peanut Protein Bar'],
      places: ['Fitness Park La Valentine', 'Carrefour Prado'],
      status: 'high_demand'
    },
    {
      id: 'lyon',
      name: 'Lyon',
      region: 'Auvergne-Rhône-Alpes',
      lat: 45.7640,
      lng: 4.8357,
      votes: 76,
      products: ['Peanut Protein Bar', 'Whey Protéine'],
      places: ['Basic-Fit Part-Dieu', 'Fitness Park Confluence'],
      status: 'high_demand'
    }
  ];

  const PARTNER_LOCATIONS = [
    {
      id: 'partner-alger-centre',
      name: 'Boutique F&H Alger Centre',
      region: 'Rue Didouche Mourad, Alger',
      lat: 36.7680,
      lng: 3.0550,
      status: 'partner',
      desc: 'Point de vente officiel F&H - Toute la gamme disponible en rayon.',
      type: 'Boutique Officielle'
    },
    {
      id: 'partner-oran-front',
      name: 'F&H Corner Store Oran',
      region: 'Boulevard Front de Mer, Oran',
      lat: 35.7050,
      lng: -0.6450,
      status: 'partner',
      desc: 'Revendeur agréé F&H - Barres Peanut Protein & Boissons en stock.',
      type: 'Revendeur Agréé'
    },
    {
      id: 'partner-hydra-gym',
      name: 'Pro Gym Partner Bar Hydra',
      region: 'Val d\'Hydra, Alger',
      lat: 36.7450,
      lng: 3.0380,
      status: 'partner',
      desc: 'Barre protéinée et snacks disponibles au club house pour les adhérents.',
      type: 'Salle Partenaire'
    }
  ];

  class FHDemandMap {
    constructor(containerId = 'fh-demand-map') {
      this.containerId = containerId;
      this.map = null;
      this.markers = [];
      this.activeFilter = 'all';
      this.selectedCoords = null;
      this.locations = this.loadLocations();
      this.upvotedIds = this.loadUpvotes();
    }

    loadLocations() {
      try {
        const stored = localStorage.getItem('fh_demand_locations');
        if (stored) {
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_HOTSPOTS;
        }
      } catch (e) {
        console.warn('Could not read locations from localStorage', e);
      }
      return DEFAULT_HOTSPOTS;
    }

    saveLocations() {
      try {
        localStorage.setItem('fh_demand_locations', JSON.stringify(this.locations));
      } catch (e) {
        console.warn('Could not save locations to localStorage', e);
      }
    }

    loadUpvotes() {
      try {
        const stored = localStorage.getItem('fh_upvoted_locations');
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }

    saveUpvotes() {
      try {
        localStorage.setItem('fh_upvoted_locations', JSON.stringify(this.upvotedIds));
      } catch (e) {
        console.warn('Could not save upvotes', e);
      }
    }

    init() {
      const el = document.getElementById(this.containerId);
      if (!el || typeof L === 'undefined') {
        console.warn('Leaflet or map container not found');
        return;
      }

      // Initial view centered on Algeria/Maghreb/Western Med
      const isMobile = window.innerWidth < 768;
      const initialZoom = isMobile ? 5 : 6;
      const initialCenter = [36.20, 3.50];

      this.map = L.map(this.containerId, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 18,
        scrollWheelZoom: false,
        attributionControl: true
      });

      // Enable scroll zoom on user click
      this.map.on('click', () => {
        this.map.scrollWheelZoom.enable();
      });

      // Add CartoDB Voyager Retina Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(this.map);

      // Render Markers
      this.renderMarkers();
      this.updateTotalStats();

      // Listen for map clicks to request a new point
      this.map.on('click', (e) => {
        // Only open if click was directly on map, not on a marker
        if (e.originalEvent.target.classList.contains('leaflet-container')) {
          this.handleMapClick(e.latlng);
        }
      });

      this.bindUI();
      this.checkUrlParameters();
    }

    renderMarkers() {
      // Clear existing
      this.markers.forEach(m => this.map.removeLayer(m));
      this.markers = [];

      // 1. Render Demand Hotspots
      if (this.activeFilter === 'all' || this.activeFilter === 'demand') {
        this.locations.forEach(loc => {
          const hasVoted = this.upvotedIds.includes(loc.id);
          const customClass = hasVoted ? 'fh-pulse-marker user-voted' : 'fh-pulse-marker';
          
          const icon = L.divIcon({
            className: customClass,
            html: `
              <div class="pulse-ring"></div>
              <div class="pin-badge">
                <span>🔥</span>
                <span>${loc.name}</span>
                <span class="opacity-80">(${loc.votes})</span>
              </div>
            `,
            iconSize: [110, 36],
            iconAnchor: [55, 18]
          });

          const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(this.map);

          const popupContent = `
            <div class="fh-map-popup">
              <div class="fh-map-popup-header">
                <span class="fh-map-popup-badge demand">🔥 En forte demande</span>
                <span class="text-xs font-bold text-gray-500">${loc.votes} votes</span>
              </div>
              <h4 class="fh-map-popup-title">${loc.name}</h4>
              <div class="fh-map-popup-sub">${loc.region || ''}</div>
              <div class="fh-map-popup-info">
                <div><strong>Produit le + réclamé :</strong> ${loc.products ? loc.products[0] : 'Peanut Protein Bar'}</div>
                <div class="mt-1"><strong>Lieux souhaités :</strong> ${(loc.places || ['Salles de sport & supermarchés']).slice(0, 2).join(', ')}</div>
              </div>
              <button type="button" class="fh-map-popup-btn ${hasVoted ? 'voted' : ''}" onclick="window.fhDemandMapInstance.handleVote('${loc.id}')">
                ${hasVoted ? '✓ Déjà voté pour cette zone' : '🔥 Je veux aussi F&H ici (+1 vote)'}
              </button>
            </div>
          `;

          marker.bindPopup(popupContent);
          this.markers.push(marker);
        });
      }

      // 2. Render Partner / Official Stores
      if (this.activeFilter === 'all' || this.activeFilter === 'partner') {
        PARTNER_LOCATIONS.forEach(loc => {
          const icon = L.divIcon({
            className: 'fh-pulse-marker partner',
            html: `
              <div class="pulse-ring"></div>
              <div class="pin-badge">
                <span>✅</span>
                <span>${loc.name}</span>
              </div>
            `,
            iconSize: [140, 36],
            iconAnchor: [70, 18]
          });

          const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(this.map);

          const popupContent = `
            <div class="fh-map-popup">
              <div class="fh-map-popup-header">
                <span class="fh-map-popup-badge partner">✅ Disponible en rayon</span>
                <span class="text-xs font-bold text-emerald-700">${loc.type}</span>
              </div>
              <h4 class="fh-map-popup-title">${loc.name}</h4>
              <div class="fh-map-popup-sub">${loc.region}</div>
              <div class="fh-map-popup-info">
                <p class="text-xs text-gray-600 m-0">${loc.desc}</p>
              </div>
              <a href="https://maps.google.com/?q=${loc.lat},${loc.lng}" target="_blank" rel="noopener" class="fh-map-popup-btn" style="background:#059669; text-decoration:none;">
                📍 Ouvrir l'itinéraire Google Maps
              </a>
            </div>
          `;

          marker.bindPopup(popupContent);
          this.markers.push(marker);
        });
      }
    }

    handleVote(id) {
      if (this.upvotedIds.includes(id)) {
        this.showToast('Vous avez déjà voté pour cette zone ! Merci pour votre soutien 🚀');
        return;
      }

      const loc = this.locations.find(l => l.id === id);
      if (loc) {
        loc.votes += 1;
        this.upvotedIds.push(id);
        this.saveLocations();
        this.saveUpvotes();
        this.renderMarkers();
        this.updateTotalStats();
        this.showToast(`Vote enregistré pour ${loc.name} ! 🔥 Total : ${loc.votes} votes`);

        // Close and re-open popup with updated button state
        this.map.closePopup();
      }
    }

    handleMapClick(latlng) {
      this.selectedCoords = latlng;
      this.openModal({
        lat: latlng.lat.toFixed(4),
        lng: latlng.lng.toFixed(4),
        cityGuess: ''
      });

      // Try quick reverse geocoding via Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state || '';
            const state = data.address.state || data.address.country || '';
            const fullCityName = city ? `${city} (${state})` : state;
            const cityInput = document.getElementById('fh-request-city');
            if (cityInput && !cityInput.value) {
              cityInput.value = fullCityName;
            }
          }
        })
        .catch(() => {});
    }

    openModal(preset = {}) {
      const modal = document.getElementById('fh-request-modal');
      if (!modal) return;

      const cityInput = document.getElementById('fh-request-city');
      const coordsInput = document.getElementById('fh-request-coords');

      if (preset.cityGuess && cityInput) {
        cityInput.value = preset.cityGuess;
      }
      if (preset.lat && preset.lng && coordsInput) {
        coordsInput.value = `${preset.lat}, ${preset.lng}`;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus first input
      setTimeout(() => {
        if (cityInput && !cityInput.value) {
          cityInput.focus();
        }
      }, 100);
    }

    closeModal() {
      const modal = document.getElementById('fh-request-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    bindUI() {
      // 1. Search Box
      const searchInput = document.getElementById('fh-map-search-input');
      const searchBtn = document.getElementById('fh-map-search-btn');

      const performSearch = () => {
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
        if (!query) return;

        // Check local match first
        const match = this.locations.find(l => 
          l.name.toLowerCase().includes(query) || 
          (l.region && l.region.toLowerCase().includes(query))
        );

        if (match) {
          this.map.flyTo([match.lat, match.lng], 12, { duration: 1.2 });
          this.showToast(`Trouvé : ${match.name} (${match.votes} votes)`);
          return;
        }

        // External OpenStreetMap Nominatim Geocoding
        this.showToast('Recherche de l\'adresse en cours...');
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              const res = data[0];
              const lat = parseFloat(res.lat);
              const lon = parseFloat(res.lon);
              this.map.flyTo([lat, lon], 12, { duration: 1.5 });
              
              // Prompt user to vote for this new area
              setTimeout(() => {
                this.selectedCoords = { lat, lng: lon };
                this.openModal({
                  cityGuess: res.display_name.split(',')[0],
                  lat: lat.toFixed(4),
                  lng: lon.toFixed(4)
                });
              }, 1200);
            } else {
              this.showToast('Aucun résultat trouvé pour cette recherche.');
            }
          })
          .catch(() => {
            this.showToast('Erreur lors de la recherche.');
          });
      };

      if (searchBtn) searchBtn.addEventListener('click', performSearch);
      if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
          }
        });
      }

      // 2. Geolocation Button
      const geoBtn = document.getElementById('fh-geo-btn');
      if (geoBtn) {
        geoBtn.addEventListener('click', () => {
          if (!navigator.geolocation) {
            this.showToast('La géolocalisation n\'est pas supportée par votre navigateur.');
            return;
          }

          geoBtn.classList.add('animate-pulse');
          this.showToast('Recherche de votre position...');

          navigator.geolocation.getCurrentPosition(
            (pos) => {
              geoBtn.classList.remove('animate-pulse');
              const { latitude, longitude } = pos.coords;
              this.map.flyTo([latitude, longitude], 13, { duration: 1.5 });
              this.showToast('Position détectée ! 📍 Cliquez pour voter.');

              setTimeout(() => {
                this.selectedCoords = { lat: latitude, lng: longitude };
                this.handleMapClick({ lat: latitude, lng: longitude });
              }, 1000);
            },
            (err) => {
              geoBtn.classList.remove('animate-pulse');
              this.showToast('Impossible d\'obtenir votre position. Vous pouvez chercher votre ville manuellement.');
            },
            { timeout: 10000 }
          );
        });
      }

      // 3. Filter Buttons
      const filterBtns = document.querySelectorAll('[data-map-filter]');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('bg-black', 'text-white');
            b.classList.add('bg-gray-100', 'text-gray-700');
          });
          btn.classList.remove('bg-gray-100', 'text-gray-700');
          btn.classList.add('bg-black', 'text-white');

          this.activeFilter = btn.getAttribute('data-map-filter');
          this.renderMarkers();
        });
      });

      // 4. CTA Button (Open Request Modal)
      const openModalBtns = document.querySelectorAll('[data-open-demand-modal]');
      openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openModal();
        });
      });

      // 5. Close Modal Buttons & Overlay Click
      const closeModalBtns = document.querySelectorAll('[data-close-demand-modal]');
      closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => this.closeModal());
      });

      const modalOverlay = document.getElementById('fh-request-modal');
      if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) this.closeModal();
        });
      }

      // ESC key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeModal();
      });

      // 6. Request Form Submission
      const requestForm = document.getElementById('fh-demand-form');
      if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleFormSubmit(new FormData(requestForm));
        });
      }
    }

    handleFormSubmit(formData) {
      const city = (formData.get('city') || '').trim();
      const venueType = formData.get('venue_type') || 'Salle de sport';
      const venueName = (formData.get('venue_name') || '').trim();
      const email = (formData.get('email') || '').trim();
      const name = (formData.get('name') || '').trim();
      
      // Selected products
      const products = formData.getAll('products');
      if (products.length === 0) {
        products.push('Peanut Protein Bar 20 unités');
      }

      if (!city || !email) {
        this.showToast('Veuillez renseigner votre ville et adresse e-mail.');
        return;
      }

      // If coords were clicked, use them, otherwise approximate from city or center
      let lat = this.selectedCoords ? this.selectedCoords.lat : 36.7538 + (Math.random() - 0.5) * 0.1;
      let lng = this.selectedCoords ? this.selectedCoords.lng : 3.0588 + (Math.random() - 0.5) * 0.1;

      // Check if this city already exists in locations
      let existing = this.locations.find(l => l.name.toLowerCase() === city.toLowerCase());
      if (existing) {
        existing.votes += 1;
        if (!existing.products.includes(products[0])) {
          existing.products.unshift(products[0]);
        }
        if (venueName && (!existing.places || !existing.places.includes(venueName))) {
          existing.places = existing.places || [];
          existing.places.unshift(venueName);
        }
        this.upvotedIds.push(existing.id);
      } else {
        const newId = 'req-' + Date.now();
        const newLoc = {
          id: newId,
          name: city,
          region: venueName ? `${venueType} : ${venueName}` : 'Nouvelle zone réclamée',
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          votes: 1,
          products: products,
          places: venueName ? [venueName] : ['Point de vente suggéré'],
          status: 'user_created'
        };
        this.locations.push(newLoc);
        this.upvotedIds.push(newId);
        existing = newLoc;
      }

      this.saveLocations();
      this.saveUpvotes();
      this.renderMarkers();
      this.updateTotalStats();
      this.closeModal();

      // Fly to the new/updated location
      this.map.flyTo([existing.lat, existing.lng], 13, { duration: 1.5 });

      // Show celebratory confirmation modal / toast
      this.showSuccessCelebration(city, existing.votes);
    }

    showSuccessCelebration(city, totalVotes) {
      this.showToast(`🎉 Demande enregistrée avec succès pour ${city} ! (${totalVotes} votes)`);
      
      // Also show celebratory confirmation card if available
      const confirmCard = document.getElementById('fh-celebration-modal');
      if (confirmCard) {
        const citySpan = document.getElementById('fh-confirm-city-name');
        const votesSpan = document.getElementById('fh-confirm-votes-count');
        if (citySpan) citySpan.textContent = city;
        if (votesSpan) votesSpan.textContent = totalVotes;
        confirmCard.classList.add('active');
      }
    }

    updateTotalStats() {
      const totalVotes = this.locations.reduce((acc, curr) => acc + (curr.votes || 0), 0);
      const totalCities = this.locations.length;

      const votesEl = document.querySelectorAll('[data-stat-total-votes]');
      const citiesEl = document.querySelectorAll('[data-stat-total-cities]');

      votesEl.forEach(el => el.textContent = totalVotes.toLocaleString('fr-FR'));
      citiesEl.forEach(el => el.textContent = totalCities.toLocaleString('fr-FR'));
    }

    showToast(message) {
      let toast = document.getElementById('fh-toast-notify');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'fh-toast-notify';
        toast.className = 'fh-toast';
        document.body.appendChild(toast);
      }

      toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
      toast.classList.add('show');

      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }

    checkUrlParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      const productParam = urlParams.get('product');
      const actionParam = urlParams.get('action');

      if (productParam) {
        // Pre-check the corresponding product checkbox
        const checkbox = document.querySelector(`input[name="products"][value*="${productParam}"]`) ||
                         document.querySelector(`input[name="products"][value*="Peanut"]`);
        if (checkbox) checkbox.checked = true;
      }

      if (actionParam === 'request') {
        setTimeout(() => this.openModal(), 500);
      }
    }
  }

  // Auto-initialize when DOM and Leaflet are ready
  function initWhenReady() {
    if (typeof L !== 'undefined') {
      window.fhDemandMapInstance = new FHDemandMap('fh-demand-map');
      window.fhDemandMapInstance.init();
    } else {
      setTimeout(initWhenReady, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

})();
