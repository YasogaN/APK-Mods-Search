// Check if a certain element is used in index.html
let elementExists = false;

function checkElement() {
    let elementExists = document.querySelector('.gsc-resultsbox-invisible') !== null;
    if (elementExists === true) {
        displaynone();
    } else if (elementExists === false) {
        displayblock();
    }
    requestAnimationFrame(checkElement);
}

function displaynone() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/dn.css';
    document.head.appendChild(link);
}

function displayblock() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/db.css';
    document.head.appendChild(link);
}

checkElement();
