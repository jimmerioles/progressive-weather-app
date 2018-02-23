/*
* Service that fetch and parse weather forecast from openweathermap.org.
*
* @author Jim Merioles <jimwisleymerioles@gmail.com>
*/
class WeatherForecast {
    /*
    * Create WeatherForecast instance.
    */
    constructor() {
        this.cloudiness = 0;
        this.windSpeed = 0;
        this.humidity = 0;

        this.temperatureValue = 0;
        this.temperatureHigh = 0;
        this.temperatureLow = 0;

        this.location = ' ';
        this.description = 'Please connect to internet to fetch latest forecast :)';
        this.weatherIcon = require('../assets/icons/weather/cloud.svg');

        this.update();
    }

    /*
    * Update forecast with fresh data from current location.
    */
    update() {
        if (navigator.onLine) {
            navigator.geolocation.getCurrentPosition(position => this.updateForecast(position));
        }
    }

    /*
    * Update forecast from given coordinates data.
    *
    * @param {Object} position - Lat & lon coordinates object.
    */
    async updateForecast(position) {
        let data = null;

        try {
            data = await this.getForecast(position.coords);
        } catch (e) {
            data = this.getErrorData();
        }

        this.populate(data);
    }

    /*
    * Fetch weather forecast from endpoint(openweathermap.org).
    *
    * @param {Object} coordinates - Lat & lon coordinates object.
    */
    async getForecast(coordinates) {
        let appId = 'a3e7bdc246b811691b06aab13ccb0dbb';
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${appId}&units=metric`;

        let response = await fetch(endpoint);

        return await response.json();
    }

    /*
    * Error data for end-users.
    */
    getErrorData() {
        return {
                clouds: { all: 0 },
                wind: { speed: 0 },
                main: {
                    humidity: 0,
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0,
                },
                weather: [
                    {
                        id: 0,
                        description: `There's a problem at the weather forecast server ¯\\_(ツ)_/¯`
                    }
                ],
                name: null,
                sys: {
                    country: null
                }
            };
    }

    /*
    * Set new data.
    *
    * @param {Object} data - Weather forecast json data.
    */
    populate(data) {
        this.cloudiness = data.clouds.all;
        this.windSpeed = data.wind.speed;
        this.humidity = data.main.humidity;
        this.temperatureValue = Math.round(data.main.temp);
        this.temperatureHigh = Math.round(data.main.temp_max);
        this.temperatureLow = Math.round(data.main.temp_min);
        this.location = this.formatLocation(data.name, data.sys.country);
        this.description = data.weather[0].description;
        this.weatherIcon = this.getWeatherIcon(data.weather[0].id);
    }

    /*
    * Format location.
    *
    * @param {String} city - Current city.
    * @param {String} country - Current country.
    */
    formatLocation(city, country) {
        if (city === null && country === null) {
            return '';
        }

        return `${city}, ${country}`;
    }

    /*
    * Get weather icon based on id.
    *
    * @param {Number} id - Weather ID.
    */
    getWeatherIcon(id) {
        if(this.isThunderstorm(id)) {
            return require('../assets/icons/weather/thunderstorm.svg');
        }

        if(this.isDrizzle(id) || this.isRain(id)) {
            return require('../assets/icons/weather/rain.svg');
        }

        if(this.isSnow(id)) {
            return require('../assets/icons/weather/snow.svg');
        }

        return require('../assets/icons/weather/cloud.svg');
    }

    /*
    * Check if under Thunderstorm category.
    *
    * @param {Number} id - Weather ID.
    */
    isThunderstorm(id) {
        return id > 199 && id < 233;
    }

    /*
    * Check if under Drizzle category.
    *
    * @param {Number} id - Weather ID.
    */
    isDrizzle(id) {
        return id >299 && id < 322;
    }

    /*
    * Check if under Rain category.
    *
    * @param {Number} id - Weather ID.
    */
    isRain(id) {
        return id > 499 && id < 532;
    }

    /*
    * Check if under Snow category.
    *
    * @param {Number} id - Weather ID.
    */
    isSnow(id) {
        return id > 599 && id < 623;
    }
}

export default WeatherForecast;
