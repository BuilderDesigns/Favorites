# Overview
The ngFavorites system is a standalone angular module that allows a user to save stuff to favorites, then view the favorites in a dashboard area, and email them to themselves and/or others.  

# Installation
1. Clone the repo into the web root.  
2. cd into the directory and run: `bower install`
3. Paste the following into the footer before the `</body>` tag.
```html
<script src="ngFavorites/dist/lib.min.js"></script>
<script src="ngFavorites/dist/templates.js"></script>
<script src="ngFavorites/dist/ngFavorites.js"></script>
```

4. Inject 'Favorites' as a dependency of your ng-app  
```javascript
angular.module('WebApp',['Favorites']);
```

# Setup
There are 2 ways to make an item a "fav item" that can be managed by the favorites system:
1. CSS Classes:
```html
<div class="fav-item" data-favid="1778947" data-favtype="Homes">
    <img class="fav-image" src="http://www.builderpreviews.com/images/uploaded/thumb_891215563751757_home2.jpg" />
    <h4 class="fav-title">House 2</h4>
    <span class="fav-li">SQFT: 13</span>
    <span class="fav-li">Price: 145,000</span>
    <span class="fav-li">Beds: 3</span>
    <span class="fav-li">Baths: 1.5</span><br />
    <a href="#" class="fav-link">Add To Favorites</a>
</div>
```

2. Json data object:  
```html
<div class="fav-item"
     data-favjson='{
        "id": "712",
        "type": "Homes",
        "title": "Awesome Home",
        "lis": [
                "SQFT: 50",
                "Beds: 9",
                "Monsters: 0"
            ],
        "url": "http://google.com",
        "thumbnail": "http://www.builderpreviews.com/images/uploaded/thumb_891215563751757_home2.jpg"
    }'
        >
    <img class="" src="http://www.builderpreviews.com/images/uploaded/thumb_891215563751757_home2.jpg" />
    <h4 class="">House 47</h4>
    <span class="">SQFT: 13</span>
    <span class="">Price: 145,000</span>
    <span class="">Beds: 3</span>
    <span class="">Baths: 1.5</span><br />
    <a href="#" class="fav-link">Add To Favorites</a>
</div>
```  

### fav-link
If the fav-link is a child of the fav-item element, as in the examples above, it will work without additional modification. However, if you need to place the link outside of the fav-item wrapper add the `data-favid` and `data-favtype` to the element:  
```html
<a href="#" class="fav-link" data-favid="1817341" data-favtype="Homes">Add To Favorites</a>
```




# Making changes
1. Fork the repo to your PC.
2. cd into the directory and run: `bower install` and `gulp watch`
3. Make your changes and test locally.
4. Submit a pull request. 