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
        for(var i = 0;i < this.favorites.length; i++)
        {
            if(fav.id == this.favorites[i].id)
            {
                this.remove(fav);
                return fav;
            }
        }
        this.add(fav);
    }

    this.add = function(fav){
        for(var i = 0;i < this.favorites.length; i++)
        {
            if(fav.id == this.favorites[i].id)
                return this.favorites[i];
        }
        this.favorites.push(fav);
        return fav;
    }

    this.remove = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++)
        {
            if(fav.id == this.favorites[i].id)
                this.favorites.splice(i,1);
        }
    }


    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


});