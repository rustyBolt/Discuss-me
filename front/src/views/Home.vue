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
      <Comment />
      <div class="vertical"></div>
      <Comment />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Comment from "@/views/Comment.vue";

export default {
  components: {
    Comment
  },
  mounted() {
      let id = this.$router.currentRoute._value.query.id;
      console.log(id);
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