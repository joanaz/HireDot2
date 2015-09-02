app.config(function($stateProvider) {
  $stateProvider.state('admin-time-slots', {
    url: '/admin-time-slots',
    templateUrl: 'js/admin/directives/time-slots/admin-time-slots.html',
    controller: 'TimeSlotsCtrl',
    resolve: {
      students: (User) => User.getStudentsAttendingHiringDay(),
      companies: (User) => User.getCompaniesAttendingHiringDay()
    }
  });
});