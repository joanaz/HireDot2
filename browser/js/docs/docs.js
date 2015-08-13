app.config(function($stateProvider) {
  $stateProvider.state('docs', {
    url: '/docs',
    templateUrl: 'js/docs/docs.html'
  });
});

app.factory('UserFactory', function() {
  return {
    function getUsers() {

    }
  }
})