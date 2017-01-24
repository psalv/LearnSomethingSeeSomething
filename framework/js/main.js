
/**
 * JQuery functionality for all buttons.
 */
$(function jqueryEvents () {

    $('#toggleCol').on('click', function(){
        $('.col-md-6').fadeToggle(1000);
    });
    $('#links').on('mouseover', function(){
        $('.col-xs-2').fadeToggle(1000);
    });
    $('#toggleFnt').on('click', function(){

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


/**
 * JSONP requests for the two images used, utilizes Reddit's API.
 */
function loadImages () {

    var artUrl = 'https://www.reddit.com/r/art/top/.json?&jsonp';
    var earthUrl = 'https://www.reddit.com/r/earthporn/top/.json?&jsonp';

    $.getJSONsync(artUrl, null, function (data) {

        var i = 0;
        var imageUrl = data['data']['children'][i++]['data']['url'];

        /* Only accept pictures from imgur and i.redd, as other websites (such as flickr)
           can have restrictions on which photos can be downloaded. */

        while(imageUrl.indexOf('i.redd.it') == -1 && imageUrl.indexOf('imgur') == -1 || imageUrl.endsWith('.gifv')){
            imageUrl = data['data']['children'][i++]['data']['url'];
        }

        /* Specific urls to imgur.com do not always come as link to .jpgs, detect and correct. */

        if(!imageUrl.endsWith('.jpg') && imageUrl.indexOf('imgur') != -1){
            imageUrl += '.jpg';
        }

        /* Setting the proportions for responsive resizing. */

        var img = new Image();
        var ratio;
        img.onload = function () {
            if(this.width > this.height){
                ratio = (this.height / this.width) * 100;
                $('.art').css({
                    height: '100%',
                    width: ratio + '%'
                });
            }
            else{
                ratio = (this.width / this.height) * 100;
                $('.art').css({
                    height: '100%',
                    width: ratio + '%'
                });

            }
        };
        img.src = imageUrl;


        $('.art').attr('src', imageUrl);
        $('#artLink').attr('href', 'http://reddit.com' + data['data']['children'][i - 1]['data']['permalink']);
        
    });

    $.getJSONsync(earthUrl, null, function (data) {

        var i = 0;
        var imageUrl = data['data']['children'][i++]['data']['url'];

        while(imageUrl.indexOf('i.redd.it') == -1 && imageUrl.indexOf('imgur') == -1 || imageUrl.endsWith('.gifv')){
            imageUrl = data['data']['children'][i++]['data']['url'];
        }

        if(!(imageUrl.endsWith('.jpg')) && imageUrl.indexOf('imgur') != -1){
            imageUrl += '.jpg';
        }

        var img = new Image();
        img.onload = function () {

            var ratio = (this.width / this.height) * 100 * 2.5;
            $('body').css('background-size', ratio + '%');

        };
        img.src = imageUrl;


        $('body').css('background-image', 'url(' + imageUrl + ')');
        $('#earthLink').attr('href', 'http://reddit.com' + data['data']['children'][i - 1]['data']['permalink']);

    });
}


/**
 * Makes a JSONP request to wordnik to retrieve a random word to look up in the Pearson dictionary.
 *
 * @returns {string} a random word
 */
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


/**
 * Uses the Pearson dictionary API to search for the definition of the inputted word.
 * If the query returns no words, exits. Otherwise it will take the first word and definition form the query.
 * Note: the definition chosen is not necessarily the word inputted, because the words are randomized this is not an issue.
 *
 * @param word a string containing a word that may or may not be in the dictionary
 * @returns {boolean} true if the word was in the dictionary, false if it was not
 */
function loadDefinition (word) {

    var toExit = false;

    var dictUrl = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" +
                        word + "&apikey=BWA5NE802N4PAN4xqAXQIGXd0EvnX88e";

    $.getJSONsync(dictUrl, null, function(data){

        /* Since the word is not guaranteed to be in the Pearson dictionary,
        *  we check the number of entries before continuing. */

        if(data.count != 0){

            var definition = data.results[0]['senses'][0]['definition'][0];

            if(definition.length <= 200){

                toExit = true;

                /* If we found atleast one word than we choose the first */

                $('#defn').html(definition);
                $('#word').html(JSON.stringify(data.results[0]['headword']));
            }
        }
    });
    return toExit;
}


/**
 * Function to correct the definition not loading due to connectivity issues.
 */
function correctNotLoaded () {
    
    if(document.getElementById('word').textContent == "" || document.getElementById('defn').textContent == ""){
        $('#word').html("failure");
        $('#defn').html("is the state or condition of not meeting a desirable or intended objective, and may be viewed as the opposite of success.");
    }
}


/**
 * Calls all functions using JSONP requests.
 * The JSONP requests have been made synchronous since the input of one depends on the output of another.
 */
$(function init () {

    loadImages();
    var word = loadWord();

    /* We continue trying random words until we find one that is in the dictionary. */

    var count = 0;
    while(!loadDefinition(word) && count++ <= 20){
        word = loadWord();
    }

    correctNotLoaded();

});
