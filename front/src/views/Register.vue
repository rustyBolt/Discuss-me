<template>
    <div class="whole">
        <div class="back">
            <div class="logo"></div>
            <input placeholder="e-mail">
            <input placeholder="password">
            <input placeholder="repeat password">
            <input placeholder="username">
            <div class="file-input">
                Add profile image
                <input type="file" accept="image/*" placeholder="image">
            </div>
            <button>Create account</button>
        </div>
    </div>
</template>
<script>

export default {
    
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
        height: 10%;
        border: none;
        border-radius: 10px;
        margin: 15px;
    }

    input[type=file]{
        height: 80%;
    }

    button{
        width: 20%;
        height: 10%;
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