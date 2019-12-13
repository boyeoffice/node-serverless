<template>
    <div class="row">
        <div class="col-md-12">
            <div class="box box-solid">
                <div class="box-header with-border">
                    <h3 class="box-title">Users</h3>
                </div>
                <div class="box-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th v-for="(th, index) in theads" :key="index">{{th}}</th>
                            </tr>
                        </thead>
                        
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['users'],
        data(){
            return{
                theads: ['Name','Email','Date','User Type','Staus','Actions']
            }
        }
    }
</script>