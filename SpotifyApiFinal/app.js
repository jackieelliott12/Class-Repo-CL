let client_id = '99a8c45623104fecbdf8add12ea5fa6e'; // Replace with your actual client_id
let client_secret = 'cdfa05fefd6247a3a552bbc0f199ce80'; // Replace with your actual client_secret
let access_token;

//variables for p5
let currentGenre = 'Unknown';
let searched = false;
let artistName = '';


let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials'
};

window.addEventListener('load', () => {
  fetch(authOptions.url, {
    method: 'POST',
    headers: authOptions.headers,
    body: authOptions.body
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    access_token = data.access_token;
    console.log('Access Token:', access_token);
  })
  .catch(function (error) {
    console.error('Error:', error);
  });

  document.getElementById('search-button').addEventListener('click', searchArtist);

  // code for keypress event generated by chatgpt. Allows you to press enter to search, instead of just clicking the search button
  document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('search-button').click();
    }
  });
});

function searchArtist() {
  let query = document.getElementById('search-input').value;
  let url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=artist&limit=1';

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(response => response.json())
  .then(data => {
    searched = true;
    if (data.artists && data.artists.items && data.artists.items.length > 0) {
      let artist = data.artists.items[0]; 

      let genres;
      if (artist.genres && Array.isArray(artist.genres)) {
        genres = artist.genres;
      } else {
        genres = [];
      }

      let broadGenre;
      if (genres.length > 0) {
        broadGenre = categorizeGenres(genres);
      } else {
        broadGenre = 'Unknown';
      }

      currentGenre = broadGenre;
      artistName = artist.name;

      console.log('Artist: ' + artist.name);
      console.log('Top Genre: ' + broadGenre);
      console.log('All Genres:', genres);
    } else {
      currentGenre = 'Unknown';
      console.log('Artist not found or no genres available');
    }
  })
  .catch(error => console.error('Error:', error));
}

// Genre mapping code generated by chatgpt:
// Function to find the broad genre based on keywords
function categorizeGenres(genres) {
  let genreCount = {}; // This will keep track of how many times each broad genre is found.

  // Loop through each genre given by Spotify
  for (let genre of genres) {
    // Loop through each broad genre category in genreMapping
    for (let broadGenre in genreMapping) {
      // Get the keywords for the current broad genre
      let keywords = genreMapping[broadGenre];

      // Check if any keyword matches the current genre
      for (let keyword of keywords) {
        if (genre.toLowerCase().includes(keyword)) {
          // If it matches, increase the count for this broad genre
          if (genreCount[broadGenre]) {
            genreCount[broadGenre] += 1;
          } else {
            genreCount[broadGenre] = 1;
          }
        }
      }
    }
  }

  // Find the broad genre with the most matches
  let maxCount = 0;
  let selectedGenre = 'Unknown';

  // Loop through genreCount to find the genre with the highest count
  for (let broadGenre in genreCount) {
    if (genreCount[broadGenre] > maxCount) {
      maxCount = genreCount[broadGenre];
      selectedGenre = broadGenre;
    }
  }

  return selectedGenre;
}

let genreMapping = {
  Metal: ['metal', 'deathcore', 'blackened', 'grindcore', 'doom', 'sludge'],
  Rock: ['rock', 'punk', 'grunge', 'alternative'],
  Pop: ['pop', 'dance', 'synth', 'electropop'],
  HipHop: ['hip hop', 'rap', 'trap'],
  Jazz: ['jazz', 'swing', 'bebop'],
  Country: ['country', 'folk'],
  Electronic: ['electronic', 'house', 'techno', 'edm', 'trance', 'dubstep'],
  Classical: ['classical', 'orchestral', 'symphony', 'baroque']
};



// p5.js code
function setup() {
  createCanvas(800, 400);
}

