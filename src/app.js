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