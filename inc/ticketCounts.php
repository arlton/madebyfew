<?php
header('Content-Type: application/json');
echo file_get_contents('https://www.eventbrite.com/json/event_get?app_key=SUYQ3DAUFRTPPKQCDK&amp;user_key=135256082546136021081&amp;id=4813227493');
?>
