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
        console.log(phones);
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div class="card">
        <img src="${phones.image}" class="card-img-top img-fluid w-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phones.phone_name}</h5>
          <p class="card-text"></p>
        </div>
      </div>`
        cardGroup.appendChild(div)
    })
}
