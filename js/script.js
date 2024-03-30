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
    link.href = 'css/dn.min.css';
    document.head.appendChild(link);
}

function displayblock() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/db.min.css';
    document.head.appendChild(link);
}

checkElement();
