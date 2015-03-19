'use strict';
angular.module('Favorites').factory('Fav', function() {

    function Fav(id,type,title,lis,thumbnail,url){
        this.id = id;
        this.type = type;
        this.title = title;
        this.lis = lis;
        this.thumbnail = thumbnail;
        this.url = url;
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
            $(element).find('.fav-image').first().attr('src'),
            $(element).find('.fav-url').first().attr('href')
        );

    };

    Fav.fromFavLink = function(element){


        if($(element).data('favid') && $(element).data('favtype'))
        {
            var id = $(element).data('favid'),

                type = $(element).data('favtype'),

                favItem = $('.fav-item[data-favid="'+id+'"][data-favtype="'+type+'"]');

            return $(favItem).data('fav');

        }

        var favItem = $(element).parents('.fav-item').first();

        if($(favItem).data('favjson'))
        {
            return Fav.fromJson($(favItem).data('favjson'));
        }

        return $(favItem).data('fav');

    };

    Fav.fromJson = function(json)
    {

        return new Fav(
            json.id,
            json.type,
            json.title,
            json.lis,
            json.thumbnail,
            json.url
        );

    };


    return Fav;
});
