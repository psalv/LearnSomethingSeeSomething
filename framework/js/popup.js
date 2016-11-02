
$(function () {

    var quoteUrl = 'https://www.reddit.com/r/quotes/top/.json?limit=1&jsonp';
    
    $.getJSONsync(quoteUrl, null, function (data) {
        
        var quote = data['data']['children'][0]['data']['title'];
        $('#popup').html(quote);

    });
});