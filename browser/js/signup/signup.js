app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpController'
    });
});

app.controller('SignUpController', function($scope, $window, User, AuthService, $state) {
    $scope.createUser = function(userData) {
        User.signup(userData)
        .then(function(){
            AuthService.getLoggedInUser().then(function(user){
                if (user) $state.go('home');
            });
        });
    };
});