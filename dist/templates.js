(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/dashboard.html",
    "<div class=\"favorites-tab\">\n" +
    "\n" +
    "    <div ng-controller=\"DashboardController\">\n" +
    "\n" +
    "        <script type=\"text/ng-template\" id=\"FavoritesDashboardModal\">\n" +
    "\n" +
    "            <div class=\"modal-header\">\n" +
    "\n" +
    "                <h3 class=\"modal-title\">Favorites Dashboard</h3>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body\">\n" +
    "\n" +
    "                <div class=\"favorite-group\" ng-repeat=\"(key, value) in favorites | groupBy: 'type'\">\n" +
    "\n" +
    "                    <div class=\"fav-type-title\"><h4>{{key}}</h4></div>\n" +
    "\n" +
    "                    <div ng-repeat=\"fav in value track by $index\">\n" +
    "\n" +
    "                        <fav-item></fav-item>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-footer\">\n" +
    "\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "\n" +
    "                <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </script>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"open()\" ng-if=\"favorites.length\">\n" +
    "\n" +
    "            My Favorites\n" +
    "\n" +
    "            <badge class=\"fav-count-badge\">{{favorites.length}}</badge>\n" +
    "\n" +
    "        </button>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/favoriteItem.html",
    "\n" +
    "<div class=\"fav_dashboard_item\">\n" +
    "\n" +
    "    <div class=\"fav-item-col1\">\n" +
    "\n" +
    "        <img ng-src=\"{{fav.thumbnail}}\"width=\"50\" />\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fav-item-col2\">\n" +
    "\n" +
    "        <h4>{{fav.title}}</h4>\n" +
    "\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"li in fav.lis\">{{li}}</li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fav-item-col3\">\n" +
    "\n" +
    "        <button class=\"btn\" ng-click=\"remove(fav)\">Remove</button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
})();