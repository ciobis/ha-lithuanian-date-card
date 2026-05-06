class LithuanianDateCard extends HTMLElement {
  // Zodiako ženklų ikonų žodynas
  static get ZODIAC_ICONS() {
    return {
      'Avinas': 'mdi:zodiac-aries',
      'Tauras': 'mdi:zodiac-taurus',
      'Dvyniai': 'mdi:zodiac-gemini',
      'Vėžys': 'mdi:zodiac-cancer',
      'Liūtas': 'mdi:zodiac-leo',
      'Mergelė': 'mdi:zodiac-virgo',
      'Svarstyklės': 'mdi:zodiac-libra',
      'Skorpionas': 'mdi:zodiac-scorpio',
      'Šaulys': 'mdi:zodiac-sagittarius',
      'Ožiaragis': 'mdi:zodiac-capricorn',
      'Vandenis': 'mdi:zodiac-aquarius',
      'Žuvys': 'mdi:zodiac-pisces'
    };
  }

  // Numatytoji tema, naudojama kai konfigūracijoje tema nenurodyta
  // (užtikrina suderinamumą su senesnėmis kortelės versijomis)
  static get DEFAULT_THEME() {
    return 'klasikine';
  }

  // Galimos kortelės temos. Kiekviena tema turi rodomą pavadinimą ir CSS,
  // kurio struktūra yra identiška, kad išdėstymas išliktų toks pat
  static get THEMES() {
    return {
      klasikine: {
        label: 'Klasikinė',
        styles: `
          ha-card {
            background-color: rgb(28, 28, 28);
            border-radius: 12px;
            padding: 12px 24px;
            color: white;
          }

          .date-time-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .moon-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            padding: 0 8px;
          }

          .moon-info {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .header {
            text-align: center;
          }

          .month {
            font-family: "Crimson Pro", serif;
            font-weight: 700;
            font-size: 24px;
            margin: 0;
            color: rgb(221, 221, 221);
          }

          .year {
            font-family: "Crimson Pro", serif;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
            margin: 2px 0;
          }

          .time-info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 8px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            margin: 4px 0;
          }

          .time-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            gap: 2px;
          }

          .time-label {
            opacity: 0.8;
          }

          .time-value {
            font-weight: 600;
          }

          .day-number {
            font-family: "Crimson Pro", serif;
            font-weight: 700;
            font-size: 96px;
            line-height: 86px;
            text-align: center;
            margin: 8px 0;
            color: rgb(221, 221, 221);
          }

          .day-number.red-day {
            color: rgb(255, 59, 59);
          }

          .weekday {
            font-family: "Crimson Pro", serif;
            font-weight: 600;
            font-size: 24px;
            line-height: 24px;
            text-align: center;
            margin: 4px 0;
            color: rgb(255, 255, 255);
          }

          .weekday.red-day {
            color: rgb(255, 59, 59);
          }

          .names {
            text-align: center;
            margin: 4px 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 13px;
          }

          .holidays {
            text-align: center;
            margin: 4px 0;
            font-size: 16px;
            font-weight: 600;
            font-family: "Crimson Pro", serif;
            color: rgb(255, 255, 255);
          }

          .holidays.red-day {
            color: rgb(255, 59, 59);
          }

          .proverb {
            text-align: center;
            font-style: italic;
            margin: 4px 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 13px;
          }

          .footer-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .zodiac-info, .chinese-zodiac {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            text-align: center;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
          }

          .moon-phase {
            white-space: nowrap;
          }

          ha-icon {
            --mdc-icon-size: 24px;
            color: rgba(255, 255, 255, 0.8);
          }
        `
      },
      juoda_balta: {
        label: 'Juoda/Balta',
        // Tema skirta monochrominiams (e-ink) ekranams: tik dvi spalvos -
        // baltas fonas ir juodi elementai. Permatomumas pakeistas pilnomis
        // spalvomis, paryškinimas perduodamas storesniu šriftu, storesnėmis
        // linijomis ir invertuotu (juodu) fonu raudonos dienos blokui.
        styles: `
          ha-card {
            background-color: rgb(255, 255, 255);
            border: 2px solid rgb(0, 0, 0);
            border-radius: 12px;
            padding: 12px 24px;
            color: rgb(0, 0, 0);
          }

          .date-time-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .moon-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 8px;
            color: rgb(0, 0, 0);
            font-size: 14px;
            font-weight: 600;
            padding: 0 8px;
          }

          .moon-info {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .header {
            text-align: center;
          }

          .month {
            font-family: "Crimson Pro", serif;
            font-weight: 700;
            font-size: 24px;
            margin: 0;
            color: rgb(0, 0, 0);
          }

          .year {
            font-family: "Crimson Pro", serif;
            font-weight: 600;
            font-size: 18px;
            color: rgb(0, 0, 0);
            margin: 2px 0;
          }

          .time-info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 8px;
            font-size: 13px;
            color: rgb(0, 0, 0);
            text-align: center;
            margin: 4px 0;
          }

          .time-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            gap: 2px;
          }

          .time-label {
            font-weight: 400;
          }

          .time-value {
            font-weight: 700;
          }

          .day-number {
            font-family: "Crimson Pro", serif;
            font-weight: 700;
            font-size: 96px;
            line-height: 96px;
            text-align: center;
            margin: 8px 0;
            color: rgb(0, 0, 0);
          }

          .day-number.red-day {
            background-color: rgb(0, 0, 0);
            color: rgb(255, 255, 255);
          }

          .weekday {
            font-family: "Crimson Pro", serif;
            font-weight: 700;
            font-size: 24px;
            line-height: 24px;
            text-align: center;
            margin: 4px 0;
            color: rgb(0, 0, 0);
          }

          .weekday.red-day {
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 4px;
          }

          .names {
            text-align: center;
            margin: 4px 0;
            color: rgb(0, 0, 0);
            font-size: 13px;
          }

          .holidays {
            text-align: center;
            margin: 4px 0;
            font-size: 16px;
            font-weight: 700;
            font-family: "Crimson Pro", serif;
            color: rgb(0, 0, 0);
          }

          .holidays.red-day {
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 3px;
          }

          .proverb {
            text-align: center;
            font-style: italic;
            margin: 4px 0;
            color: rgb(0, 0, 0);
            font-size: 13px;
          }

          .footer-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 2px solid rgb(0, 0, 0);
          }

          .zodiac-info, .chinese-zodiac {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            text-align: center;
            font-size: 13px;
            font-weight: 600;
            color: rgb(0, 0, 0);
          }

          .moon-phase {
            white-space: nowrap;
          }

          ha-icon {
            --mdc-icon-size: 24px;
            color: rgb(0, 0, 0);
          }
        `
      }
    };
  }

  static getConfigElement() {
    return document.createElement('ha-lithuanian-date-card-editor');
  }

  static getStubConfig() {
    return {
      entity: 'sensor.daylt_info',
      theme: LithuanianDateCard.DEFAULT_THEME
    };
  }

  // Saugus temos pavadinimo gavimas: jei konfigūracijoje nurodyta neegzistuojanti
  // tema arba tema visai nenurodyta, grąžinama numatytoji
  _resolveTheme() {
    const themeName = this.config && this.config.theme;
    if (themeName && LithuanianDateCard.THEMES[themeName]) {
      return themeName;
    }
    return LithuanianDateCard.DEFAULT_THEME;
  }

  _renderShell() {
    const themeName = this._resolveTheme();
    if (this._renderedTheme === themeName) return;

    this.innerHTML = `
      <ha-card>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&display=swap');
          ${LithuanianDateCard.THEMES[themeName].styles}
        </style>
        <div class="date-time-card">
          <div class="moon-container">
            <div class="moon-info">
              <ha-icon icon="mdi:moon-full"></ha-icon>
              <span class="moon-phase"></span>
            </div>
          </div>

          <div class="header">
            <div class="month"></div>
            <div class="year"></div>
          </div>

          <div class="time-info">
            <div class="time-group">
              <span class="time-label">Saulė teka</span>
              <span class="time-value sunrise"></span>
            </div>
            <div class="time-group">
              <span class="time-label">Saulė leidžiasi</span>
              <span class="time-value sunset"></span>
            </div>
            <div class="time-group">
              <span class="time-label">Dienos ilgumas</span>
              <span class="time-value daylength"></span>
            </div>
          </div>

          <div class="day-number"></div>
          <div class="weekday"></div>

          <div class="names"></div>
          <div class="holidays"></div>
          <div class="proverb"></div>

          <div class="footer-info">
            <div class="zodiac-info">
              <ha-icon icon="mdi:zodiac-capricorn"></ha-icon>
              <span class="zodiac-sign"></span>
            </div>
            <div class="chinese-zodiac">
              <ha-icon icon="mdi:dragon"></ha-icon>
              <span class="chinese-zodiac-sign"></span>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    this._renderedTheme = themeName;
  }

  set hass(hass) {
    this._hass = hass;
    this._renderShell();

    const entityId = this.config.entity || 'sensor.daylt_info';
    const state = hass.states[entityId];

    if (state) {
      const attributes = state.attributes;
      const isRedDay = !!attributes.is_red_day;

      // Get month from sensor.date
      const dateState = hass.states['sensor.date'];
      let monthName = 'Gruodis'; // default fallback
      if (dateState && dateState.state) {
        const date = new Date(dateState.state);
        const months = [
          'Sausis', 'Vasaris', 'Kovas', 'Balandis',
          'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis',
          'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'
        ];
        monthName = months[date.getMonth()];
      }

      // Update zodiac sign and icon
      const zodiacSign = this.querySelector('.zodiac-sign');
      const zodiacIcon = this.querySelector('.zodiac-info ha-icon');
      const currentZodiac = attributes.zodiakas || 'Ožiaragis';
      zodiacSign.textContent = currentZodiac;
      zodiacIcon.setAttribute('icon', LithuanianDateCard.ZODIAC_ICONS[currentZodiac] || 'mdi:zodiac-capricorn');

      // Update Chinese zodiac
      const chineseZodiacSign = this.querySelector('.chinese-zodiac-sign');
      const chineseZodiacIcon = this.querySelector('.chinese-zodiac ha-icon');
      const currentChineseZodiac = attributes.kinu_zodiakas || 'Drakonas';
      chineseZodiacSign.textContent = currentChineseZodiac;

      // Set Chinese zodiac icon based on the sign
      let chineseZodiacIconName = 'mdi:dragon';
      switch(currentChineseZodiac.toLowerCase()) {
        case 'žiurkė': chineseZodiacIconName = 'mdi:rat'; break;
        case 'jautis': chineseZodiacIconName = 'mdi:cow'; break;
        case 'tigras': chineseZodiacIconName = 'mdi:tiger'; break;
        case 'triušis':
        case 'kiškis': chineseZodiacIconName = 'mdi:rabbit'; break;
        case 'drakonas': chineseZodiacIconName = 'mdi:dragon'; break;
        case 'gyvatė': chineseZodiacIconName = 'mdi:snake'; break;
        case 'arklys': chineseZodiacIconName = 'mdi:horse'; break;
        case 'ožka': chineseZodiacIconName = 'mdi:goat'; break;
        case 'beždžionė': chineseZodiacIconName = 'mdi:monkey'; break;
        case 'gaidys': chineseZodiacIconName = 'mdi:rooster'; break;
        case 'šuo': chineseZodiacIconName = 'mdi:dog'; break;
        case 'kiaulė': chineseZodiacIconName = 'mdi:pig'; break;
      }
      chineseZodiacIcon.setAttribute('icon', chineseZodiacIconName);

      // Update moon phase icon and text
      const moonIcon = this.querySelector('.moon-info ha-icon');
      const moonPhase = attributes.menulio_faze?.toLowerCase() || '';
      const moonPhaseText = this.querySelector('.moon-phase');
      let moonIconName = 'mdi:moon-full';

      if (moonPhase.includes('jaunatis')) {
        moonIconName = 'mdi:moon-new';
      } else if (moonPhase.includes('priešpilnis')) {
        moonIconName = 'mdi:moon-waxing-gibbous';
      } else if (moonPhase.includes('pilnatis')) {
        moonIconName = 'mdi:moon-full';
      } else if (moonPhase.includes('delčia')) {
        moonIconName = 'mdi:moon-waning-gibbous';
      }

      moonIcon.setAttribute('icon', moonIconName);
      moonPhaseText.textContent = `${attributes.menulio_faze}\n${attributes.menulio_diena}`;

      // Raudonos dienos paryškinimas perduodamas per CSS klasę,
      // kad temos galėtų pačios nuspręsti vizualinį atvaizdavimą
      const dayNumber = this.querySelector('.day-number');
      dayNumber.textContent = new Date().getDate();
      dayNumber.classList.toggle('red-day', isRedDay);

      const weekday = this.querySelector('.weekday');
      weekday.textContent = attributes.savaites_diena;
      weekday.classList.toggle('red-day', isRedDay);

      const holidays = this.querySelector('.holidays');
      holidays.textContent = attributes.sventes;
      holidays.classList.toggle('red-day', isRedDay);

      // Update all other elements
      const monthElem = this.querySelector('.month');
      if (monthElem) {
        monthElem.textContent = monthName;
      }
      const yearElem = this.querySelector('.year');
      yearElem.textContent = new Date().getFullYear();
      this.querySelector('.sunrise').textContent = attributes.saule_teka;
      this.querySelector('.sunset').textContent = attributes.saule_leidziasi;
      this.querySelector('.daylength').textContent = attributes.dienos_ilgumas;
      this.querySelector('.names').textContent = attributes.vardadieniai;
      this.querySelector('.proverb').textContent = attributes.patarle;
    }
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this.config = config;
    // Pakeitus konfigūraciją (pvz., temą) reikia perpiešti kortelės kiautą
    this._renderedTheme = null;
    if (this._hass) {
      // Pakartotinai sukelti hass setterį, kad kortelė būtų atnaujinta
      // su nauja tema neperkraunant viso skydelio
      this.hass = this._hass;
    }
  }

  getCardSize() {
    return 4;
  }
}

// Vizualinis konfigūracijos redaktorius, naudojamas Lovelace „Add Card" sraute.
// Sąmoningai naudojami tiesioginiai HA komponentai (ha-entity-picker, ha-select),
// o ne ha-form, kad redaktorius būtų stabilus įvairiose HA versijose ir
// vartotojas galėtų pridėti kortelę per UI be rankinio YAML redagavimo.
class LithuanianDateCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({
      entity: 'sensor.daylt_info',
      theme: LithuanianDateCard.DEFAULT_THEME
    }, config || {});

    if (!this._rendered) {
      this._render();
    } else {
      this._syncFromConfig();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (this._entityPicker) {
      this._entityPicker.hass = hass;
    }
  }

  _render() {
    const themeOptions = Object.keys(LithuanianDateCard.THEMES)
      .map((key) => `<mwc-list-item value="${key}">${LithuanianDateCard.THEMES[key].label}</mwc-list-item>`)
      .join('');

    this.innerHTML = `
      <style>
        .lt-card-editor {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 8px 4px;
        }
        .lt-card-editor ha-entity-picker,
        .lt-card-editor ha-select {
          width: 100%;
        }
      </style>
      <div class="lt-card-editor">
        <ha-entity-picker class="lt-entity" allow-custom-entity></ha-entity-picker>
        <ha-select class="lt-theme" label="Išvaizda" fixedMenuPosition naturalMenuWidth>
          ${themeOptions}
        </ha-select>
      </div>
    `;

    this._entityPicker = this.querySelector('.lt-entity');
    this._themeSelect = this.querySelector('.lt-theme');

    this._entityPicker.label = 'Esybė';
    this._entityPicker.includeDomains = ['sensor'];
    if (this._hass) {
      this._entityPicker.hass = this._hass;
    }

    this._entityPicker.addEventListener('value-changed', (ev) => {
      ev.stopPropagation();
      this._handleChange('entity', ev.detail.value);
    });

    // ha-select uždaromas po pasirinkimo - šiame etape jo .value jau atnaujinta
    this._themeSelect.addEventListener('closed', (ev) => {
      ev.stopPropagation();
      const value = this._themeSelect.value;
      if (value) {
        this._handleChange('theme', value);
      }
    });

    this._syncFromConfig();
    this._rendered = true;
  }

  _syncFromConfig() {
    if (this._entityPicker && this._entityPicker.value !== this._config.entity) {
      this._entityPicker.value = this._config.entity || '';
    }
    if (this._themeSelect && this._themeSelect.value !== this._config.theme) {
      this._themeSelect.value = this._config.theme || LithuanianDateCard.DEFAULT_THEME;
    }
  }

  _handleChange(key, value) {
    if (value === undefined || this._config[key] === value) return;
    const newConfig = Object.assign({}, this._config, { [key]: value });
    this._config = newConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    }));
  }
}

if (!customElements.get('ha-lithuanian-date-card-editor')) {
  customElements.define('ha-lithuanian-date-card-editor', LithuanianDateCardEditor);
}
if (!customElements.get('ha-lithuanian-date-card')) {
  customElements.define('ha-lithuanian-date-card', LithuanianDateCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-lithuanian-date-card",
  name: "Lithuanian Date Card",
  description: "A card that displays Lithuanian calendar information",
  preview: true,
  documentationURL: "https://github.com/braticks/ha-lithuanian-date-card"
});
