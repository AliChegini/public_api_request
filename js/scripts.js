
// Set API endpoint URL and parameters
const apiUrl = 'https://randomuser.me/api/';
const apiParams = {
  results: 12,
  nat: 'us'
};

// Get JSON data from API
async function fetchData(url, params) {
    try {
      const response = await fetch(url + "?" + $.param(params));
      const data = await response.json();
      const users = data.results;
      return users;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
  

// Create HTML for user card element
function createUserCard(user) {
  const userCard = document.createElement('div');
  userCard.className = 'card';
  userCard.innerHTML = `
    <div class="card-img-container">
      <img class="card-img" src="${user.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
  `;
  return userCard;
}

// Create HTML for modal window element
function createModalWindow(user) {
  const modalWindow = document.createElement('div');
  modalWindow.className = 'modal-container';
  modalWindow.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${user.cell}</p>
        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state} ${user.location.postcode}</p>
        <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
      </div>
    </div>
  `;
  return modalWindow;
}

// Add click event listener to user card elements to show modal window with user data
function addEventListeners() {
  const userCards = document.querySelectorAll('.card');
  userCards.forEach((userCard, index) => {
    userCard.addEventListener('click', () => {
      const user = users[index];
      const modalWindow = createModalWindow(user);
      document.body.appendChild(modalWindow);

      // Add event listener to close modal when close button is clicked
      const closeButton = document.querySelector('#modal-close-btn');
      closeButton.addEventListener('click', () => {
        modalWindow.remove();
      });
    });
  });
}

// Initialize app by fetching data from API, generating HTML for user cards, and adding event listeners
function initApp() {
  fetchData(apiUrl, apiParams)
    .then(data => {
      users = data;
      const userCards = users.map(user => createUserCard(user));
      const gallery = document.querySelector('#gallery');
      userCards.forEach(userCard => gallery.appendChild(userCard));
      addEventListeners();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

initApp();
