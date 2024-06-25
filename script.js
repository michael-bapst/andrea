let slideIndex = 0;
let audioStarted = false;
let firstPass = true;
const typeSpeed = 100; // Schreibgeschwindigkeit in Millisekunden

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
        firstPass = false; // Beim zweiten Durchlauf wird firstPass auf false gesetzt
    }
    slides[slideIndex - 1].style.display = "block";
    const textElement = slides[slideIndex - 1].getElementsByClassName("text")[0];
    if (firstPass) {
        typeWriter(textElement, () => {
            setTimeout(showSlides, 2000); // 2 Sekunden zusätzlich warten
        });
    } else {
        textElement.innerHTML = textElement.getAttribute("data-text");
        setTimeout(showSlides, 5000); // Beim zweiten Durchlauf 5 Sekunden pro Folie
    }
}

function plusSlides(n) {
    if (!firstPass) {
        slideIndex += n;
        if (slideIndex > document.getElementsByClassName("mySlides").length) {slideIndex = 1}
        if (slideIndex < 1) {slideIndex = document.getElementsByClassName("mySlides").length}
        showSlidesManual(slideIndex);
    }
}

function showSlidesManual(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    const textElement = slides[slideIndex - 1].getElementsByClassName("text")[0];
    if (firstPass) {
        typeWriter(textElement, () => {
            setTimeout(() => {}, 2000); // 2 Sekunden zusätzlich warten
        });
    } else {
        textElement.innerHTML = textElement.getAttribute("data-text");
    }
}

function typeWriter(element, callback) {
    const text = element.getAttribute("data-text");
    element.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, typeSpeed); // Geschwindigkeit der Schreibmaschinenanimation
        } else if (callback) {
            setTimeout(callback, 1000) // 2 Sekunden zusätzlich warten
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById("overlay");
    const startButton = document.getElementById("startButton");
    const audio = document.getElementById("background-audio");

    startButton.addEventListener('click', function() {
        audio.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
        overlay.style.display = 'none';
        if (!audioStarted) {
            audioStarted = true;
            showSlides();
        }
    });

    document.body.addEventListener('click', function() {
        if (!audioStarted) {
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            overlay.style.display = 'none';
            audioStarted = true;
            showSlides();
        }
    });
});
