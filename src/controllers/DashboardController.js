angular.module('Favorites').controller('DashboardController',function($scope,$http,$modal){

    $scope.communities = [
        {
            name:'Com One'
        },
        {
            name: 'Com Two'
        },
        {
            name: 'Com Three'
        }
    ];


    $scope.open = function(){

        var dashboardModal = $modal.open({
            templateUrl: 'dashboardModal.html',
            controller: 'DashboardInstanceController',
            resolve: {
                communities: function () {
                    return $scope.communities;
                }
            }
        });

    }



});

angular.module('Favorites').controller('DashboardInstanceController',function($scope,$http,$modalInstance, communities){

    $scope.communities = communities;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).directive('favoriteItem', function(){
    return {
        template: '<div class="favorite-card">'+
                    '<h4>{{com.name}}</h4>'+
                    '<p></p>'+
                   '</div>'
    };
});
