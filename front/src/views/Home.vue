<template>
    <div class="featured">
        <button v-if="user.userId" v-on:click="logout()">Logout</button>
        <button v-else v-on:click="login()">Login</button>
        <div v-for="discussion in discussions" v-bind:key="discussion" v-on:click="redirect(discussion.id_discussion)">
            <Miniature :namez="discussion.name" :description="discussion.description"/>
        </div>
        <div class="add" v-on:click="addingModal()">
          +
        </div>
        <dialog className="dialog" style="position: 'absolute'" open v-if="adding">
            <button v-on:click="addingModal()">x</button>
            <form v-on:submit.prevent="add()" method="POST">
                <input v-model="name" name="name" type="text" placeholder="name">
                <input v-model="description" name="description" type="text" placeholder="description">
                <button type='submit'>Add</button>
            </form>
        </dialog>
    </div>
    
</template>

<script>
import Miniature from "@/views/Miniature.vue";
import axios from 'axios';

export default {
    data: function(){
        return {name: '',
        description: '',
        discussions: [],
        user: {},
        adding: false}
    },
    components: {
        Miniature
    },
    methods: {
        add: function(){
            let dataToSend = { "name": this.name,
                         "description": this.description};
            console.log(dataToSend);
            axios.post('http://localhost:3000/discussion', dataToSend);
                    //.then(response => (console.log(response)));
        },
        redirect: function(id){
            this.$router.push('/discussion?id='.concat(id));
        },
        addingModal: function(){
            this.adding = !this.adding;
        },
        login: function(){
            this.$router.push('/');
        },
        logout: function(){
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    },
    async mounted(){
        await axios.get('http://localhost:3000/discussion/all')
            .then(response => (this.discussions = response.data));

        console.log(this.discussions);

        let token = localStorage.getItem('token');

        await axios.get('http://localhost:3000/user/profile', { headers: { Authorization: 'Bearer '.concat(token) } })
        .then(response => {
            // If request is good...
            console.log(response.data);
            this.user = response.data;
        })
    }
}
</script>

<style scoped>
    body{
        background: #000028;
    }

    .featured {
        width: 70%;
        height: 90%;
    }

    .add {
        border-radius: 50%;
        color: white;
        font-size: 3em;
        background-color: grey;
        height: 7vw;
        width: 7vw;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 7vh;
        right:5vw;
    }
</style>