require("../../libraries/angular.min.js");
require("../../node_modules/angular-mocks/angular-mocks.js");
require("../../Angular/app.js");
require("../../Angular/controller.js");
require("../../Angular/service.js");
var nock = require("nock");
describe("Angular's back-end interfacing service",function(){
    // //var app;
    // beforeEach(function(){
    //         angular.mock.module("pickr")
    //     }
    // )
    // beforeEach(angular.mock.inject(function(_$controller_){
    //     $controller = _$controller_;
    // }));
    
    // it("sends a data request to /request",async () => {
    //     expect.assertations(1);
    //     nock("*")
    //     .get("/request")
    //     .reply(200,{
    //         data:"testPacket"
    //     })
    //     var $scope = {};
    //     var controller = $controller("ArtGenerator",{$scope: $scope});
    //     var returnData = await _node();
    //     console.log(returnData);
    // });
    beforeEach(module("pickr"));

    var $controller, $rootSCope;

    beforeEach(inject(function(_$controller_, _$rootScoe){
        $controller = $_controller;
        $rootScope = $_rootScope;
    }))

    it("service test", function(){
        var $scope = $rootScope.$new();
        var controller = $controller("ArtGenerator", { $scope: $scope });
        expect($scope.allowRequest).toBe(true);
        //expect($scope.strength).toEqual('strong');
    });
});