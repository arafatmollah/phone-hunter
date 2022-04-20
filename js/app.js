//search phone_name
const search = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    
    if (searchValue == '') {
        console.log('nothing in this websute')
        const show = document.getElementById('card-row');
        show.innerHTML = `<h2 class='text-center text-warning'>Nothing is here</h2>`;
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.data));
    }
   
}

//display result
const displaySearch = phone => {
    const cardGroup = document.getElementById('card-row');
    cardGroup.textContent = '';

    
    phone.forEach(phones => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div class="card text-center border-0 shadow p-3 mb-5 bg-body rounded">
        <img src="${phones.image}" class="card-img-top img-fluid w-50 rounded mx-auto" alt="...">
        <div class="card-body">
        <p class="text-danger">${phones.brand}</p>
          <h5 class="card-title">${phones.phone_name}</h5>
          <p class="card-text"></p>
          <button onclick="moreDetails('${phones.slug}')" class="btn btn-success">Details</button>
        </div>
      </div>`
        cardGroup.appendChild(div)
    })
}
// details of the phone 
const moreDetails = details => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>displayDetails(data));
}

const displayDetails = info => {
    displayDetails.textContent = '';
    const showDetails = document.getElementById('details');
    showDetails.textContent = '';
    showDetails.innerHTML = `<div class="col-6">

<img src="${info.data.image}">
    </div>
    <div class="col-6">
    <p><span class="text-secondary">Storage : </span> ${info.data.mainFeatures.storage}</p>
    <p><span class="text-secondary">Chipset : </span>: ${info.data.mainFeatures.chipSet}</p>
    <p><span class="text-secondary">Memory : </span>: ${info.data.mainFeatures.memory}</p>
    <p><span class="text-secondary">Display : </span>: ${info.data.mainFeatures.displaySize}</p>
    
    </div>`

    // release date information 
    const releaseDate = document.getElementById('more-details');
    releaseDate.classList.add('div');
    if (info.data.releaseDate == '') {
        releaseDate.innerHTML = `
    <h3 class="text-center text-danger">Release date not found</h3>
  `
    }
    else {
        releaseDate.innerHTML = `
    <h3>${info.data.releaseDate}</h3>
  `
    }

//sensors information
    const sensorsInformation = document.getElementById('others-info')
    sensorsInformation.textContent = '';
    const information = (info.data.mainFeatures.sensors);
    information.forEach(data => {
        const ul = document.createElement('ul');
        ul.innerHTML = `
        <li>${data}</li>`
        sensorsInformation.appendChild(ul);
    })
    
}




