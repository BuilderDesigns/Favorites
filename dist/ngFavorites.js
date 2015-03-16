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
        };

        $rootScope.updateLinks = function(){
            $('.fav-link').each(function(){
                console.log('favorite looped');
                var fav = {
                    id: $(this).data('favid'),
                    type: $(this).data('favtype')
                };

                if(MyFavorites.isFavored(fav))
                {
                    $(this).addClass('disabled');
                }


            });
        }
        $rootScope.updateLinks();




    });
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

}).directive('invItem', ['MyFavorites', function(MyFavorites){

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
}]).directive('comItem', function(){
    return {
        template: '<div class="favorite-card">'+
        '<h4>{{com.com_name}}</h4>'+
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

    this.loadFavorites = function(callback)
    {
        var favs = this.favorites,
            that = this;



        $http.get('http://104.236.107.163/API/loadFavorites.php?fav='+JSON.stringify(this.favorites)).success(function(data){


            for(var i = 0;i < data.invs.length; i ++) {
                for(var x = 0;x < favs.length; x ++) {
                    if(data.invs[i].inv_id == favs[x].id && favs[x].type == 'inv') {
                        favs[x].data = data.invs[i];
                    }
                }
            }
            for(var i = 0;i < data.coms.length; i ++) {
                for(var x = 0;x < favs.length; x ++) {
                    if(data.coms[i].com_id == favs[x].id && favs[x].type == 'com') {
                        favs[x].data = data.coms[i];
                    }
                }
            }

            for(var i = 0;i < data.mods.length; i ++) {
                for(var x = 0;x < favs.length; x ++) {
                    if(data.mods[i].mod_id == favs[x].id && favs[x].type == 'mod') {
                        favs[x].data = data.mods[i];
                    }
                }
            }

            that.favorites = favs;
            if(callback)
            {
                callback();
            }
        });
    };

    this.favoriteInvs = function()
    {
        var favs = this.favorites,
            inv_favs = [];
        for(var x = 0;x < favs.length; x ++) {
            if(favs[x].type = 'inv') {
                inv_favs.push(fav[x]);
            }
        }
        return inv_favs;

    };

    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


});