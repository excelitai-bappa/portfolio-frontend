<template>
  <div>
      
  </div>
</template>

<script>
export default {
    name: "Logout",
    created(){
        this.$store.dispatch('admin-logout').then( () => {
                this.$router.push({
                    name:'admin-login'
                })
            })
    }  
}
</script>
<style scoped>

</style>
