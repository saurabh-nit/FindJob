
ngApp.controller('PageOneController', ['CONFIG', '$scope', '$location', '$window','$http', function(CONFIG, $scope, $location, $window, $http) {

  console.log('My Application');

  $scope.filterParams = {
    active : false,
    searchText : null
  };
    $scope.selectedCity1 = 'Select';
    $scope.selectedCity2 = 'Select';
    $scope.selectedCity3 = 'Select';
    $scope.selectedCity4 = 'Select';

    $scope.updateCityList = function (currentValue) {
        console.log('current:',currentValue);
        console.log('$scope.selectedCity1',$scope.selectedCity1);
        console.log('$scope.selectedCity2',$scope.selectedCity2);
        console.log('$scope.selectedCity3',$scope.selectedCity3);
        console.log('$scope.selectedCity4',$scope.selectedCity4);
        let index = null;
        // $scope.cityList.forEach(el =>{
        //     if(el.name === currentValue){
        //         index = $scope.cityList.indexOf(el);
        //         $scope.cityList.splice(index,1);
        //         console.log('Index',index, 'New Array:', $scope.cityList);
        //         return false
        //     }
        // });
    };

/********************************************************** GETTING MY TOKEN***************************************************************/
  $http({
    method : "POST",
    url : "https://find-job-assignment.herokuapp.com/token"
  }).then(function mySucces(response) {
    // console.log(response);
    console.log('GET API TOKEN',response);
    $scope.trackList = response.data.results;
    // console.log('songs',$scope.trackList );
    // myListBackUp = angular.copy($scope.trackList)

  }, function myError(response) {
    // console.log(response);
  });



/**********************************************************SEARCH ALL CITIES**********************************************************/
  $http({
    method : "GET",
    url : "https://find-job-assignment.herokuapp.com/cities"
  }).then(function mySucces(response) {
      console.log('SEARCH CITIES',response.data);
      $scope.cityList = response.data;
  }, function myError(response) {
    console.log(response);
  });






/****************************************SEARCH VEHICLES************************************/
$http({
  method : "GET",
  url : "https://find-job-assignment.herokuapp.com/vehicles"
}).then(function mySucces(response) {
  console.log('SEARCH VEHICLES',response.data);
   $scope.vehicleList = response.data;

}, function myError(response) {
  console.log(response);
});




/*****************************************EDIT TRACK RECORD**************************************/
// $http({
//   method : "POST",
//   url : "http://104.197.128.152:8000/v1/tracks/48",                             // ID 1 IS NOT FOUND SO USED ID 48
//   data : {
//     "id": 1,
//     "title": "animals",
//     "rating": 4.5,
//     "genres": [
//       1
//     ]
//   }
// }).then(function mySucces(response) {
//   console.log('EDIT',response);
// }, function myError(response) {
//   console.log(response);
// });


/****************************************SEARCH MUSIC FILTER******************************************/
  $scope.findMusic = function(){
    // alert("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    // console.log($scope.filterParams.searchText);
    $scope.filterParams.active = true;

    $scope.trackList = angular.copy(myListBackUp);

    if($scope.filterParams.searchText == ''){
      $scope.trackList.forEach(function(el, index){
        textFilter[index] = el;
      });
    }

    if ($scope.filterParams.searchText) {
      // console.log($scope.filterParams.searchText);
      textFilter = $scope.trackList.filter(function(el, index){
        if((el.title.search(new RegExp($scope.filterParams.searchText, 'i'))>-1)){
          // console.log('found');
          return el;
        }
      });
    }
    $scope.trackList = textFilter.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
  }


  $scope.resetFilter = function(){
    // alert('hiiiiiii+++++++++++');
    $scope.filterParams.active = false;
    $scope.filterParams.searchText = null;
    $scope.trackList = angular.copy(myListBackUp);
  }




/**************************************ADD NEW TRACK**********************************************/
$scope.addNewTrack = function(){
  // alert('add new Track')
  $http({
    method : "POST",
    url : "http://104.197.128.152:8000/v1/tracks",
    data : {
      "title": "animals",
      "rating": 4.5,
      "genres": [
        1
      ]
    }
  }).then(function mySucces(response) {
    console.log('Created Record',response);
    $scope.trackList.push(response.data);
    myListBackUp = angular.copy($scope.trackList);
    $scope.trackList = angular.copy(myListBackUp);
  }, function myError(response) {
    console.log(response);
  });



}


  /**************************************GO TO SECOND PAGE**********************************************/
    $scope.goToGenrePage = function(){
         alert('go to genre page')
         $location.path('/page2')
    }

}]);
