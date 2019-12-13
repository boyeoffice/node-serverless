<template>
    <div class="content">
    <div class="row">
        <div class="col-md-8">
            <div class="box box-solid">
                <div class="box-header with-border">
                    <h3 class="box-title">Create user</h3>
                </div>
                <div class="box-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="name" class="col-lg-4">
                                Full Name
                                <i class="fa fa-info-circle uses-tooltip" 
                                    data-toggle="tooltip" 
                                    data-original-title="Full Name"></i>
                            </label>
                            <div class="col-lg-8">
                                <input type="text" v-model="form.name" class="form-control" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-lg-4">
                                Email
                                <i class="fa fa-info-circle uses-tooltip" 
                                    data-toggle="tooltip" 
                                    data-original-title="Full Name"></i>
                            </label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" v-model="form.email">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-lg-4">
                                Password
                                <i class="fa fa-info-circle uses-tooltip" 
                                    data-toggle="tooltip" 
                                    data-original-title="Full Name"></i>
                            </label>
                            <div class="col-lg-8">
                                <input type="password" v-model="form.password" class="form-control" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-lg-4">
                                Repeat Password
                                <i class="fa fa-info-circle uses-tooltip" 
                                    data-toggle="tooltip" 
                                    data-original-title="Full Name"></i>
                            </label>
                            <div class="col-lg-8">
                                <input type="password" v-model="form.confirmPassword" class="form-control" >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="box-footer">
                    
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="box box-solid">
                <div class="box-header with-border">
                    <a href="/cp/users" class="btn btn-default">Back</a>
                    <div class="pull-right">
                        <button v-if="vissibleButton" class="btn btn-primary" @click="createUser">Update</button>
                        <button v-else class="btn btn-primary" >Please wait...</button>
                    </div>
                </div>
                <div class="box-body">
                    <div class="form-group">
                        <label for="user_type">User Type</label>
                        <select2 v-model="form.user_type">
                            <option value="">-- Select --</option>
                            <option value="admin">Administrator</option>
                            <option value="user">User</option>
                        </select2>
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select2 v-model="form.status">
                            <option value="">-- Select --</option>
                            <option value="active">Activate</option>
                            <option value="deactivated">Deactivate</option>
                        </select2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
    import Select from './Select2'
    export default {
        components: {
           /// Select2
        },
        data: function(){
            return{
                form: {},
                errors: [],
                method: 'post',
                vissibleButton: true
            }
        },
        methods: {
            createUser(){
                this.vissibleButton = false
                axios[this.method]('/cp/users/store', this.form).then(response => {
                    window.location = '/cp/users'
                }).catch((error) => {
                    this.vissibleButton = true
                    //console.log(error)
                    this.errors = error
                })
            }
        }
    }
</script>
