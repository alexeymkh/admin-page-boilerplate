<template>
    <div>
        <template v-if="$auth.check()">     
            <h3>You are already authorized.</h3>       
            <router-link to="/users">Main page</router-link>
        </template>
        <template v-else>

            <b-container >
      
                <b-row align-v="start">
                <b-col>
                    <h1 style="text-align: center; margin: 20px;">Admin page boilerplate</h1>
                </b-col>
                </b-row>

                <b-row align-v="center">
                <b-col></b-col>
                <b-col>
                    <div id="login">
                    <h2 style="text-align: center; margin-top: -10px; margin-bottom: 15px;">Login</h2>
                    <span style="color: red;">{{ errorMsg }}</span>

                    <b-form v-on:submit.prevent="onSubmit">
                        
                        <b-form-group :invalid-feedback="errorMessage('email')">
                            <b-form-input
                            class="input-field"
                            id="input-email"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Your email"
                            :state="isValid('email')"
                            @keydown.enter.native="login()"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group :invalid-feedback="errorMessage('password')">
                            <b-input 
                            class="input-field"
                            id="input-password" 
                            v-model="form.password"
                            type="password" 
                            required
                            placeholder="Your password"
                            :state="isValid('password')"
                            @keydown.enter.native="login()"
                            ></b-input>
                        </b-form-group>

                        <b-button 
                        class="login-button"
                        variant="primary" 
                        v-on:click="login()"
                        >
                        Login
                        </b-button>

                    </b-form>

                    </div>

                </b-col>
                <b-col></b-col>
                </b-row>
                
            </b-container>
            
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    email: "",
                    password: ""
                },
                errors: {},
                errorMsg: ''
            };
        },
        methods: {
            login: function() {
                const vm = this;
                vm.errorMsg = '';             
                this.$auth.login({
                    data: this.form,
                    success: response => {
                        if (this.$auth.watch.data.role == "admin")
                            this.$router.push({ name: 'users' })
                        else if (this.$auth.watch.data.role == "user")
                            this.$router.push({ name: 'home' })
                        else
                            this.$router.push({ name: 'home' })
                    },
                    error: err => {
                        vm.processErrors(err);
                    }
                });
            },
            isValid: function (key) {
                return this.errors.hasOwnProperty(key) ? false : null;
            },
            errorMessage: function(key) {
                return this.errors.hasOwnProperty(key) ? this.errors[key].msg : '';
            }, 
            processErrors: function(err){
                console.log(err);
                if (err.response.status === 400) {
                    let errors = {};
                    err.response.data.additional.forEach(a=>errors[a.param] = {msg: a.msg});
                    this.errors = errors;
                }
                if (err.response.status === 401) {
                    this.errorMsg = err.response.data.error;
                    this.errors = {email: {msg: ""}, password: {msg: ""}};
                }
                if (err.response.status === 500) {
                    this.errorMsg = err.response.data.error.error;
                }
            },
        },
        watch: {
            'form.email': function () {
                delete this.errors.email;
            },
            'form.password': function () {
                delete this.errors.password;
            },
        }
    };
</script>

<style scoped>
    #login {
        width: 300px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        padding: 20px;
    }
</style>
