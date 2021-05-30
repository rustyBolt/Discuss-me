<template>
    <div class="comment-content">
        <div class="left">
            <img src="@/img/avatar.png">
        </div>
        <div class="right">
            <div class="username">{{username}}</div>
            <div class="content">
                {{content}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Comment',
        props: {
            username: String,
            content: String
        }
    }
</script>
<style scoped>
    .comment-content{
        display: flex;
        flex-direction: row;
        color: white;
    }

    .left{
        width: 10%;
    }

    .right{
        width: 90%;
    }

    img{
        border-radius: 50%;
    }
</style>