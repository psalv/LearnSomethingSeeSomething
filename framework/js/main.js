


/*

Random word: http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

    Words do not always have definitions, I need to check that the count > 0,
    if so then I will take the very first word, otherwise query a new word from wordnik

Pearson definition: https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=believe&apikey=BWA5NE802N4PAN4xqAXQIGXd0EvnX88e

    change the headword value to that of the word.

 */



// TODO current issue is synchronizing the events, I need for certain events to occur before others can happen.

// TODO first thing to happen is going to be loading the images, if I can create a loop that waits for a JSON to finish,
// TODO then I can reuse the code above.

// TODO First needs to be loading the word, and then checking the count
// TODO I need to loop these events until I find a word with count > 0

// TODO I then need to set the fields





$(function () {

    var artUrl = 'https://www.reddit.com/r/art/top/.json?limit=1&jsonp';
    var earthUrl = 'https://www.reddit.com/r/earthporn/top/.json?limit=1&jsonp';

    // Reddit parser
    $.getJSON(artUrl, null, function (data) {

        var allData = JSON.stringify(data);

        var locked = allData.search('locked');
        var postLocked = allData.slice(locked);

        var thread = allData.slice(allData.search('permalink') + 12, locked - 3);
        var image = postLocked.slice(postLocked.search('url') + 6, postLocked.search('author') - 3);

        $('.art').attr('src', image);
        $('#artLink').attr('href', 'http://reddit.com' + thread);

    });

    $.getJSON(earthUrl, null, function (data) {

        var allData = JSON.stringify(data);

        var locked = allData.search('locked');
        var postLocked = allData.slice(locked);

        var thread = allData.slice(allData.search('permalink') + 12, locked - 3);
        var image = postLocked.slice(postLocked.search('url') + 6, postLocked.search('author') - 3);
        
        $('body').css('background-image', 'url(' + image.toString() + ')');
        $('#earthLink').attr('href', 'http://reddit.com' + thread);

    });
    
});




// Gets a random word
$(function () {

    $.getJSON("http://api.wordnik.com/v4/words.json/rando" +
            "mWords?hasDictionaryDef=true&minCorpusCount=0&mi" +
            "nLength=5&maxLength=15&limit=1&api_key=a2a73e7b9" +
            "26c924fad7001ca3111acd55af2ffabf50eb4ae5", null, function(data){

        randomWord = JSON.stringify(data[0].word);
        // $('#word').html(randomWord);
    });

});






// 1) find the count
// 2) find the first definition from the definition json

// 3) wait for callback from wordJson
// 4) enter definition json, if count = 0, then exit and continue to loop
// 5) if count != 0 then get the definition, set a variable that allows us to exit the loop
// 6) loop should wait for definition call back before proceeding
// 7) set the word and definition their respective values




$(function () {

    var dictUrl = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" +
        document.getElementById('#word') +
        "&apikey=BWA5NE802N4PAN4xqAXQIGXd0EvnX88e";

    console.log($('#word').text());

    $.getJSON(dictUrl, null, function(data){
        console.log(JSON.stringify(data));
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
