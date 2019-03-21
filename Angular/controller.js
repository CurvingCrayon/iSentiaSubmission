app.controller("ArtGenerator",["$scope","node",function($scope, node){
    $scope.feed = [];
    $scope.createFeed = function(){
        node().then(function(data){
            console.log(data);
            $scope.feed.concat($scope.feed,data)
        },function(err){
            //$scope.
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