const animation = bodymovin.loadAnimation({
    container: document.getElementById('anim'), // Required
    path: 'images/website-revolver.json', // Required
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: 'Website Revolver', // Name for future reference. Optional.
});
