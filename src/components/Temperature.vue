<template>
    <section>
        <div class="temperature__value">{{ (scaleSymbol === 'C')? value : fValue }}</div>
        <div class="temperature__right">
            <div class="temperature__scale">
                <a href="#" @click.prevent="toggleTemperature">&deg;{{ scaleSymbol }}</a>
            </div>
            <div class="temperature__high">
                <img src="../assets/icons/high.svg" alt="high temperature"><span>{{ (scaleSymbol === 'C')? high : fHigh }}</span>&deg;
            </div>
            <div class="temperature__low">
                <img src="../assets/icons/low.svg" alt="low temperature"><span>{{ (scaleSymbol === 'C')? low : fLow }}</span>&deg;
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Temperature',

    props: {
        value: {
            type: Number,
            required: true
        },
        high: {
            type: Number,
            required: true
        },
        low: {
            type: Number,
            required: true
        }
    },

    data: function() {
        return {
            scale: 'Celcius'
        }
    },

    computed: {
        scaleSymbol() {
            return this.scale.charAt(0);
        },

        fValue() {
            return this.toFahrenheit(this.value);
        },

        fHigh() {
            return this.toFahrenheit(this.high);
        },

        fLow() {
            return this.toFahrenheit(this.low);
        }
    },

    methods: {
        toFahrenheit(value) {
            return Math.floor((value * 1.8) + 32);
        },

        toggleTemperature() {
            (this.scale === 'Celcius')? this.scale = 'Fahrenheit' : this.scale = 'Celcius';
        }
    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.temperature__value {
    font-size: 7em;
    color: rgba(255, 255, 255, 0.75);
}

.temperature__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.temperature__scale {
    padding-top: 5px;
    font-size: 2em;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
}

.temperature__high {
    padding-top: 5px;
}

.temperature__high img {
    vertical-align: middle;
}

.temperature__low img {
    vertical-align: middle;
}
</style>
