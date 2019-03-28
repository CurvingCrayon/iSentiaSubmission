app.controller("ArtGenerator",["$scope","node",function($scope, node){
    $scope.allowRequest = true; //Defines whether the "get feed" button is enabled

    $scope.feed = [];
    $scope.createFeed = function(){
        $scope.allowRequest = false;
        node().then(function(data){
            console.log(data);
            $scope.feed = $scope.feed.concat(data);
            $scope.allowRequest = true;
        },function(err){
            $scope.createError(err);
        });
        
    }
    $scope.focus = {

    }
    $scope.errors = [];
    $scope.closeAlert = function(alertIndex){
        $scope.errors.splice(alertIndex,1);
    }
    $scope.createError = function(errMessage){
        $scope.errors.append(errMessage);
    }
    $scope.focusImage = function(index){
        $scope.focus = $scope.feed[index];
    }
}]);