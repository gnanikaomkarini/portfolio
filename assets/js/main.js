/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});
sr.reveal('.education__timeline', {delay: 200});
sr.reveal('.achievements__container', {delay: 200});

/*===== ACHIEVEMENTS CARDS EXIT ANIMATION =====*/
const achievementCards = document.querySelectorAll('.achievement-card');
function handleAchievementsExit() {
    achievementCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.right < 0) {
            card.style.animation = 'achievementOut 1s forwards';
        } else if (rect.left < window.innerWidth) {
            card.style.animation = '';
        }
    });
}
window.addEventListener('scroll', handleAchievementsExit);

/*===== ACHIEVEMENTS CIRCULAR AUTO SCROLL =====*/
const achievementsScroll = document.getElementById('achievements-scroll');
let scrollPaused = false;
let scrollSpeed = 1.2; // px per frame

if (achievementsScroll) {
    // Clone all cards for seamless infinite scroll
    const cards = Array.from(achievementsScroll.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        achievementsScroll.appendChild(clone);
    });

    // Set container width to fit all cards (for smooth scroll)
    achievementsScroll.style.width = `${cards.length * 2 * 300 + 8 * 2 * (cards.length)}px`;

    function autoScrollAchievements() {
        if (!scrollPaused) {
            achievementsScroll.scrollLeft += scrollSpeed;
            // When scrolled past the original set, reset to start
            if (achievementsScroll.scrollLeft >= achievementsScroll.scrollWidth / 2) {
                achievementsScroll.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScrollAchievements);
    }

    achievementsScroll.addEventListener('mouseenter', () => { scrollPaused = true; });
    achievementsScroll.addEventListener('mouseleave', () => { scrollPaused = false; });

    requestAnimationFrame(autoScrollAchievements);
}
