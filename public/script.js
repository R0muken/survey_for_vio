// Make the screen blink
setInterval(function() {
    var hackedScreen = document.getElementById('hacked-screen');
    hackedScreen.style.display = (hackedScreen.style.display == 'none' ? '' : 'none');
}, 500);
