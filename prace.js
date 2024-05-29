document.getElementById('adForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const dateApplied = document.getElementById('dateApplied').value;
    const interviewResult = document.getElementById('interviewResult').value;

    // Pokud je v LocalStorage "editIndex", upravujeme existující záznam
    if (localStorage.getItem('editIndex') !== null) {
        const editIndex = parseInt(localStorage.getItem('editIndex'), 10);
        let ads = JSON.parse(localStorage.getItem('ads')) || [];
        ads[editIndex] = { company, position, dateApplied, interviewResult };
        localStorage.setItem('ads', JSON.stringify(ads));
        localStorage.removeItem('editIndex');
    } else {
        // Přidání nového inzerátu do seznamu
        const ad = { company, position, dateApplied, interviewResult };
        let ads = JSON.parse(localStorage.getItem('ads')) || [];
        ads.push(ad);
        localStorage.setItem('ads', JSON.stringify(ads));
    }

    // Aktualizace zobrazení seznamu inzerátů
    displayAds();

    // Vyčištění formuláře po přidání inzerátu
    document.getElementById('adForm').reset();

    // Posun na začátek stránky
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function displayAds() {
    const adsList = document.getElementById('adsList');
    adsList.innerHTML = '';

    let ads = JSON.parse(localStorage.getItem('ads')) || [];

    ads.forEach((ad, index) => {
        const adItem = document.createElement('li');
        adItem.innerHTML = `
            Společnost: ${ad.company} - Pozice: ${ad.position} - Datum aplikace: ${ad.dateApplied} - Výsledek: ${ad.interviewResult} 
            <div>
                <button class="edit" onclick="editAd(${index})">Upravit</button>
                <button class="delete" onclick="deleteAd(${index})">Smazat</button>
            </div>`;
        adsList.appendChild(adItem);
    });
}

function deleteAd(index) {
    let ads = JSON.parse(localStorage.getItem('ads')) || [];
    ads.splice(index, 1);
    localStorage.setItem('ads', JSON.stringify(ads));
    displayAds();
}

function editAd(index) {
    let ads = JSON.parse(localStorage.getItem('ads')) || [];
    const ad = ads[index];

    document.getElementById('company').value = ad.company;
    document.getElementById('position').value = ad.position;
    document.getElementById('dateApplied').value = ad.dateApplied;
    document.getElementById('interviewResult').value = ad.interviewResult;

    localStorage.setItem('editIndex', index);
}

// Načtení inzerátů při načtení stránky
window.addEventListener('load', displayAds);