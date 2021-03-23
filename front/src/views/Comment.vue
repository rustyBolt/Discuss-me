<template>
    <div class="comment-content">
        <div class="left">
            <img src="img/avatar.png">
        </div>
        <div class="right">
            <div class="name">Name</div>
            <div class="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Comment'
    }
</script>
<style scoped>
    .comment-content{
        display: flex;
        flex-direction: row;
        background: black;
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