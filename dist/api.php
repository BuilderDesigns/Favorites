<?php
session_start();

require('classes/Favorites.php');

$user = $_SESSION['favorites_user_id'];

$dbh = new PDO('mysql:host=localhost;dbname=website_db', 'builder_admin', 'YloJxPsO.0');
$user_id = $this->user_id;

$return_array = array();

$InvFavs = get("userFavorites");
$InvFavs->getOnlyWhere('type','==','inv');
$InvFavs->getOnlyWhere('userId','==',$user_id);
$InvFavs->join('item','inventory','inv_id');
$InvFavs = prepareInv($InvFavs);

$inv = array();
foreach ($InvFavs->getData() as $key => $value) {
    $inv[] = array(
        'id' 			=> $value['inv_id'],
        'inv_id' 		=> $value['inv_id'],
        'inv_street1'	=> $value['inv_street1'],
        'inv_community'	=> $value['inv_community'],
        'inv_city'		=> $value['city_name'],
        'inv_state'		=> $value['state_code'],
        'inv_zip'		=> $value['inv_zip'],
        'com_name'		=> $value['com_name']
    );
}

$return_array['inv'] = $inv;


// com favs
$ComFavs = get("userFavorites");
$ComFavs->getOnlyWhere('type','==','com');
$ComFavs->getOnlyWhere('userId','==',$user_id);
$ComFavs->join('item','communities','com_id');
$ComFavs = prepareComs($ComFavs);

$coms = array();
foreach ($ComFavs->getData() as $key => $value) {
    $coms[] = array(
        'id' 			=> $value['com_id'],
        'com_id' 		=> $value['com_id'],
        'com_name'		=> $value['com_name'],
        'com_city'		=> $value['com_name'],
        'com_state'		=> $value['state_code'],
    );
}

$return_array['com'] =  $coms;

// mod favs
$ModFavs = get("userFavorites");
$ModFavs->getOnlyWhere('type','==','mod');
$ModFavs->getOnlyWhere('userId','==',$user_id);
$ModFavs->join('item','models','mod_id');
$ModFavs = prepareMods($ModFavs);


$mods = array();
foreach ($ModFavs->getData() as $key => $value) {
    $mods[] = array(
        'id'			=> $value['mod_id'],
        'mod_id' 		=> $value['mod_id'],
        'mod_name'		=> $value['mod_name']
    );
}

$return_array['mod'] =  $mods;

// mod favs
$ModFavs = get("userFavorites");
$ModFavs->getOnlyWhere('type','==','cmod');
$ModFavs->getOnlyWhere('userId','==',$user_id);
$ModFavs->join('item','communityModels','cmod_id');
$ModFavs->join('cmod_modelId','models','mod_id');
$ModFavs->join('cmod_communityId','communities','com_id');
$ModFavs = prepareMods($ModFavs);

$cmod = array();
foreach ($ModFavs->getData() as $key => $value) {
    $cmod[] = array(
        'id' 			=> $value['id'],
        'mod_id' 		=> $value['mod_id'],
        'mod_name'		=> $value['mod_name'],
        'cmod_id'		=> $value['cmod_id'],
        'com_name'		=> $value['com_name']
    );
}

$return_array['cmod'] =  $ModFavs->getData();

return $return_array;

?>