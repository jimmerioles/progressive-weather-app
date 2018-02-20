<template>
    <section>
        <div class="cloudiness">
            <img src="../assets/icons/cloud.svg" alt="cloudiness"><span class="cloudiness__value">{{ cloudiness }}</span>&percnt;
        </div>
        <div class="wind-speed">
            <img src="../assets/icons/wind.svg" alt="wind speed"><span class="wind__value">{{ windSpeed }}</span>m/s
        </div>
        <div class="humidity">
            <img src="../assets/icons/humidity.svg" alt="humidity"><span class="humidity__value">{{ humidity }}</span>&percnt;
        </div>
    </section>
</template>

<script>
export default {
    name: 'Measurements',

    props: {
        cloudiness: {
            type: Number,
            required: true
        },
        windSpeed: {
            type: Number,
            required: true
        },
        humidity: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
section {
    width: 100%;
    padding-top: 25px;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.cloudiness img {
    width: 48px;
    height: 48px;
    vertical-align: middle;
}

.wind-speed img {
    width: 48px;
    height: 48px;
    vertical-align: middle;
}

.humidity img {
    width: 48px;
    height: 48px;
    vertical-align: middle;
}
</style>
