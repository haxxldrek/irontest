<?php
include('./api/OpenWeatherMapWidget.php');

if($_POST['city']) {
    $weatherMap = new OpenWeatherMapWidget('openweathermap');
    $weather = $weatherMap->getData(['endpoint' => 'weather', 'query' => ['q' => $_POST['city']]]);
    echo json_encode($weather);
}