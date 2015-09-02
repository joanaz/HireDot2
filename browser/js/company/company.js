app.config(function($stateProvider) {
    $stateProvider.state('company', {
        url: '/company',
        templateUrl: 'js/company/company.html',
        resolve: {
            companies: (User) => User.getCompanies()
        },
        controller: ($scope, companies, User) => {
            // var newphotos = [{
            //     fullName: "Do Something",
            //     "photo": "https://lh3.googleusercontent.com/-UOEmRH7BWMU/AAAAAAAAAAI/AAAAAAAAAAA/xbTo2c4KFjE/s0-c-k-no-ns/photo.jpg"
            // }, {
            //     "fullName": "Visa",
            //     "role": "Company",
            //     "photo": "https://pbs.twimg.com/profile_images/593186410535849984/gELngik-.jpg",
            // }, {
            //     "fullName": "Accenture",
            //     "role": "Company",
            //     "photo": "http://education-and-career.com/wp-content/uploads/2015/03/accenture2.png",
            // }, {
            //     "fullName": "American Express",
            //     "role": "Company",
            //     "photo": "http://2.bp.blogspot.com/-Aj00BsuZeUI/VAU1EqgY-MI/AAAAAAAANt0/PrSGPrP_QHk/s1600/Amex.png",
            // }]

            // companies.forEach(company => {
            //     newphotos.forEach(newphoto => {

            //         if (company.fullName === newphoto.fullName) {

            //             User.changeCompanyPhoto(company._id, newphoto.photo)
            //         }
            //     })
            // })

            $scope.companies = companies;

        }
    });
});