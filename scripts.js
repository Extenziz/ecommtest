const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const productCards = document.querySelectorAll('.product-card');

let currentPosition = 0;
const cardWidth = productCards[0].offsetWidth + 16; // Card width + margin
const trackWidth = sliderTrack.scrollWidth; // Total width of the track


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApL86l6AZCkRkfTAIY72ExizzRTFLNfPQ",
  authDomain: "ecomwebf.firebaseapp.com",
  projectId: "ecomwebf",
  storageBucket: "ecomwebf.appspot.com",
  messagingSenderId: "1095063933342",
  appId: "1:1095063933342:web:468e5bd5c2b31f131fc68f",
  measurementId: "G-DL7J45H2NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Function to handle next button click
nextBtn.addEventListener('click', () => {
    const maxPosition = trackWidth - sliderTrack.parentElement.offsetWidth;
    
    if (currentPosition < maxPosition) {
        currentPosition += cardWidth;
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition; // Prevent overscrolling
        }
    }
    sliderTrack.style.transform = `translateX(-${currentPosition}px)`;
});

// Function to handle previous button click
prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
        currentPosition -= cardWidth;
        if (currentPosition < 0) {
            currentPosition = 0; // Prevent overscrolling
        }
    }
    sliderTrack.style.transform = `translateX(-${currentPosition}px)`;
});


window.addEventListener('resize', () => {
    const newCardWidth = productCards[0].offsetWidth + 16;
    currentPosition = 0; // Reset position on resize
    sliderTrack.style.transform = `translateX(0)`;
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate the card width and track width
        cardWidth = productCards[0].offsetWidth + 16;
        trackWidth = sliderTrack.scrollWidth;
    }, 250); // Delay execution for 250ms
});

const scrollTopBtn = document.getElementById('scrollTopBtn');

// Funkcja pokazująca/ukrywająca przycisk w zależności od przewinięcia strony
window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block"; // Pokaż przycisk
    } else {
        scrollTopBtn.style.display = "none"; // Ukryj przycisk
    }
};

// Funkcja przewijająca stronę na górę po kliknięciu przycisku
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Płynne przewinięcie na górę
});
const maxPosition = trackWidth - sliderTrack.parentElement.offsetWidth;

if (currentPosition > maxPosition) {
    currentPosition = maxPosition; // Zapobiega przekroczeniu maksymalnej pozycji
}

sliderTrack.style.transform = `translateX(-${currentPosition}px)`;

console.log("Card width:", cardWidth);
console.log("Track width:", trackWidth);
