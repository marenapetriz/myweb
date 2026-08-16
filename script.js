// ===== Traducciones EN / ES =====
const translations = {
  en: {
    "eyebrow": "Graphic designer — Mexico · US · Vietnam",
    "title1": "Site under",
    "title2": "renovation",
    "status": "Status",
    "statusval": "Available",
    "base": "Based in",
    "experience": "Experience",
    "experienceval": "8 years"
  },
  es: {
    "eyebrow": "Diseñadora gráfica — México · EE.UU. · Vietnam",
    "title1": "Sitio en",
    "title2": "remodelación",
    "status": "Estatus",
    "statusval": "Disponible",
    "base": "Con base en",
    "experience": "Experiencia",
    "experienceval": "8 años"
  }
};

function setLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  document.getElementById('btnEn').classList.toggle('active', lang === 'en');
  document.getElementById('btnEs').classList.toggle('active', lang === 'es');

  document.title = lang === 'en'
    ? 'Marena Petriz — Under renovation'
    : 'Marena Petriz — En remodelación';

  localStorage.setItem('preferredLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // Idioma por defecto: inglés, salvo que el usuario ya haya elegido antes
  const savedLang = localStorage.getItem('preferredLang');
  if (savedLang === 'es') {
    setLang('es');
  }

  // Pequeña mejora de UX: al hacer clic en el botón de correo,
  // además de abrir el cliente de mail, copia la dirección al portapapeles.
  const emailBtn = document.querySelector('.btn-pill');
  if (!emailBtn) return;

  emailBtn.addEventListener('click', async () => {
    const email = 'marena.petriz@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      const originalText = emailBtn.textContent;
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      emailBtn.textContent = lang === 'es' ? 'Correo copiado ✓' : 'Email copied ✓';
      setTimeout(() => {
        emailBtn.textContent = originalText;
      }, 1800);
    } catch (err) {
      // Si el navegador bloquea el portapapeles, no pasa nada:
      // el enlace mailto: sigue funcionando normalmente.
    }
  });
});
