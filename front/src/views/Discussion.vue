<template>
  <div class="home">
    <div class="upper-part">
      <div class="back">
      </div>
      <div class="logo">
      </div>
      <div class="hub">
      </div>
    </div>
    <hr>
    <div class="content">
      <div class="groups">
        <div class="group">
          G
        </div>
        <div class="add">
          +
        </div>
      </div>
      <div class="vertical"></div>
      <div v-for="comment in data.comments" v-bind:key="comment" v-on:click="answ(comment.id_comment)">
            <Comment :username="comment.username" :content="comment.content" v-if="comment.answer_to == null"/>
            <div v-for="answer in answers[comment.id_comment]" v-bind:key="answer">
              <Comment :username="answer.username" :content="answer.content"/>
            </div>
        </div>
      <form v-on:submit.prevent="add('comment')" method="POST">
          <input v-model="content" name="content" type="text" placeholder="Write a comment">
          <button type='submit'>Add</button>
      </form>
      <form v-on:submit.prevent="add('answer')" method="POST">
          <input v-model="content" name="content" type="text" placeholder="Write an answer">
          <button type='submit'>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Comment from "@/views/Comment.vue";
import axios from 'axios';

export default {
  data: function(){
    return {
      data: {},
      content: '',
      user: {},
      answers: {},
      answer: null
    }
  },
  components: {
    Comment
  },
  methods: {
    add: function(mode){
        let dataToSend = {
          id: this.data.id_discussion,
          username: this.user.username,
          content: this.content
        };

        if (mode == 'comment'){
          dataToSend['answer_to'] = null;
        }
        else {
          dataToSend['answer_to'] = this.answer;
        }

        console.log(dataToSend);
        axios.post('http://localhost:3000/discussion/comment', dataToSend)
                .then(response => {
                  response.data.id_comment = -1;
                  if (mode == 'comment'){
                    this.data.comments.unshift(response.data);
                  }
                  else {
                    this.answers[dataToSend['answer_to']].push(response.data);
                  }
                  
                  });

        this.content = '';
    },
    answ: function(id){
      this.answer = id;
      console.log(this.answer);
    }
  },
  async mounted() {
      let id = this.$router.currentRoute._value.query.id;
      console.log(id);
      await axios.post('http://localhost:3000/discussion/one', {id: id})
        .then(response => (this.data = response.data));
      
      console.log(this.data);

      for (const com of this.data.comments){
        if (com.answer_to == null){
          this.answers[com.id_comment] = [];
        }
        else {
          this.answers[com.answer_to].push(com);
        }
      }

      console.log(this.answers);

      let token = localStorage.getItem('token');

      await axios.get('http://localhost:3000/user/profile', { headers: { Authorization: 'Bearer '.concat(token) } })
      .then(response => {
          // If request is good...
          console.log(response.data);
          this.user = response.data;
      })

      console.log(this.user);
  }
}

</script>
<style>
  body{
    background: #000028;
  }

  hr{
    color: white;
    width: 98%;
    size: 3;
  }

  .home{
    width: 100%;
    height: 100%;
  }

  .upper-part{
    display: flex;
    flex-direction: row;
    height: 10%;
  }

  .vertical{ 
    border-left: 3px solid white; 
    height: 200px; 
  }

  .content{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;
  }

  .groups{
    width: 10%;
    height: 100%;
  }

  .comments{
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: row;
    color: white;
  }

  .answered{
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: row;
    color: white;
  }

  .left{
    width: 10%;
  }

  .right{
    width: 80%;
  }

  .name{
    justify-content: left;
  }

  img{
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .groups{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .group{
    border-radius: 50%;
    color: white;
    background-color: brown;
    font-size: 3em;
    height: 7vw;
    width: 7vw;
    display: flex;
    align-items: center;
    justify-content: center
  }

  .add{
    border-radius: 50%;
    color: white;
    font-size: 3em;
    background-color: grey;
    height: 7vw;
    width: 7vw;
    display: flex;
    align-items: center;
    justify-content: center
  }
</style>