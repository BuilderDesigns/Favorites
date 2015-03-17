(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/fixtures/dashboard.html",
    "<div class=\"favorites-tab\">\n" +
    "    <div ng-controller=\"DashboardController\">\n" +
    "        <script type=\"text/ng-template\" id=\"FavoritesDashboardModal\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h3 class=\"modal-title\">Favorites Dashboard</h3>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "\n" +
    "                <div class=\"favorite-group\" ng-repeat=\"(key, value) in favorites | groupBy: 'type'\">\n" +
    "                    <h2>{{key}}</h2>\n" +
    "                    <div ng-repeat=\"fav in value track by $index\">\n" +
    "                        <fav-item></fav-item>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "                <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "            </div>\n" +
    "        </script>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"open()\">My Favorites</button>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);
})();
