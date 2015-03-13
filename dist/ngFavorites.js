angular.module('Favorites', ['ui.bootstrap'])

    .run(function($rootScope,MyFavorites) {

        $rootScope.favorites = MyFavorites.favorites;
        $rootScope.$watch('favorites', function(){
            MyFavorites.sync();
        }, true);

        $rootScope.favorite = function($event)
        {
            var target = $event.currentTarget,
                id = $(target).data('favid'),
                type = $(target).data('favtype');
            if(MyFavorites.toggle({id:id,type:type}))
            {
                $(target).addClass('disabled');
            }else{
                $(target).removeClass('disabled');
            }
        }

        $('.fav-link').each(function(){

            var fav = {
                id: $(this).data('favid'),
                type: $(this).data('favtype')
            };

            if(MyFavorites.isFavored(fav))
            {
                $(this).addClass('disabled');
            }


        });


    });
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

angular.module('Favorites').controller('DashboardInstanceController',function($scope, $http, $modalInstance, favorites, MyFavorites){

    var promise = MyFavorites.loadFavorites();

    promise.success(function(data){
        $scope.favorites = data;
    });


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

angular.module('Favorites').controller('FavoritesController',function($scope,$http){



});
angular.module('Favorites').service('MyFavorites',function($http){

    this.favorites = [];

    if(window.localStorage.getItem('favorites') === null)
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    } else {
        this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }


    this.toggle = function(fav)
    {
        if(this.isFavored(fav))
        {
            this.remove(fav);
            return false;
        }

        this.add(fav);
        return true;
    };

    this.add = function(fav){

        if(this.isFavored(fav))
                return true;
        console.log(this.favorites);
        this.favorites.push(fav);

        return true;
    };

    this.remove = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++) {
            if (fav.id == this.favorites[i].id && fav.type == this.favorites[i].type) {
                this.favorites.splice(i, 1);
            }
        }

        return false;
    };

    this.isFavored = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++){
            if (fav.id == this.favorites[i].id && fav.type == this.favorites[i].type){
                return true;
            }
        }
        return false;
    };

    this.loadFavorites = function()
    {

        return $http.get('http://104.236.107.163/API/loadFavorites.php?fav='+JSON.stringify(this.favorites));
    };

    this.sync = function()
    {
        this.loadFavorites();
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


});