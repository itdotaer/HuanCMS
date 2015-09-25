(function(){
    'use strict';

    angular.module('left')
        .controller('LeftCtrl', LeftCtrl);

    //Inject
    LeftCtrl.$inject = [];

    function LeftCtrl(){
        $(".sidebar .treeview").tree();
    };
})();
