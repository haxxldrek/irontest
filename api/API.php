<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
abstract class WeatherAPI {
    private $conf;
    protected $API_Source;
//    protected $endpoint;

    function __construct()
    {
        require_once('./config/API_conf.php');
        $this->conf = $config;
    }

    private function getURL($params){
        $source = $this->conf[$this->API_Source];
        $query = '&';
        if($params['query']){
            foreach ($params['query'] as $key => $value){
                $query .= $key.'='.$value;
            }
        }
        return $source['url'].$params['endpoint'].'?APPID='.$source['key'].$query;
    }

    abstract protected function getData($params);

    protected function getResponse($params){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $this->getURL($params));
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

}
