/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = [];
const navElement = document.getElementById("navbar__list");
build();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNavSections() {
  const sectionsElements = document.querySelectorAll("section[data-nav]");
  sectionsElements.forEach((sectionElement) => {
    const liElement = document.createElement("li");
    const anchorElement = document.createElement("a");
    anchorElement.innerText = sectionElement.getAttribute("data-nav");
    anchorElement.classList.add("menu__link");
    anchorElement.addEventListener("click", (e) => onSectionLinkClicked(e, sectionElement));
    liElement.appendChild(anchorElement);
    navElement.appendChild(liElement);
    sections.push({
      sectionElement,
      anchorElement
    });
  });
}

// Add class 'active' to section when near top of viewport
function activeSection(section) {
  section.sectionElement.classList.add("your-active-class");
  section.anchorElement.classList.add('menu__link__active');
}
function deActiveSection(section) {
  section.sectionElement.classList.remove("your-active-class");
  section.anchorElement.classList.remove('menu__link__active');
}
function isSectionInViewport(section) {
  const sectionRect = section.sectionElement.getBoundingClientRect();
  console.log(sectionRect.top);
  return sectionRect.top >= 0 && sectionRect.top   *  1.5 <= (window.innerHeight || document.documentElement.innerHeight);
}
// Scroll to anchor ID using scrollTO event
function scrollToSection(sectionElement) {
    const sectionTopOffset = sectionElement.getBoundingClientRect().top;
    const navElementHeight = navElement.getBoundingClientRect().height;
    window.scrollBy({ top: sectionTopOffset - navElementHeight, behavior: "smooth" });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
function build() {
  buildNavSections();
  window.addEventListener("scroll", (e) => updateSectionElements());
  updateSectionElements();
}
// Scroll to section on link click
function onSectionLinkClicked(e, sectionElement) {
    scrollToSection(sectionElement);
}
// Set sections as active
function updateSectionElements() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (isSectionInViewport(section)) {
      activeSection(section);
    } 
    else {
      deActiveSection(section);
    }
  }
}

