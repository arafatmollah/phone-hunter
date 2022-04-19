const search = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.data));
}
const displaySearch = phone => {
    const cardGroup = document.getElementById('card-row');
    cardGroup.textContent = '';
    phone.forEach(phones => {
       console.log(phones.slug);
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div class="card text-center border-0 shadow p-3 mb-5 bg-body rounded">
        <img src="${phones.image}" class="card-img-top img-fluid w-50 rounded mx-auto" alt="...">
        <div class="card-body">
        <p class="text-danger">${phones.brand}</p>
          <h5 class="card-title">${phones.phone_name}</h5>
          <p class="card-text"></p>
          <button onclick="moreDetails('${phones.slug}')" class="btn btn-danger">More Details</button>
        </div>
      </div>`
        cardGroup.appendChild(div)
    })
}

const moreDetails = details => {
    // console.log(details)
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>displayDetails(data));
}
const displayDetails = info => {
    console.log(info.data.mainFeatures.storage);
    console.log(info.data.mainFeatures.displaySize);
    console.log(info.data.slug);
    console.log(info.data.releaseDate);
    const showDetails = document.getElementById('details');
    showDetails.innerHTML=`<div class="col-6">

<img src="${info.data.image}">
    </div>
    <div class="col-6">
    <p>Storage: ${info.data.mainFeatures.storage}</p>
    <p>ReleaseDate: ${info.data.releaseDate}</p>
    <p>Display: ${info.data.mainFeatures.displaySize}</p>
    </div>`
}


