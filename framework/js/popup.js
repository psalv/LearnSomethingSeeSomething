
$(function () {

    var quoteUrl = 'https://www.reddit.com/r/quotes/top/.json?limit=1&jsonp';
    
    $.getJSONsync(quoteUrl, null, function (data) {
    
        var allData = JSON.stringify(data);
        
        var start = allData.search('title');
        var end = allData.search('created_');
        var quote = allData.slice(start + 8, end - 3);
        
        $('#popup').html(quote);

    });
});