




// TODO current issue is synchronizing the events, I need for certain events to occur before others can happen.

// TODO first thing to happen is going to be loading the images, if I can create a loop that waits for a JSON to finish,
// TODO then I can reuse the code above.


// TODO I then need to set the fields


/**
 * Parse reddit for the top /r/art and /r/earthporn post,
 * which act as the main image and background respectively.
 */
$(function () {

    var artUrl = 'https://www.reddit.com/r/art/top/.json?limit=1&jsonp';
    var earthUrl = 'https://www.reddit.com/r/earthporn/top/.json?limit=1&jsonp';

    $.getJSONsync(artUrl, null, function (data) {

        console.log(data['data']['children'][0]['data']['url']);
        $('.art').attr('src', data['data']['children'][0]['data']['url']);
        $('#artLink').attr('href', 'http://reddit.com' + data['data']['children'][0]['data']['permalink']);
        

    });

    $.getJSONsync(earthUrl, null, function (data) {

        $('body').css('background-image', 'url(' + data['data']['children'][0]['data']['url'] + ')');
        $('#earthLink').attr('href', 'http://reddit.com' + data['data']['children'][0]['data']['permalink']);

    });
});



// 3) wait for callback from wordJson
// 4) enter definition json, if count = 0, then exit and continue to loop
// 5) if count != 0 then get the definition, set a variable that allows us to exit the loop
// 6) loop should wait for definition call back before proceeding
// 7) set the word and definition their respective values




$(function () {

    var toExit = false;

    var word;


        /* Retrieves a random word */

        $.getJSONsync("http://api.wordnik.com/v4/words.json/rando" +
                "mWords?hasDictionaryDef=true&minCorpusCount=0&mi" +
                "nLength=5&maxLength=15&limit=1&api_key=a2a73e7b9" +
                "26c924fad7001ca3111acd55af2ffabf50eb4ae5", null, function(data){

            word = data[0].word;
        });


        var dictUrl = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" +
                            $('#word').text() + "&apikey=BWA5NE802N4PAN4xqAXQIGXd0EvnX88e";

        $.getJSONsync(dictUrl, null, function(data){

            /* Since the word is not guaranteed to be in the Pearson dictionary,
            *  we check the number of entries before continuing. */

            if(data.count != 0){

                toExit = true;

                $('#defn').html(data.results[0]['senses'][0]['definition'][0]);

                $('#word').html(JSON.stringify(data.results[0]['headword']));

            }
        });

});




$(function() {

    $('#toggleCol').on('mouseover', function(){
        $('.col-md-6').fadeToggle(1000);
    });
    $('#links').on('mouseover', function(){
        $('.col-xs-2').fadeToggle(1000);
    });

    $('h4').on('click', function(){
        var link = $(this).attr('href');
        console.log(link);
        window.open($(this).attr('href'), '_self');
    });
});
