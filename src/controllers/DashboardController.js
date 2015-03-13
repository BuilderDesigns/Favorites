angular.module('Favorites').controller('DashboardController',function($scope,$http,$modal, MyFavorites){

    $scope.open = function(){

        var dashboardModal = $modal.open({
            templateUrl: 'dashboardModal.html',
            controller: 'DashboardInstanceController',
            resolve: {
                favorites: function(){
                    var promise = MyFavorites.loadFavorites();
                    promise.success(function(data){
                        return data;
                    });
                }
            }
        });

    }



});

angular.module('Favorites').controller('DashboardInstanceController',function($scope,$http,$modalInstance, favorites){

    console.log(favorites);

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).directive('favoriteItem', function(){
    return {
        template: '<div class="favorite-card">'+
                    '<h4>{{fav.name}}</h4>'+
                    '<p></p>'+
                   '</div>'
    };
});
