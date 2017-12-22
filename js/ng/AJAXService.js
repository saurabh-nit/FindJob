ngApp.factory('AJAXService',function($http){
    
    //exposed object
    var AJAXService = {};
    var httpErrorResponse = function(st) {
      return {success:false, status:st};
    }
    AJAXService.getTredingSubReddits = function() {
    	return $http({
                method : "GET",
                url : "https://www.reddit.com/r/trending_subreddits.json"
            }).then(function mySucces(response) {
            	console.warn(response);
                return {success:true, data:response.data};
            }, function myError(response) {
                console.warn(response);
                return httpErrorResponse(response.status);
            });
    }

    return AJAXService;
});