window.onload = function () {
    let accessLogin = "powermobility";
    let accessPassword = "dtkrfvb33";

    function CheckAndRedirect(_this)
    {
        if (_this.login.length != 0 && _this.password.length != 0 &&
            _this.login == accessLogin && _this.password == accessPassword
        )
        {
            $.cookie("login", 1);

             //this.$refs.sendReply.click();
             document.location.href = "index.html";
        } else {

            $.removeCookie("login");

            alert('Invalid login or password');
        }
    }

    let app  = new Vue({
        el: '#app',
        data: {
            login: '',
            password: ''
        },
        methods: {
            enterKeyUp() {
                CheckAndRedirect(this);
            },
            OnLogin() {
                CheckAndRedirect(this);
            }
        }
    });
}