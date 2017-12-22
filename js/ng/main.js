var ngApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngCookies', 'satellizer']);

ngApp.constant("CONFIG", {
  "apiEndpoint": 'https://574b12c3.ngrok.io'
})

ngApp.config(function(CONFIG, $authProvider){
  $authProvider.baseUrl = CONFIG.apiEndpoint;
  $authProvider.loginUrl = '/login';
});

//router
ngApp.config(function ($routeProvider) {
    $routeProvider

        .when('/',
        {
            controller: 'PageOneController',
            templateUrl: 'ng-templates/musictrack_page1.html',
        })
        .when('/genres',
        {
            controller: 'PageTwoController',
            templateUrl: 'ng-templates/musictrack_page2.html',
        })
        .otherwise({ redirectTo: '/'});
});




ngApp.controller('LoadingController', function($scope) {
    //highlight right tab
    $scope.$on('$viewContentLoaded', function() {
        hideLoading();
    });
});

ngApp.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline; margin: 1px; padding-bottom: 15px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;

			// $scope.isolatedClick = function (param) {
			// 	if ($scope.readOnly == 'true') return;
      //
			// 	$scope.rating = $scope._rating = param;
			// 	$scope.hoverValue = 0;
			// 	$scope.click({
			// 		param: param
			// 	});
			// };

			// $scope.isolatedMouseHover = function (param) {
			// 	if ($scope.readOnly == 'true') return;
      //
			// 	$scope._rating = 0;
			// 	$scope.hoverValue = param;
			// 	$scope.mouseHover({
			// 		param: param
			// 	});
			// };

			// $scope.isolatedMouseLeave = function (param) {
			// 	if ($scope.readOnly == 'true') return;
      //
			// 	$scope._rating = $scope.rating;
			// 	$scope.hoverValue = 0;
			// 	$scope.mouseLeave({
			// 		param: param
			// 	});
			// };
        }
    };
});



//init when document ready
angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});
