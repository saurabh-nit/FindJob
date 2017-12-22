
ngApp.controller('PageTwoController', ['CONFIG', '$scope', '$location', '$window','$http', function(CONFIG, $scope, $location, $window, $http) {
 var myListBackUp = []
  // alert('PAGE 2');

/************************************************** LIST ALL GENRES *******************************************************************/
$http({
  method : "GET",
  url : "http://104.197.128.152:8000/v1/genres"
}).then(function mySucces(response) {
  // console.log(response);
  console.log('ALL GENRES',response.data);
  $scope.trackList = response.data.results;
  myListBackUp = angular.copy($scope.trackList)
}, function myError(response) {
  console.log(response);
});





/************************************************** GET SINGLE GENRE RECORD ********************************************************/
$http({
  method : "GET",
  url : "http://104.197.128.152:8000/v1/genres/12"        // 12 is used because 11 is not found
}).then(function mySucces(response) {
  // console.log(response);
  console.log('SINGLE GENRE',response.data);
}, function myError(response) {
  console.log(response);
});



/************************************************* EDIT GENRE RECORD ***************************************************************/
$http({
  method : "POST",
  url : "http://104.197.128.152:8000/v1/genres/12",       // 12 is used because 11 is not found
  data : {
    "id": 11,
    "name": "bollywood"
}
}).then(function mySucces(response) {
  // console.log(response);
  console.log('EDIT GENRE RECORD',response.data);
}, function myError(response) {
  console.log(response);
});


/************************************************* ADD NEW GENRE RECORD ************************************************************/
  $scope.addNewGenre = function(){
    // alert('on click')
    $http({
      method : "POST",
      url : "http://104.197.128.152:8000/v1/genres",
      data : {
      "name": "bollywood"
    }
    }).then(function mySucces(response) {
      console.log(response.data);
      $scope.trackList.push(response.data);
      myListBackUp = angular.copy($scope.trackList);
      $scope.trackList = angular.copy(myListBackUp);

    }, function myError(response) {
      console.log(response);
    });

  }
}]);
