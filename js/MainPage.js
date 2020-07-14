let app;

(function () {


let vueModel = {
    el: "#app",
    data: {}
};

window.onload = function () {

    let headerInfo = new HeaderInfo(vueModel);

    app = new Vue(vueModel);
}

})();