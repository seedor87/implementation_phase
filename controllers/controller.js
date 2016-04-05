var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',

        function($scope, $http) {

        //console.log("Hello World from controller");                                                

        var goTo = function() {
                $http.get('/brackets').success(function (response) {
                        console.log(angular.toJson(response));
                });
        };

	var refresh = function() {
            $http.get('/contactlist').success(function (response) {
		    console.log("data recieved");
		    $scope.contactList = response;
		    $scope.contact = "";
		    $scope.focus = angular.fromJson(window.localStorage['focus']);
		    console.log($scope.focus);
		});
        };

        var log_in = function() {
            console.log("trying");
            $http.get('/users').success(function (response) {
		    console.log("Login Successful");
		});
        };

        refresh();
        
        $scope.addContact = function() {
            console.log($scope.contact);
            $http.post('/contactlist', $scope.contact).success(function (response) {
		    console.log(response);
		    refresh();
		});
        };

        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/contactlist/' + id).success(function (response) {
		    refresh();
		});
        };

        $scope.edit = function(id) {
            console.log(id);
            $http.get('/contactlist/' + id).success(function (response) {
		    $scope.contact = response;
		});
        };

        $scope.update = function() {
            console.log($scope.contact._id);
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
		    refresh();
		});
            
        };

        $scope.deselect = function() {
            $scope.contact = "";
        };

        $scope.view = function(id) {
            console.log("view called on" + id);
            $http.get('/view/' + id).success(function (response) {
		    window.localStorage['focus'] = angular.toJson(response);
		    console.log(angular.toJson(response));
		    console.log(focus);
		    window.location.href = '/view.html';
		});
        };

        $scope.back = function() {
            console.log("going back");
            window.location.href = '/brackets.html';
        };

        $scope.home = function() {
            console.log("going home");
            window.location.href = '/navigate.html';
        };

        $scope.goTo = function() {
            console.log("going to brackets");
            window.location.href = '/brackets.html';
        };

        $scope.login = function() {
            console.log("login successful");
            window.location.href = '/navigate.html'
        };

        $scope.logout = function() {
            console.log("Logging Out");
            window.location.href = '/index.html'
        };

}]);
