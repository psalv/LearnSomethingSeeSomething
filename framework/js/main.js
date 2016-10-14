

$(function() {

    $('#toggleCol').on('mouseover', function(){
        $('.col-md-6').fadeToggle(1000);
    });
    $('#links').on('mouseover', function(){
        $('.col-xs-2').fadeToggle(1000);
    });
    $('#toggleFnt').on('mouseover', function(){

        var curColor = $('body').css('color');

        if(curColor == 'rgb(0, 0, 0)'){
            $('#toggleFnt').attr('src', '/res/icon3.png');
            $('body').css('color', 'white');
        }
        else{
            $('#toggleFnt').attr('src', '/res/icon4.png');
            $('body').css('color', 'black');
        }
    });

    $('h4').on('click', function(){
        window.open($(this).attr('href'), '_self');
    });
});


function loadImages () {

    var artUrl = 'https://www.reddit.com/r/art/top/.json?limit=1&jsonp';
    var earthUrl = 'https://www.reddit.com/r/earthporn/top/.json?limit=1&jsonp';

    $.getJSONsync(artUrl, null, function (data) {

        $('.art').attr('src', data['data']['children'][0]['data']['url']);
        $('#artLink').attr('href', 'http://reddit.com' + data['data']['children'][0]['data']['permalink']);
        
    });

    $.getJSONsync(earthUrl, null, function (data) {

        $('body').css('background-image', 'url(' + data['data']['children'][0]['data']['url'] + ')');
        $('#earthLink').attr('href', 'http://reddit.com' + data['data']['children'][0]['data']['permalink']);

    });
}


function loadWord (){

    var word = "failure";

    $.getJSONsync("http://api.wordnik.com/v4/words.json/rando" +
        "mWords?hasDictionaryDef=true&minCorpusCount=0&mi" +
        "nLength=5&maxLength=15&limit=1&api_key=a2a73e7b9" +
        "26c924fad7001ca3111acd55af2ffabf50eb4ae5", null, function (data) {

        word = data[0].word;
    });
    return word;
}


function loadDefinition (word) {

    var toExit = false;

    var dictUrl = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" +
                        word + "&apikey=BWA5NE802N4PAN4xqAXQIGXd0EvnX88e";

    $.getJSONsync(dictUrl, null, function(data){

        /* Since the word is not guaranteed to be in the Pearson dictionary,
        *  we check the number of entries before continuing. */

        if(data.count != 0){

            toExit = true;

            $('#defn').html(data.results[0]['senses'][0]['definition'][0]);

            $('#word').html(JSON.stringify(data.results[0]['headword']));

        }
    });
    return toExit;
}


$(function () {

    loadImages();
    var word = loadWord();

    while(!loadDefinition(word)){
        word = loadWord(false);
    }

});