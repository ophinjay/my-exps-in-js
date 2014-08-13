var DataModule = angular.module("DataApp", []);

DataModule.factory("FetchDataService", ["$http",
    function($http) {

        function getData(src) {
            if (src == "array") {
                return ["This is data1", "This is data2", "This is data3", "This is data4", "This is data5", "This is data6", "This is data7", "This is data8", "This is data9"];
            } else if (src == "object") {
                return {
                    "data1": "This is data1",
                    "data2": "This is data2",
                    "data3": "This is data3",
                    "data4": "This is data4",
                    "data5": "This is data5",
                    "data6": "This is data6",
                    "data7": "This is data7",
                    "data8": "This is data8",
                    "data9": "This is data9"
                };
            } else if (src == "server") {
                return false;
            }
        }

        return {
            getData: getData
        };
    }
]);

DataModule.directive("listData", function() {
    return {
        restrict: "E",
        scope: {
            "datafrom": "@"
        },
        replace: true,
        template: "<div><div ng-repeat='data in getData()'>{{data}}</div></div>",
        controller: function($scope, $element, $attrs, FetchDataService) {

            $scope.getData = function() {
            	var dataSource = this["datafrom"];
                var data = FetchDataService.getData(dataSource);
                if (dataSource.toLowerCase() == "array" || Object.prototype.toString.call(data) == "[object Array]") {
                    return data;
                } else if (dataSource.toLowerCase() == "object" || Object.prototype.toString.call(data) == "[object Object]") {
                	var returnArr = [];
                	for(var i in data) {
                		returnArr.push(data[i]);
                	}
                	return returnArr;
                }
            };

        },
        compile: function(tempElmt, tempAttrs) {
        	debugger;
        	return function(scope, elmt, attrs) {
        		debugger;
        		$compile(elmt)(scope);
        	};
        }
    };
});
