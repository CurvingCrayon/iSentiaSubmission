//https://api.flickr.com/services/feeds/photos_public.gne
app.factory("node",["$http",function($http){
   return function(msg){
        return $http.get("/request") //Start a new feed request
        .then(function(data){ //If successful sent
            //return data.data;
            if(data.data === "received"){ //If successfully received
                return new Promise(function(resolve,reject){ //Tell the parent to wait for the promise of the request being fully processed
                    setInterval(function(){ //Continually poll the status of the feed request
                       $http.get("/poll")
                        .then(function(data){
                            if(data.data !== "false"){ //If poll doesn't return "false" flag
                                resolve(data.data); //Resolve the promise with its data
                            }
                        },
                        function(err){
                            reject(Error(err));
                        });
                    },1000);
                });
            }
        },
        function(err){
            return err;
        });
        
    }
}]);