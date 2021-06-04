<template>
    <div class="whole">
        <div class="back">
            <div class="logo"></div>
            <div>{{hint}}</div>
            <form v-on:submit.prevent="register()" method="POST">
                <input v-model="username" name="username" type="text" placeholder="username">
                <input v-model="email" v-on:change="checkEmail()" name="email" type="text" placeholder="email">
                <input v-model="password" v-on:change="checkPassword()" name="password" type="password" placeholder="password">
                <input v-model="passwordagain" v-on:change="checkPassword()" name="passwordagain" type="password" placeholder="repeat password">
                <button type='submit'>Create account</button>
            </form>
            
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

export default {
    data: function(){
        return {username: '',
        email: '',
        password: '',
        passwordagain: '',
        hint: ''}
    },
    methods: {
        register: function(){
            let dataToSend = { "username": this.username,
                         "email": this.email,
                          "password": this.password };
            axios.post('http://localhost:3000/user', dataToSend)
                    .then(response => {
                        console.log(response.data);
                        let data =response.data;
                        if (data === 'Success'){
                            
                            this.login();
                        }
                        else{
                            this.hint = data;
                        }
                    });
        },
        login: function(){
            this.$router.push('/');
        },
        checkPassword: function(){
            if (this.password === this.passwordagain){
                this.hint = '';
            }
            else{
                this.hint = 'Passwords must be the same!';
            }
        },
        checkEmail: function(){
            if (this.email.includes('@') && this.email.includes('.')){
                this.hint = '';
            }
            else{
                this.hint = 'This is not proper email!';
            }
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
        height: 15%;
        border: none;
        border-radius: 10px;
        margin: 15px;
    }

    input[type=file]{
        height: 80%;
    }

    button{
        width: 20%;
        height: 15%;
        border: none;
        border-radius: 10px;
        background: black;
        color: white;
        margin: 15px;
    }

    .file-input{
        width: 80%;
        background: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        break-inside: avoid;
    }
</style>