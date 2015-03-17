angular.module('Favorites').controller('DashboardController',function($scope,$http,$modal, MyFavorites){

    $scope.open = function(){

        var dashboardModal = $modal.open({

            templateUrl: 'dashboardModal.html',

            controller: 'DashboardInstanceController'

        });
    }
});

angular.module('Favorites').controller('DashboardInstanceController',function($scope, $http, $modalInstance, MyFavorites){

    var removeLoading = function(){
        $('#loading-overlay').hide();
    };

    MyFavorites.loadFavorites(removeLoading);

    $scope.favorites = MyFavorites.favorites;

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };

}).directive('favItem', ['MyFavorites', function(MyFavorites){

    return {
        template: '<h4>{{inv.data.inv_address}}</h4>'
                +'<img ng-src="{{inv.data.inv_image}}"width="50" /><br/>'
                +'<button ng-click="remove(inv)">Remove</button>',

        link: function(scope, elem, attrs){

            scope.remove = function(inv)
            {
                MyFavorites.toggle({
                    type:"inv",
                    id:inv.id
                });
            }
        }

    };
}]);