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