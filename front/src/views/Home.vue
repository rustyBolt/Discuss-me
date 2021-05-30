<template>
    <div class="featured">
        <div v-for="discussion in discussions" v-bind:key="discussion" v-on:click="redirect(discussion.id_discussion)">
            <Miniature :namez="discussion.name" :description="discussion.description"/>
        </div>
            <form v-on:submit.prevent="add()" method="POST">
                <input v-model="name" name="name" type="text" placeholder="name">
                <input v-model="description" name="description" type="text" placeholder="description">
                <button type='submit'>Add</button>
            </form>
    </div>
    
</template>

<script>
import Miniature from "@/views/Miniature.vue";
import axios from 'axios';

export default {
    data: function(){
        return {name: '',
        description: '',
        discussions: []}
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
        }
    },
    async mounted(){
        await axios.get('http://localhost:3000/discussion/all')
            .then(response => (this.discussions = response.data));

        console.log(this.discussions);
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
</style>