<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use GuzzleHttp\Client;

return function (App $app) {

 
    $container = $app->getContainer();
   
    /**
     * Route to request upcoming movies
     */

    $app->get('/mostpopular/[{page}]', function ($request, $response, $args) {

        /**
         * Request Genre list names
         */

        $dataGenreNames= dataGenreNames();
        

        /**
         * Request UpcomingMovies
         */
        $term="";
        $datamovies = getDataMovies($term,$args['page']);


        $genresmovie = $datamovies->results;
        
        $total_pages="";

        $total_pages =$datamovies->total_pages;

        


        /**
        *@param{$array, $array, $total_pages}
        *mergeDataMovie
        */
        $arrayData = mergeDataMovie($genresmovie, $dataGenreNames, $total_pages);

        

        return $response->withJson($arrayData)
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        #--------------------------------------------------------------#
        
    });


    /**
     * Route to request search movies
     * @param{string or int}  term
     */

    $app->get('/moviesearch/[{term}]', function ($request, $response, $args) {

        /**
         * Request Genre list names
         */

        $dataGenreNames= dataGenreNames();
        

        /**
         * Request UpcomingMovies
         */
        $term="";
        $datamovies = getDataMovies($args['term'],$term);


        $genresmovie = $datamovies->results;
        
        $total_pages="";

        $total_pages =$datamovies->total_pages;

         /**
        *@param{$array, $array, $total_pages}
        *mergeDataMovie
        */
        $arrayData = mergeDataMovie($genresmovie, $dataGenreNames, $total_pages);

        return $response->withJson($arrayData)
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    });



    #--------------End Route moviesearch------------------------------------------------#



/**
*   @param{}
*   UpcomingMovies
*/
function  getDataMovies($term,$page){
    $client = new GuzzleHttp\Client();
        
   
    $responssse="";
    $data="";
    
    $term0 = $term;

    if($term==""){
        $responssse = $client->get('https://api.themoviedb.org/3/movie/upcoming?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page='.$page);
        
    }else{
        $responssse = $client->get('https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query='.$term0);
    }


   
    
    $data = json_decode($responssse->getBody()->getContents());

    return $data;
}
    

/**
*   @param{}
*   Get names of genres 
*/
function dataGenreNames(){

    $client2 = new GuzzleHttp\Client();

    $genre = $client2->get('https://api.themoviedb.org/3/genre/movie/list?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US');

    $GenreNames = json_decode($genre->getBody()->getContents());

    return $GenreNames;
}

/**
 *@param{array, array}
*Search function name by ids of movies
*/

function findNamesGenre($arrayIdsGenre, $dataGenreNames){

        $itens[]="";
           
         foreach ($arrayIdsGenre as $key => $value1) {
           
            
            foreach ($dataGenreNames->genres as $key=> $value2) 
            {
                
                if($value2->id==$value1){
                   
                 
                   $itens[] =  $value2->name;
                 
                }
                  
            }   
            
        }

        return $itens;
        
    }

/**
 *@param{array, array, number}
*  mergeDataMovie
*/
    
function mergeDataMovie($genresmovie, $dataGenreNames, $total_pages){

    foreach ($genresmovie as $key => $value0) {
            
        $genre=  findNamesGenre($value0->genre_ids,$dataGenreNames);
        
        if($value0->poster_path!=""){

            $imgscr = "https://image.tmdb.org/t/p/w185".$value0->poster_path;

        }else{
            $imgscr ='https://t4.ftcdn.net/jpg/00/27/87/49/240_F_27874901_o1OlVbzf5RXayuWccfEsGsWZoEcxTdT7.jpg';
        }

        $newDate = date("m-d-Y", strtotime($value0->release_date));

        $arrayData['results'][] = array(
            'id'=>$value0->id,
            'title'=>$value0->title,
            'overview'=>$value0->overview,
            'poster_path'=>$imgscr, 
            'release_date'=>$newDate, 
            'genre'=>$genre,
            'total_pages'=>$total_pages 
                );

    }

    return $arrayData;

}

};
