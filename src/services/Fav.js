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


    return Fav;
});