function draw() {
  background('#e6ffff');
  fill('black');
  textSize(18);
  textAlign(LEFT, CENTER);

  if (searched) {
    if (artistName === '') {
      text('Artist: No artist found', 40, 40);
      text('Top Genre: Unidentified', 40, 40 + 30);
    } else {
      text('Artist: ' + artistName, 40, 40);
      //line below generated from chatgpt
      text('Top Genre: ' + (currentGenre === 'Unknown' ? 'Unidentified' : currentGenre), 40, 40 + 30);
      //
    }
  }

  if (currentGenre === 'Metal') {
    fill('#00e64d');
    text('Age: Millenial or Gen X', 40, 40 + 60);
    text('Hobbies: Hiking, Watching TV & Movies', 40, 40 + 90);
    text('Personality: Gentle, Creative, Introverted, Empathetic', 40, 40 + 120);
    text('Life: Small Rural Community', 40, 40 + 150);
    text('Social Media Choice: Reddit', 40, 40 + 180);
    text('Concerns: Inflation & the Cost of Living', 40, 40 + 210);

  } else if (currentGenre === 'Pop') {
    fill('#e60099');
    text('Age: Gen Z - Gen X', 40, 40 + 60);
    text('Hobbies: Shopping, Fashion, Watching TV & Movies', 40, 40 + 90);
    text('Personality: Extroverted, Honest, Conventional', 40, 40 + 120);
    text('Life: Traveler', 40, 40 + 150);
    text('Social Media Choice: Facebook & Twitter/X', 40, 40 + 180);
    text('Concerns: Social Life', 40, 40 + 210);

  } else if (currentGenre === 'Rock') {
    fill('red');
    text('Age: Millenial or Gen X', 40, 40 + 60);
    text('Hobbies: Watching Movies & TV, Listening to Albums', 40, 40 + 90);
    text('Personality: Hard-Working, Self-Assured, Nostalgic', 40, 40 + 120);
    text('Life: Small Rural Community', 40, 40 + 150);
    text('Social Media Choice: Facebook & YouTube', 40, 40 + 180);
    text('Concerns: Inflation & the Cost of Living', 40, 40 + 210);

  } else if (currentGenre === 'HipHop') {
    fill('orange');
    text('Age: Millenial or Gen Z', 40, 40 + 60);
    text('Hobbies: Swimming, Playing Basketball, Playing Video Games', 40, 40 + 90);
    text('Personality: High Self Esteem, Outgoing, Tech-Forward', 40, 40 + 120);
    text('Life: Urban & Bustling Communities', 40, 40 + 150);
    text('Social Media Choice: Instagram & YouTube', 40, 40 + 180);
    text('Concerns: Poverty & the Cost of Living', 40, 40 + 210);

  } else if (currentGenre === 'Jazz') {
    fill('blue');
    text('Age: Gen Z - Gen X', 40, 40 + 60);
    text('Hobbies: Supporting Local Music Events & Learning New Skills', 40, 40 + 90);
    text('Personality: Sophisticated, Refined, Creative, High Self-Esteem', 40, 40 + 120);
    text('Life: City Life', 40, 40 + 150);
    text('Social Media Choice: Unknown', 40, 40 + 180);
    text('Concerns: Cost of Education', 40, 40 + 210);

  } else if (currentGenre === 'Country') {
    fill('#e6b800');
    text('Age: Millenial', 40, 40 + 60);
    text('Hobbies: Hunting, Fishing, Baking', 40, 40 + 90);
    text('Hard-Working, Conventional, Conservative, Outgoing', 40, 40 + 120);
    text('Life: Small Rural Community', 40, 40 + 150);
    text('Social Media Choice: Facebook', 40, 40 + 180);
    text('Concerns: Living an Honest & Respectable Lifestyle', 40, 40 + 210);

  } else if (currentGenre === 'Electronic') {
    fill('purple');
    text('Age: Millenial or Gen Z', 40, 40 + 60);
    text('Hobbies: Playing Video Games/Esports, Going to Live Music Events', 40, 40 + 90);
    text('Personality: Outgoing, Assertive, Open to Experience', 40, 40 + 120);
    text('Life: Small Town Community', 40, 40 + 150);
    text('Social Media Choice: Snapchat & YouTube', 40, 40 + 180);
    text('Concerns: Learning More', 40, 40 + 210);

  } else if (currentGenre === 'Classical') {
    fill('#8600b3');
    text('Age: Millenial', 40, 40 + 60);
    text('Hobbies: Art, Literature & Learning More', 40, 40 + 90);
    text('Personality: Systemizer, Gravitates Towards Math & Science, Introverted', 40, 40 + 120);
    text('Life: Urban Cities', 40, 40 + 150);
    text('Social Media Choice: Twitter/X', 40, 40 + 180);
    text('Concerns: Cost of Education', 40, 40 + 210);
  }
}
