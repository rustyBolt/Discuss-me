<template>
    <div class="comment-content">
        <div class="name">{{namez}}</div>
        <div class="text">
            {{description}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Miniature',
        props: {
            namez: String,
            description: String
        }
    }
</script>
<style scoped>
    .comment-content{
        display: flex;
        flex-direction: column;
        color: white;
        padding: 10px;
    }
</style>