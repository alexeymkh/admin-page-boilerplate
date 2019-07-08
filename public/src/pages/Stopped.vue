<template>
    <div style="width: 100%; text-align: center;">
        <b-alert show variant="danger">
            Your account is stopped!
        </b-alert>  
        <a v-on:click="appLogout" variant="secondary" style="cursor: pointer">
            <b>Logout</b>
        </a>
    </div>
</template>

<script>

    export default {
        name: "stopped",
        components: {

        },
        props: [ ],
        data() {
            return {

            }
        },
        created() {
            
        },
        watch: {
            
        },
        methods: {
            appLogout (e) {
                e.preventDefault();
                this.$auth.logout({
                    makeRequest: false,
                    data: {},
                    success: function () {},
                    error: function () {},
                    redirect: '/login',
                });
            }
        }
    }
</script>

<style scoped>

</style>
