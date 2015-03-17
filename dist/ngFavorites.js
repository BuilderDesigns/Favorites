angular.module('Favorites', ['ui.bootstrap'])

.run(function($rootScope, MyFavorites, Fav) {

    $rootScope.favorites = MyFavorites.favorites;

    $rootScope.setupLinks = function(){
        $('.fav-item').each(function(){
            var fav = Fav.fromHTMLElement(this);
            $(this).data('fav',fav);

        });
    };

    $rootScope.setupLinks();

    $rootScope.$watch('favorites', function(){

        MyFavorites.sync();

        $rootScope.updateLinks();

    }, true);


    $('.fav-link').each(function(){

        $(this).on('click',function(){

            var fav = Fav.fromFavLink(this);

            MyFavorites.toggle(fav);

            $rootScope.$digest();
        });
    });

    $rootScope.updateLinks = function(){

        $('.fav-link').each(function(){

            var fav = Fav.fromFavLink(this);

            if(MyFavorites.isFavored(fav)) {

                $(this).addClass('disabled');

            } else {

                $(this).removeClass('disabled');
            }
        });
    };





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
angular.module('Favorites').controller('FavoritesController',function($scope,$http){



});
'use strict';
angular.module('Favorites').factory('Fav', function() {

    function Fav(id,type,title,lis,thumbnail){
        this.id = id;
        this.type = type;
        this.title = title;
        this.lis = lis;
        this.thumbnail = thumbnail
    }


    Fav.fromHTMLElement = function(element){
        var id = $(element).data('favid'),
            type = $(element).data('favtype'),
            lis = [];

        $(element).find('.fav-li').each(function() { lis.push($(this).text()) });

        return new Fav(
            id,
            type,
            $(element).find('.fav-title').first().text(),
            lis,
            $(element).find('.fav-image').first().attr('src')
        );

    };

    Fav.fromFavLink = function(element){

        if($(element).data('favid') && $(element).data('favtype'))
        {
            var id = $(element).data('favid'),

                type = $(element).data('favtype'),

                favItem = $('.fav-item[data-favid="'+id+'"][data-favtype="'+type+'"]'),

                fav = $(favItem).data('fav');

        } else {

            var favItem = $(element).parents('.fav-item').first(),

                fav = $(favItem).data('fav');
        }

        return fav;
    };


    return Fav;
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
        if(this.isFavored(fav)) {

            this.remove(fav);

            return false;
        }

        this.add(fav);

        return true;
    };

    this.add = function(fav){

        if(this.isFavored(fav)) {

            return true;
        }

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


        if(callback) {

            callback();
        }

    };


    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


});