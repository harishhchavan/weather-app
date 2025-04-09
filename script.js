const backgroundImages = {
  sunny: 'https://images.unsplash.com/photo-1498928715928-5279e3f0eac6',
  cloudy: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
  rainy: 'https://images.unsplash.com/photo-1527766833261-b09c3163a791',
  snow: 'https://images.unsplash.com/photo-1608889175182-90dbf14a8f71',
  fog: 'https://images.unsplash.com/photo-1549887534-154c1c776a09',
  default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
};

function setBackground(conditionText) {
  const body = document.getElementById("body");
  const condition = conditionText.toLowerCase();
  
  if (condition.includes("sun")) {
    body.style.backgroundImage = `url('${backgroundImages.sunny}')`;
  } else if (condition.includes("cloud") || condition.includes("overcast")) {
    body.style.backgroundImage = `url('${backgroundImages.cloudy}')`;
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    body.style.backgroundImage = `url('${backgroundImages.rainy}')`;
  } else if (condition.includes("snow")) {
    body.style.backgroundImage = `url('${backgroundImages.snow}')`;
  } else if (condition.includes("fog") || condition.includes("mist")) {
    body.style.backgroundImage = `url('${backgroundImages.fog}')`;
  } else {
    body.style.backgroundImage = `url('${backgroundImages.default}')`;
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "ec4888d6c7c14cd38e6175247250904";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      document.getElementById("result").innerHTML = `<p style="color: red">${data.error.message}</p>`;
      return;
    }

    const location = `${data.location.name}, ${data.location.country}`;
    const temperature = `${data.current.temp_c}°C`;
    const condition = data.current.condition.text;
    const icon = `https:${data.current.condition.icon}`;
    const humidity = `Humidity: ${data.current.humidity}%`;
    const wind = `Wind: ${data.current.wind_kph} km/h`;

    document.getElementById("result").innerHTML = `
      <div class="location">📍 ${location}</div>
      <img src="${icon}" alt="icon">
      <div class="temperature">${temperature}</div>
      <div class="condition">${condition}</div>
      <div class="details">${humidity}</div>
      <div class="details">${wind}</div>
    `;

    setBackground(condition);
  } catch (error) {
    document.getElementById("result").innerHTML = `<p style="color: red">Error fetching data</p>`;
  }
}