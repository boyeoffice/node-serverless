window.Vue = require('vue');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
Vue.use(require('vue-moment'))
window.toastr = require('toastr/toastr.js')
window.innerHeight = 800
window.toastr.options = {
    positionClass: "toast-bottom-right",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
}
axios.interceptors.response.use(function (response) {
    return response;
}, function(error) {
    if(error.response.status === 422){
        var messages = error.response.data
        messages.forEach(msg => {
            toastr.warning(msg) 
        });
    }
    if(error.response.status === 409){
        toastr.warning(error.response.data)
    }
    if(error.response.status === 404){
        toastr.warning(error.response.data)
    }
    if(error.response.status === 401){
        toastr.warning('Session expired')
        window.location = '/auth/login'
    }
    return Promise.reject(error)
});

require('admin-lte');
/*import EditUser from './components/EditUser.vue';
Vue.component('user-index', require('./components/UserIndex.vue').default);
Vue.component('create-user', require('./components/CreateUser.vue').default);
/*Vue.component('edit-user', {
    components: {
        EditUser
    }
})

const app = new Vue({
    el: '#app'
});
*/