<template>
  <div class="home">
    <div class="upper-part">
      <div class="back">
      </div>
      <div class="logo">
      </div>
      <div class="hub">
        <div class="name">{{data.name}}</div>
        <div class="description">{{data.description}}</div>
        <button class="log" v-if="user.userId" v-on:click="logout()">Logout</button>
        <button class="log" v-else v-on:click="login()">Login</button>
      </div>
    </div>
    <hr>
    <div class="content">
      <div class="groups">
        <div class="add" v-on:click="groupAddingModal()">
          +
        </div>
        <div v-for="group in data.groups" v-bind:key="group">
          <div class="group" v-on:click="pop(group)">
            {{group.name[0]}}
          </div>
        </div>
      </div>
      <div class="vertical"></div>
      <div class="section">
        <form v-if="!user.userId">You must be logged in to comment</form>
        <form v-else v-on:submit.prevent="add('comment')" method="POST">
            <input v-model="content" name="content" type="text" placeholder="Write a comment">
            <button type='submit'>Add</button>
        </form>
        <div class="comments">
          <div v-for="comment in data.comments" v-bind:key="comment" v-on:click="answ(comment.id_comment)">
                <Comment :username="comment.username" :content="comment.content" v-if="comment.answer_to == null"/>
                  <div v-for="answer in answers[comment.id_comment]" v-bind:key="answer">
                    <div class="answered">
                      <div class="space"></div>
                      <Comment :username="answer.username" :content="answer.content"/>
                    </div>
                  </div>
          </div>
        </div>
      </div>
      <dialog className="dialog" style="position: 'absolute'" open v-if="answering">
        <button v-on:click="closeAnswer()">x</button>
        <form v-if="!user.userId">You must be logged in to answer</form>
        <form v-else v-on:submit.prevent="add('answer')" method="POST">
            <input v-model="content" name="content" type="text" placeholder="Write an answer">
            <button type='submit'>Add</button>
        </form>
      </dialog>
      <dialog className="dialog" style="position: 'absolute'" open v-if="addingGroup">
        <button v-on:click="groupAddingModal()">x</button>
        <form v-if="user.userId" v-on:submit.prevent="addGroup()" method="POST">
            <input v-model="groupName" name="content" type="text" placeholder="Name a group">
            <input v-model="groupDescription" name="content" type="text" placeholder="Describe a group">
            <button type='submit'>Add</button>
        </form>
        <form v-else>You must be logged in to create a group</form>
      </dialog>
      <dialog className="groupDialog" style="position: 'absolute'" open v-if="poped">
          <button v-on:click="closePop()">x</button>
          <text class="groupName">{{groupSelected.name}}</text>
          <text>{{groupSelected.description}}</text>
          <div v-if="!user.userId">You must be logged in to join a group</div>
          <button v-else-if="joined" v-on:click="leave(groupSelected.id_group)">Leave</button>
          <button v-else v-on:click="join(groupSelected.id_group)">Join</button>
      </dialog>
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
      answer: null,
      groupName: '',
      groupDescription: '',
      poped: false,
      groupSelected: {},
      joined: false,
      addingGroup: false,
      answering: false
    }
  },
  components: {
    Comment
  },
  methods: {
    add: function(mode){
        let dataToSend = {
          id_discussion: this.data.id_discussion,
          username: this.user.username,
          content: this.content
        };

        console.log(dataToSend);

        if (mode == 'comment'){
          dataToSend['answer_to'] = null;
        }
        else {
          dataToSend['answer_to'] = this.answer;
        }

        console.log(dataToSend);
        axios.post('http://localhost:3000/discussion/comment', dataToSend)
                .then(response => {
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
      this.answering = !this.answering;
    },
    addGroup: function(){
      let dataToSend = {
        id_user: this.user.userId,
        username: this.user.username,
        id_discussion: this.data.id_discussion,
        name_discussion: this.data.name,
        description_discussion: this.data.discussion,
        name: this.groupName,
        description: this.groupDescription
      };

      axios.post('http://localhost:3000/discussion/group', dataToSend)
        .then(response => this.data.groups.push(response.data));
    },
    pop: function(group){
      this.groupSelected = group;
      this.poped = !this.poped;
      for (const user of group.users){
        if (user.id_user === this.user.userId){
          this.joined = true;
        }
      }
    },
    closePop: function(){
      this.poped = !this.poped;
      this.joined = false;
    },
    leave: function(id){
      let dataToSend = {
        id_group: id,
        id_user: this.user.userId
      };

      axios.post('http://localhost:3000/discussion/leave', dataToSend);

      this.joined = false;
    },
    join: function(id){
      let dataToSend = {
        id_group: id,
        id_user: this.user.userId,
        username: this.user.username
      };

      axios.post('http://localhost:3000/discussion/join', dataToSend);

      this.joined = true;
    },
    groupAddingModal: function(){
      this.addingGroup = !this.addingGroup;
    },
    closeAnswer: function(){
      this.answering = !this.answering;
    },
    login: function(){
      this.$router.push('/');
    },
    logout: function(){
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  async mounted() {
      let id = this.$router.currentRoute._value.query.id;
      console.log(id);
      await axios.post('http://localhost:3000/discussion/one', {id: id})
        .then(response => (this.data = response.data));

      for (const com of this.data.comments){
        if (com.answer_to == null){
          this.answers[com.id_comment] = [];
        }
        else {
          this.answers[com.answer_to].push(com);
        }
      }

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
    flex-direction: column;
    height: 15vh;
    width: 100vw;
    align-items: center;
  }

  .hub{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .name{
    font-size: 2em;
  }

  .log{
    width: 10%;
    height: 7%;
    border: none;
    border-radius: 10px;
    background: black;
    color: white;
    position: absolute;
    top: 3vh;
    right: 5vw;
    font-size: 1.3em;
  }

  .vertical{ 
    border-left: 3px solid white; 
    height: 500px; 
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

  .section{
    width: 90vw;
    display: flex;
    flex-direction: column;
  }

  .comments{
    width: 90%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    color: white;
    overflow: scroll;
  }

  .answered{
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .space{
    width: 4vw;
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
    overflow: scroll;
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

  input{
    width: 60vw;
    height: 5vh;
    background: none;
    color: white;
    border-top: none;
    border-right: none;
    border-left: none;
    font-size: 1em;
  }

  button{
    width: 5vw;
    height: 5vh;
    border: none;
    border-radius: 10px;
    background: black;
    color: white;
    font-size: 1em;
  }

  dialog{
    background: grey;
    border-radius: 10px;
  }

  dialog>form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .groupDialog{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .groupName{
    font-size: 1.5em;
  }

  @media screen and (max-width: 800px) {
  .content{
    flex-direction: column;
  }

  .vertical{
    display: none;
  }

  button{
    width: 30vw;
  }

  .logo{
    height: 10vh;
  }

  .log{
    width: 30%;
  }

  .groups{
    display:flex;
    flex-direction: row;
    justify-content: left;
    width: 100%;
  }

  .add{
    width: 30vw;
    height: 30vw;
  }

  .group{
    width: 30vw;
    height: 30vw;
    justify-content: none;
  }

  .comments{
    width:100%;
  }

  .space{
    width: 6vw;
  }

  dialog{
    top: 40vh;
  }
}
</style>