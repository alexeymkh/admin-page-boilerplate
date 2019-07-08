<template>
    <div class="container-fluid">

        <b-table id='usersTable' show-empty hover striped bordered small :fields="fieldsForUsersTable" :items="getUsers" :current-page="currentPage" :per-page="perPage" ref="usersTable">
            
            <div slot="table-busy" class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>

            <template slot = "userName" slot-scope="row" >
                {{row.item.userName}} <span v-if="row.item._id == $auth.watch.data._id" class="text-success" > (you)</span>
            </template>   

            <template slot = "status" slot-scope="row" >
                <span v-if="row.item.status != 'stopped'" class="text-success" >{{row.item.status}}</span>
                <span v-else class="text-danger" >{{row.item.status}}</span>
            </template>   

            <template slot = "created_at" slot-scope="row" >
                {{editDate(row.item.created_at)}}
            </template>    

            <template slot="actions" slot-scope="data">

                <a  v-if="data.item.status != 'stopped' && data.item._id != $auth.watch.data._id"
                    class="text-danger" 
                    v-b-tooltip.hover
                    title="Stop user"
                    style="cursor: pointer"
                    @click="openStopUserModal(data.item._id)"
                >
                    stop,
                </a>
                
                <a v-else-if="data.item._id != $auth.watch.data._id"
                    class="text-success" 
                    v-b-tooltip.hover
                    title="Start user"
                    style="cursor: pointer"
                    @click="openStartUserModal(data.item._id)"
                >
                    start,
                </a>

                <a  
                    v-if="data.item._id != $auth.watch.data._id"
                    v-b-tooltip.hover
                    title="Delete user"
                    style="cursor: pointer"
                    @click="openDeleteUserModal(data.item._id)"
                >
                    delete,
                </a>

                <a
                    class="text-primary" 
                    v-b-tooltip.hover
                    title="Edit user"
                    style="cursor: pointer"
                    @click="setDefaulValuesInEditModal(data.item); openEditUserModal(data.item._id);"
                >
                    edit
                </a>


            </template>

        </b-table>
        <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage" v-model="currentPage"></b-pagination>        

        <b-row>
            <b-button v-b-modal.modalCreateNewUser variant="success" style='margin-bottom: 15px; margin-left: 15px;'>New user</b-button>
        </b-row>                

        <div>
            <b-modal id="modalCreateNewUser" @ok="createNewUser" @hidden="clearErrors" title="Create new user" size="lg" centered ok-title="Create" ref="modalCreateNewUser">
                <b-row>
                    <b-col>
                        Username <span style='color: red;'>*</span>
                        <b-form-group :invalid-feedback="errorMessage('userName')">
                            <b-form-input required aria-label="Small" type="text" v-model="newUser.userName" :state="isValid('userName')" ></b-form-input>
                        </b-form-group>
                        Email <span style='color: red;'>*</span>
                        <b-form-group :invalid-feedback="errorMessage('email')">
                            <b-form-input
                            v-model="newUser.email"
                            type="email"
                            required
                            placeholder="required"
                            :state="isValid('email')"
                            ></b-form-input>
                        </b-form-group>
                        Role <span style='color: red;'>*</span>
                        <b-form-select required size="sm" style="margin-bottom: 20px;" v-model="newUser.role" :options="roles" :state="isValid('role')" :invalid-feedback="errorMessage('role')"/>
                    </b-col>
                    <b-col>    
                        Password <span style='color: red;'>*</span>
                        <b-form-group :invalid-feedback="errorMessage('password')">
                            <b-form-input required aria-label="Small" type="password"  v-model="newUser.password" :state="isValid('password')" ></b-form-input>
                        </b-form-group>
                        Password confirmation <span style='color: red;'>*</span>
                        <b-form-group :invalid-feedback="errorMessage('passwordConfirmation')">
                            <b-form-input required aria-label="Small" type="password"  v-model="newUser.passwordConfirmation" :state="isValid('passwordConfirmation')"></b-form-input>
                        </b-form-group>
                    </b-col>  
                </b-row>
            </b-modal>
        </div>             

        <div>
            <b-modal id="modalEditUser" @ok="editUser" @hidden="clearErrors(); clearSelectedUser();" title="Edit user" size="lg" centered ok-title="Edit" ref="modalEditUser">
                <b-row>
                    <b-col>
                        Username
                        <b-form-group :invalid-feedback="errorMessage('userName')">
                            <b-form-input required aria-label="Small" type="text" v-model="editUserData.userName" :state="isValid('userName')" ></b-form-input>
                        </b-form-group>
                        Email
                        <b-form-group :invalid-feedback="errorMessage('email')">
                            <b-form-input
                            v-model="editUserData.email"
                            type="email"
                            required
                            :state="isValid('email')"
                            ></b-form-input>
                        </b-form-group>
                        Role
                        <b-form-select required size="sm" style="margin-bottom: 20px;" v-model="editUserData.role" :options="roles" :state="isValid('role')" :invalid-feedback="errorMessage('role')"/>
                    </b-col>
                    <b-col>    
                        Password
                        <b-form-group :invalid-feedback="errorMessage('password')">
                            <b-form-input required aria-label="Small" type="password"  v-model="editUserData.password" :state="isValid('password')" ></b-form-input>
                        </b-form-group>
                        <template v-if="editUserData.password.length">
                          Password confirmation <span style='color: red;'>*</span>
                          <b-form-group :invalid-feedback="errorMessage('passwordConfirmation')">
                              <b-form-input required aria-label="Small" type="password"  v-model="editUserData.passwordConfirmation" :state="isValid('passwordConfirmation')"></b-form-input>
                          </b-form-group>
                        </template>
                    </b-col>  
                </b-row>
            </b-modal>
        </div>

        <div>
            <b-modal 
                id="stop-user" 
                hide-header
                @ok="stopUser" 
                centered 
                ok-title="Yes" 
                cancel-title="Cancel" 
                ref="modalStopUser"
            >
            Stop this account?
            </b-modal>
        </div>

        <div>
            <b-modal 
                id="start-user" 
                hide-header
                @ok="startUser" 
                centered 
                ok-title="Yes" 
                cancel-title="Cancel" 
                ref="modalStartUser"
            >
            Start this account?
            </b-modal>
        </div>

        <div>
            <b-modal 
                id="Delete-user" 
                hide-header
                @ok="deleteUser" 
                centered 
                ok-title="Yes" 
                cancel-title="Cancel" 
                ref="modalDeleteUser"
            >
            Delete this account?
            </b-modal>
        </div>

    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'UsersList',
    data() {
        return {
            newUser: {
                userName: '',
                email: '',
                role: '',
                password: '',
                passwordConfirmation: ''                
            },
            editUserData: {
                userName: '',
                email: '',
                role: '',
                password: '',
                passwordConfirmation: ''                
            },
            roles: [
                { value: '', text: '--select--' },
                { value: 'user', text: 'User' },
                { value: 'admin', text: 'Admin' }
            ],
            fieldsForUsersTable: [
                { key: 'userName', label: 'Username' },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status' },,
                { key: 'email', label: 'Email' },
                { key: 'created_at', label: 'Created' },
                { key: 'actions', label: 'Actions' }
            ],
            users: [],
            selectedUser: '',

            totalRows: 0,
            currentPage: 1,
            perPage: 10,

            errors: {},
            errorMsg: '',
        }
    },
    mounted() {

    },
    methods: {
        getUsers() {          
            return this.$http.get(`/admin/user?page=${this.currentPage}&limit=${this.perPage}`)
                .then(res => {
                    this.users = res.data.users;
                    this.totalRows = res.data.totalDocs;
                    return res.data.users;
                })
                .catch(err => {
                    this.processErrors(err);
                });
        },
        openStopUserModal(user){
            this.selectUser(user);
            this.$refs.modalStopUser.show();
        },
        stopUser(evt) {
            evt.preventDefault();
            this.$http
                .put(`/admin/user/${this.selectedUser}/stop`)
                .then(res => {
                    this.clearSelectedUser();
                    this.$nextTick(() => {
                        this.$refs.modalStopUser.hide();
                        this.$root.$emit('bv::refresh::table', 'usersTable');
                    })
                })
                .catch(err => {
                    this.processErrors(err);
                });
        },
        openStartUserModal(user){
            this.selectUser(user);
            this.$refs.modalStartUser.show();
        },
        startUser(evt) {
            evt.preventDefault();
            this.$http
                .put(`/admin/user/${this.selectedUser}/start`)
                .then(res => {
                    this.clearSelectedUser();
                    this.$nextTick(() => {
                        this.$refs.modalStartUser.hide();
                        this.$root.$emit('bv::refresh::table', 'usersTable');
                    })
                })
                .catch(err => {
                    this.processErrors(err);
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
        editDate(dd) {
            return moment(dd).format('LLL');
        },
        createNewUser(evt){
            evt.preventDefault();
            this.$http.post('/admin/user/', this.newUser)
            .then(response => {
                this.clearErrors();
                this.$root.$emit('bv::refresh::table', 'usersTable');
                for (let key in this.newUser) {
                  this.newUser[key] = '';
                }
                this.$nextTick(() => {
                    this.$refs.modalCreateNewUser.hide();
                })
            })
            .catch(err => {
                this.processErrors(err);
            });
        },
        openEditUserModal(user){
            this.selectUser(user);
            this.$refs.modalEditUser.show();
        },
        editUser(evt){
            evt.preventDefault();
            let data = Object.assign({}, this.editUserData);
            for (let key in data) {
              !data[key].length ? data[key] = undefined : null;
            }

            if (data.password && !data.passwordConfirmation){
                data.passwordConfirmation = data.password + `a`;
            }

            this.$http.put(`/admin/user/${this.selectedUser}`, data)
            .then(response => {
                this.clearErrors();
                this.clearSelectedUser();
                this.$root.$emit('bv::refresh::table', 'usersTable');
                for (let key in this.editUserData) {
                  this.editUserData[key] = '';
                }
                this.$nextTick(() => {
                    this.$refs.modalEditUser.hide();
                })
            })
            .catch(err => {
                this.processErrors(err);
            });
        },
        openDeleteUserModal(user){
            this.selectUser(user);
            this.$refs.modalDeleteUser.show();
        },
        deleteUser(evt){
            evt.preventDefault();
            this.$http.delete(`/admin/user/${this.selectedUser}`)
            .then(response => {
                this.clearErrors();
                this.clearSelectedUser();
                this.$root.$emit('bv::refresh::table', 'usersTable');
                this.$nextTick(() => {
                    this.$refs.modalDeleteUser.hide();
                })
            })
            .catch(err => {
                this.processErrors(err);
            });
        },
        selectUser(user){
            this.selectedUser = user;
        },
        clearSelectedUser(){
            this.selectedUser = '';
        },
        clearErrors(){
            this.errors = {};
            this.errorMsg = '';
        },
        setDefaulValuesInEditModal(defaultValues){
            this.editUserData.userName = defaultValues.userName;
            this.editUserData.email = defaultValues.email;
            this.editUserData.role = defaultValues.role;
        }
    },
    watch: {
        'newUser.userName': function () {
            delete this.errors.userName;
        },
        'newUser.email': function () {
            delete this.errors.email;
        },
        'newUser.role': function () {
            delete this.errors.role;
        },
        'newUser.password': function () {
            delete this.errors.password;
        },
        'newUser.passwordConfirmation': function () {
            delete this.errors.passwordConfirmation;
        },
    }
}
</script>

<style>

</style>
