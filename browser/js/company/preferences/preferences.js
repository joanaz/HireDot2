app.config(function($stateProvider) {
    $stateProvider.state('company-preferences', {
        url: '/company/preferences',
        templateUrl: 'js/company/preferences/preferences.html',
        controller: 'PreferencesController',
        resolve: {
            students: (User) =>
                User.getStudents(),
            companies: (User) =>
                User.getCompanies()
        }
    })
});