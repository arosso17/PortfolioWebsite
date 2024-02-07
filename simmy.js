function toggleNavVisibility(b) {
    var nav = document.querySelector('header');
    if (window.scrollY > 0 || b) {
        nav.classList.add('show');
    } else {
        nav.classList.remove('show');
    }
}

function toggleFootVisibility() {
    var foot = document.querySelector('footer');
    if (window.scrollY > 0) {
        foot.style.display = 'block';
    } else {
        foot.style.display = 'none';
    }
}

// Add event listener for scroll event to toggle navigation visibility
window.addEventListener('mousemove', function (event) {
    if (event.clientY < 60){
        toggleNavVisibility(true)
    }
    else {
        toggleNavVisibility(false)
    }
});

window.addEventListener('scroll', function (event) {
    if (event.clientY < 60){
        toggleNavVisibility(true)
    }
    else {
        toggleNavVisibility(false)
    }
});

window.addEventListener('scroll', toggleFootVisibility);
window.addEventListener('DOMContentLoaded', toggleFootVisibility);
