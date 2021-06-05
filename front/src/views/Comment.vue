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
        background: #51575e;
        border-radius: 10px;
        width: 100%;
        margin-top: 6px;
    }

    .left{
        width: 10%;
    }

    .right{
        display: flex;
        flex-direction: column;
        width: 90%;
        align-items: left;
    }

    img{
        border-radius: 50%;
    }
</style>