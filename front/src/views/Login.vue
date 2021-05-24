<template>
    <div class="whole">
        <div class="back">
            <div class="logo"></div>
            <form v-on:submit.prevent="login()" method="POST">
                <input v-model="email" name="email" type="text" placeholder="email">
                <input v-model="password" name="password" type="password" placeholder="password">
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
    data: function(){
        return {
            email: '',
            password: '',} 
    },
    methods: {
        login: function(){
            let dataToSend = {"email": this.email,
                          "password": this.password };

            axios.post('http://localhost:3000/user/login', dataToSend)
                    .then(response => (console.log(response)));
        }
    }
}
</script>
<style scoped>
    body{
        background: #000028;
    }

    .whole{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .back{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #51575e;
        border-radius: 7%;
        width: 40vw;
        height: 70vh;
    }

    input{
        width: 80%;
        height: 20%;
        border: none;
        border-radius: 10px;
        margin: 15px;
    }

    button{
        width: 20%;
        height: 20%;
        border: none;
        border-radius: 10px;
        background: black;
        color: white;
        margin: 15px;
    }
</style>