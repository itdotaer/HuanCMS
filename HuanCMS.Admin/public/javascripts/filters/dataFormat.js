(function(){
    angular.module('app')
        .filter('DateFormat', DateFormat);

    DateFormat.$inject = [];

    function DateFormat(){
        return function(input){
            return moment(input).format("YYYY-MM-DD HH:mm:ss")
        };
    }
})();
