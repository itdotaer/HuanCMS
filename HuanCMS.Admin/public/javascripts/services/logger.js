(function () {
    'use strict';

    angular
        .module('services')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    function logger($log) {
        var msgCounter = 1;

        var service = {
            logSuccess: logSuccess,
            logInfo: logInfo,
            logError: logError,
            logWarning: logWarning,
            logList: []
        };

        return service;

        function logSuccess(text) {
            writeToastr("toast-bottom-right", "success", text);

            text = mkMsg(text);
            service.logList.push(text);
            $log.log(text);
        }

        function logInfo(text) {
            writeToastr("toast-bottom-right", "info", text);

            text = mkMsg(text);
            service.logList.push(text);
            $log.log(text);
        }

        function logError(text) {
            writeToastr("toast-bottom-right", "error", text);

            text = mkMsg(text);
            service.logList.push(text);
            $log.log(text);
        }

        function logWarning(text) {
            writeToastr("toast-bottom-right", "warning", text);

            text = mkMsg(text);
            service.logList.push(text);
            $log.error(text);
        }

        function mkMsg(text) {
            return msgCounter++ + ": " + text;
        }

        function writeToastr(position, type, msg) {
            toastr.options.closeButton = true;
            toastr.options.positionClass = position;
            toastr[type](msg);
        };
    }
})();
