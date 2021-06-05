<template>
    <div class="whole">
        <div class="back">
            <div class="logo"></div>
            <div>{{hint}}</div>
            <form v-on:submit.prevent="login()" method="POST">
                <input v-model="email" name="email" type="text" placeholder="email">
                <input v-model="password" name="password" type="password" placeholder="password">
                <button type='submit'>Login</button>
            </form>
            <button v-on:click="register()">Create account</button>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
    data: function(){
        return {
            email: '',
            password: '',
            hint: '',
            user: {}} 
    },
    methods: {
        login: function(){
            let dataToSend = {"email": this.email,
                          "password": this.password };

            axios.post('http://localhost:3000/user/login', dataToSend)
                    .then(response => {
                        let data =response.data;
                        if(typeof data === 'object' && data !== null){
                            localStorage.setItem('token', data.access_token);
                            this.$router.push('/home');
                            }
                        else{
                            this.hint = data;
                        }
                        });
        },
        register: function(){
            this.$router.push('/register');
        }
    },
    async mounted(){
        let token = localStorage.getItem('token');

        await axios.get('http://localhost:3000/user/profile', { headers: { Authorization: 'Bearer '.concat(token) } })
        .then(response => {
            // If request is good...
            this.user = response.data;
        });

        if (this.user.userId){
            this.$router.push('/home');
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
        margin: 15px;
    }

    button{
        width: 20%;
        height: 12%;
        border: none;
        border-radius: 10px;
        background: black;
        color: white;
        margin: 15px;
    }

    form{
        padding: 10px;
    }

    form>button{
        width: 20%;
        height: 20%;
        border: none;
        border-radius: 10px;
        background: black;
        color: white;
        margin: 15px;
    }

    @media screen and (max-width: 800px) {
        .back{
            width: 100vw;
        }

        button{
            width: 40%;
        }

        form>button{
            width: 40%;
        }
    }
</style>