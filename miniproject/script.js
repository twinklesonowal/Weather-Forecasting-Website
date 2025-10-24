
const apiKey = "6787beb74c4048d8a3d132052240512";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    
    try {
        const response = await fetch(apiUrl);

        // Check if the response is valid
        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        let data = await response.json();

        // Check if the data returned is valid
        if (!data.location) {
            throw new Error("City not found ");
        }

        // Updating the UI with weather information
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".region").innerHTML = data.location.region;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

        const condition = data.current.condition.text.toLowerCase();

        // Reset previous weather class from <body>
        document.body.className = "";

        if (condition.includes("sunny") || condition.includes("clear")) {
            weatherIcon.src = "images/clear.png";
            document.body.classList.add("clear");
        } else if (condition.includes("mist")) {
            weatherIcon.src = "images/mist.png";
            document.body.classList.add("mist");
        } else if (condition.includes("rain")) {
            weatherIcon.src = "images/rain.png";
            document.body.classList.add("rain");
        } else if (condition.includes("cloud") || condition.includes("overcast")) {
            weatherIcon.src = "images/clouds.png";
            document.body.classList.add("clouds");
        } else if (condition.includes("drizzle")) {
            weatherIcon.src = "images/drizzle.png";
            document.body.classList.add("rain"); // treat drizzle like rain
        } else {
            document.body.classList.add("default");
        }


        // Display the weather information
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        // Handle error case
        console.error(error.message);
        document.querySelector(".weather").style.display = "none";  // Hide weather info if there's an error
        alert("Error: " + error.message);  // Show an error message to the user
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})