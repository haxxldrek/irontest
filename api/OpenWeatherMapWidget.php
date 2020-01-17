<?php
include('API.php');
class OpenWeatherMapWidget extends WeatherAPI {

    function __construct($source)
    {
        parent:: __construct();
        $this->API_Source = $source;
    }
    public function getData($params){
        $response = json_decode($this->getResponse($params));
        if($response->cod != 200) return ['error' => true, 'message' => $response->message];
        return  [
            'city' => $response->name,
            'wind' => $response->wind->speed,
            'temp' => round($response->main->temp - 273.15),
            'weather' => $response->weather[0]->main
        ];

    }
}