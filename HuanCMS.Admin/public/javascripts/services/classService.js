(function(){
	angular.module('services')
		.factory('classService', classService);

	//Inject
	classService.$Inject = ['$http', '$q', 'logger', 'APIURL', 'DEBUG'];

	function classService($http, $q, logger, APIURL, DEBUG){
		var srevice = {
			get: get,
			sortClassesToTreeNodes: sortClassesToTreeNodes
		}

		function get(){
			var deferred = $q.defer();

			$http.get(APIURL + 'classes')
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		}

		function sortClassesToTreeNodes(classes){
			var treeNodes = [];
			angular.forEach(classes, function(classEntity, index){
				var idx = indexOf(treeNodes, classEntity.parentId);
				if(idx > -1){
					
				}
			});

			return treeNodes;
		}

		//Private indexOf
		function indexOf(items, parentId){
			for(var i = 0; i < items.length; i++){
				var item = items[i];

				if(item._id === parentId){
					return i;
				}
			}

			return -1;
		}; 

		return srevice;
	}
})();