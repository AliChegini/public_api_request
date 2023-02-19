
// Set API endpoint URL and parameters
var url = 'https://randomuser.me/api/';
var params = {
    results: 12,
    nat: 'us'
};

// Send AJAX request to API
$.getJSON(url, params, function(data) {
    // Loop through results and generate HTML for each user
    let users = data.results;
    for (var i = 0; i < users.length; i++) {
        let user = users[i];
        let userHtml = `
            <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
            </div>
        `;
        // Append user HTML to gallery container
        $('#gallery').append(userHtml);
    }
});
  