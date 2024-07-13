<template>
<div :class="{'pop-up-container-failed': !failed, 'pop-up-container-closed': !showPopUpProp}" class="pop-up-container">
    <ul>
        <li v-for="message in msg" :key="message">{{ message }}</li>
    </ul>
</div>

</template>

<script>

export default {
    name: 'Pop-Up-Modal-Page',
    props: {
        msg: String,
        failed: Boolean,
        showPopUpProp: Boolean
    }
}
</script>

<style scoped>

@media (max-width: 800px) {
    .pop-up-container {
        top:700px !important;
        left: 50px !important;
        animation: slide 0.6s !important;
    }

    @keyframes slide-back {
        0% {
            top: 870px !important;
        }
        100% {
            top: 1500px !important;
        }
    }

    @keyframes slide {
        0% {
            top: 1500px !important;
        }
        50% {
            top: 770px !important;
        }
        to {
            top: 700px !important;
        }
    }
}

@media (min-width: 1920px) {
    .pop-up-container {
        top:770px !important;
        animation: slide 0.6s !important;
    }

    @keyframes slide-back {
        0% {
            top: 770px !important;
        }
        100% {
            top: 1500px !important;
        }
    }

    @keyframes slide {
        0% {
            top: 1500px !important;
        }
        50% {
            top: 680px !important;
        }
        to {
            top: 770px !important;
        }
    }
}

.pop-up-container-closed {
    top: 1500px !important;
    animation: slide-back 0.6s !important;
}

.pop-up-container ul {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.pop-up-container {
    display: table;

    position: absolute;
    top: 1000px;
    left: 250px;
    right: 0px;
    bottom: 0px;
    width: 350px;
    background-color: rgb(117, 232, 64);
    padding: 50px;
    padding-bottom: 30px;
    padding-top: 30px;
    border-radius: 15px;
    color: white;
    animation: slide 0.6s;
    font-size: 20px;
}

@keyframes slide-back {
    0% {
        top: 1000px;
    }
    100% {
        top: 1500px;
    }
}

@keyframes slide {
    0% {
        top: 1500px;
    }
    50% {
        top: 970px;
    }
    to {
        top: 1000px;
    }
}
.pop-up-container-failed {
    background-color: rgb(232, 64, 64);
}
</style>