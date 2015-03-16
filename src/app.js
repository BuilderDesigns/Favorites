angular.module('Favorites', ['ui.bootstrap'])

.run(function($rootScope, MyFavorites, Fav) {

    $rootScope.favorites = MyFavorites.favorites;

    $rootScope.$watch('favorites', function(){
        console.log('favorites changed');
        MyFavorites.sync();

    }, true);

    $rootScope.favorite = function(fav,link_element)
    {

        if(MyFavorites.toggle(fav)) {

            $(link_element).addClass('disabled');

        } else {

            $(link_element).removeClass('disabled');
        }

    };

    $('.fav-link').each(function(){

        $(this).on('click',function(){

            if($(this).data('favid') && $(this).data('favtype'))
            {

                var id = $(this).data('favid'),

                    type = $(this).data('favtype'),

                    favItem = $('.fav-item[data-favid="'+id+'"][data-favtype="'+type+'"]'),

                    fav = $(favItem).data('fav');

                $rootScope.favorite(fav, this);

            } else {

                var favItem = $(this).parents('.fav-item').first(),

                    fav = $(favItem).data('fav');

                $rootScope.favorite(fav,this);

            }

            $rootScope.$digest();
            
        });
    });

    $rootScope.updateLinks = function(){

        $('.fav-item').each(function(){

            var fav = Fav.fromHTMLElement(this);

            $(this).data('fav',fav);

            if(MyFavorites.isFavored(fav)) {

                $(this).addClass('disabled');
            }
        });
    };

    $rootScope.updateLinks();

});