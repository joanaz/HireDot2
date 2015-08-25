app.config(function($stateProvider) {
    $stateProvider.state('company-preferences', {
        url: '/company/preferences',
        templateUrl: 'js/company/preferences/preferences.html',
        resolve: {
            user: (AuthService, User) =>
                AuthService.getLoggedInUser()
                .then(user => User.getUserById(user._id))
        },
        controller: ($scope, user, PreferencesFactory) => {
            $scope.user = user;

            console.log(user)

            $scope.submit = () => {
                let preferences = $scope.user.preferences.map(preference => preference._id)

                PreferencesFactory.savePreferences($scope.user._id, preferences)
            }
        }
    })
});