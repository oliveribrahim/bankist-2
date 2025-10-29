'use strict';


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContant = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window


const openModal = function () {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
//     Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});


// Operation Tabs
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContant.forEach(c => c.classList.remove('operations__content--active'));

    // Active tab
    clicked.classList.add('operations__tab--active');

    //  Active content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});


// Menu fade animation
const handlHover = function (e, opacity) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link)
                logo.style.opacity = opacity;
        });
        logo.style.opacity = opacity;
    }
};
//  Passing "argument into handler"
nav.addEventListener('mouseover', handlHover.bind(0.5));
nav.addEventListener('mouseout', handlHover.bind(1));

/*// Sticky navigation
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function (e){
    console.log(window.scrollY);

    if (window.scrollY > initialCoords.top)
        nav.classList.add('sticky');
    else
        nav.classList.remove('sticky');

});*/

// Sticky navigation : intersection Obrserver

// const obsCallback = function (entries , observer) {
//     entries.forEach(entry => {
//         console.log('entries ', entry);
//     })
// }
// const obsOptions = {
//     root: null,
//     threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


const header = document.querySelector('.header');
const navHight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting)
        nav.classList.add('sticky');
    else
        nav.classList.remove('sticky');
};
const headerObserve = new IntersectionObserver(
    stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHight}px`,
    }
);
headerObserve.observe(header)


// Reveal section

const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionobserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})
allSection.forEach(section => {
    sectionobserver.observe(section);
    // section.classList.add('section--hidden');

})

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

//     Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    // observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: `200px`,
});
imgTarget.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.slider__btn--dot');

let currentSlide = 0;
const maxSlides = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.8)';
// slider.style.overflow = 'visible';

const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

goToSlide(0);
// Next Slide

const nextSlide = function () {
    if (currentSlide >= maxSlides - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    goToSlide(currentSlide);
}

const prevSlide = function () {
    if (currentSlide === 0) {
        currentSlide = maxSlides - 1;
    } else currentSlide--;
    goToSlide(currentSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
});
//currentSlide = 1: -100% 0% 100% 200%

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/*

// SELECTING Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
console.log(allSection);

document.getElementById('#section--1');
const allButton = document.getElementsByTagName('button');
console.log(document.getElementsByClassName('btn'));



// CREATING Elements
const message = document.createElement('div');
message.classList.add('Cookie-message');
message.textContent = 'We use cookied for improved functionality and analytics';
message.innerHTML = 'We use cookie for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!<button';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);


//DELETE ELEMENTS
document
    .querySelector('.btn--close--cookie')
    .addEventListener('click', function (){
    message.remove();
    // message.parentElement.removeChild(message);
});


//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
document.documentElement.style.setProperty('--color-primary','orangered');

// Attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);

logo.alt = 'logo beautiful';
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Classes
logo.classList.add('c','j');
logo.classList.remove('c','j');
logo.classList.toggle('c');
logo.classList.contains('c');
logo.className = 'oliver';

*/
/*

// Scroll
const btnScrollTo =document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e){
    const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);
    // console.log(e.target.getBoundingClientRect());
    // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
    //
    // window.scrollTo(s1coords.left+ window.pageXOffset , s1coords.top+window.pageYOffset);

    section1.scrollIntoView({behavior: 'smooth'});
});
*/

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//     alert('addEventListener : great!');
//     h1.removeEventListener('mouseenter', alertH1);
// }

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1)
//     , 3000);

// h1.onmouseenter = function (){
//     alert('addEventListener : great!');
// }


// page navigation

// document.querySelectorAll('.nav__link').forEach(function (el){
//    el.addEventListener('click', function (e){
//        e.preventDefault();
//        const id = el.getAttribute('href');
//        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//    });
// });
//


// 1. add event listener to common parent element
// 2. Determine what element originated to event

/*

const h1 = document.querySelector('h1');
// Going downwards : child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'orange';

//Going upwards : parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideWays : siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
*/
