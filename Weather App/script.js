async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherResult = document.getElementById('weatherResult');
    const apiKey = '05b5f236865718f1c3e8dfdc388955b2'; // Replace with your OpenWeatherMap API key
  
    if (!location) {
      weatherResult.innerHTML = '<p class="error">Please enter a location.</p>';
      return;
    }
  
    weatherResult.innerHTML = '<p>Loading...</p>';
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
  
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
  
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
      weatherResult.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>${temperature}&deg;C</strong></p>
        <p>${description}</p>
        <img src="${iconUrl}" alt="Weather icon" />
      `;
    } catch (error) {
      weatherResult.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }
  