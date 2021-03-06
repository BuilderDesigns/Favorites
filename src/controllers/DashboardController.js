angular.module('Favorites').controller('DashboardController',function($scope,$http,$modal, MyFavorites){

    $scope.favorites = MyFavorites.favorites;

    $scope.open = function(){

        var dashboardModal = $modal.open({

            templateUrl: 'FavoritesDashboardModal',

            controller: 'DashboardInstanceController'

        });
    }




});

angular.module('Favorites').controller(
    'DashboardInstanceController',
    function($scope, $http, $modalInstance, MyFavorites, FavConfig,$templateCache,Print){

    $scope.favorites = MyFavorites.favorites;

    $scope.printuser = Print.printuser;

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };

    $scope.print = function(){

        Print.print();
    };


}).directive('favItem', ['MyFavorites','FavConfig',function(MyFavorites,FavConfig){

    return {
        templateUrl: 'templates/favoriteItem.html',

        link: function(scope, elem, attrs){

            scope.remove = function(fav)
            {
                MyFavorites.toggle(fav);
            }
        }

    };
}]);