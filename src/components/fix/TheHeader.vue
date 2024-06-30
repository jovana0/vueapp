<template>
    <header>
        <router-link to="/"><h1>Book Tracker</h1></router-link>
        <the-nav></the-nav>
    </header>
</template>
<script>
import TheNav from "./TheNav.vue";
export default{
    components:{
        TheNav
    }
}
</script>
<style scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
a{
    text-decoration: none;
    margin-left:10px
}
h1{
    font-style: italic;
    font-weight: bold;
    color:#543310;
}
</style>