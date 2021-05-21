var simplified;
var explained;

var title_elem = $(".title-page");
var abstract_elem = $(".abstract");
var hash = window.location.hash.substr(1);

var title = window.location.search.substr(1);
getResults ()
function getResults (){
    console.log(title)
    if(title){
        title = decodeURI(title);
        title_elem.text(title);
        getEx(title);
    }
}

var result_img = $(".result-img");


function getEx(){
    var api = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`;
    $.get( api, function( data ) {
        var extract = data.query.pages;
        var pageid = Object.keys(extract)[0];
        extract = extract[pageid].extract;
        explained = extract;

    })
    .done(function(){

        if(explained){
            getSi();
        }
        else{
           window.location.replace("index.html")
        }

    })
    .fail(function(er){console.log(er)});
}

function getSi(){
    var api_simple = `https://simple.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`;
    $.get( api_simple, function( data ) {
        var extract = data.query.pages;
        var pageid = Object.keys(extract)[0];
        extract = extract[pageid].extract;
        simplified = extract;

    })
    .done(function(){

        if(simplified){
            
        }
        else{
            simplified = `
            <div class="simplified-404">
            <h1 class="s-404">Simplified</h1>
            <p>wowza! the article (${title}) you requested does not have a simplified version yet. Keep waiting, we are updating everyday!. You can try the explained version instead!</p>
            </div>
            `
        }
        setIMAGE();

    })
    .fail(function(er){console.log(er)});
}

function setIMAGE(){
    var thumb_api = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${title}`;
    fetch(thumb_api).then(res => res.json()).then((jsondata) => {

        var iresponse = JSON.stringify(jsondata, undefined, 2)
        var isuggestionData = JSON.parse(iresponse);
        var ipageid = Object.keys(isuggestionData.query.pages)[0];

        var src = isuggestionData.query.pages[ipageid].original.source;
        console.log(src)
        result_img.attr("src", src)

    }).catch(function(){
        result_img.parent().remove()
    });

    if(hash === "simple"){
        setContent("simple");
        $(".s-mode").click();
    }
    else{
        var ex_mode = localStorage.getItem("ex_mode");
        if(ex_mode === "simple"){
            setContent("simple");
            $(".s-mode").click(); 
        }else{
            setContent("en");
        }
        
    }

    $(".loading-screen").fadeOut();

}


function setContent(type){
    if(type === 'simple'){
        abstract_elem.html(simplified)
        document.title = title + " · Wikify Simplified"
    }else{
        abstract_elem.html(explained)
        document.title = title + " · Wikify Explained"
    }
}