var search_root = $('.item-box');
var inputSearch = $(".search-input");

inputSearch.on('keyup', function (e) {
    var data = inputSearch.val();
    if (e.key === 'Enter' || e.keyCode === 13) {
        if(data){
            getList(data)
        }
    }
});

function getList(title){
    var api = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=revisions&list=search&srsearch=${title}`;
    $.get( api, function( data ) {
        data = data.query.search;
    
        const items = Object.values(data).map(array => `
            <div class="item-wrap" card-id="${array.pageid}" card-title="${array.title}">
                <div class="item-text">
                    <h1>${array.title}</h1>
                    <h6>${array.snippet}</h6>
                </div>
                <div class="item-image">
                    <img class="image-${array.pageid}" alt="">
                </div>
            </div>   
        `)
        search_root.html(items.join(''));
        document.title = title + " · Wikify Supersearch"
    
        Object.values(data).map(data => getThumbnail(data.title, data.pageid))
        $(".overlay-search").fadeIn()
        
    });
}

function getThumbnail(title, id){
    var thumb_api = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${title}`;
    fetch(thumb_api).then(res => res.json()).then((jsondata) => {

        var iresponse = JSON.stringify(jsondata, undefined, 2)
        var isuggestionData = JSON.parse(iresponse);
        var ipageid = Object.keys(isuggestionData.query.pages)[0];

        var src = isuggestionData.query.pages[ipageid].original.source;
        $(".image-" + id).attr("src", src)

    }).catch(err => {});

}

item.on("click", ".item-wrap", function(){
    var title = $(this).attr("card-title");
    var abs = $(this).find("h6").html();
    var link = $(this).find("img").attr("src");
    
    var history_mode = localStorage.getItem("history_mode");

    if(history_mode === "off"){
        window.location.href = "wiki.html?" + title;
    }
    else{
        addToHistory(title, abs, link);
    }

})

function addToHistory(title, abs, link){

    var itemobj = {
        title: title,
        abs: abs,
        link: link
    };

    var obj = localStorage.getItem("history") || '{}';
    var pOBJ = JSON.parse(obj)

    pOBJ[title] = itemobj;
    val =JSON.stringify(pOBJ);
    console.log(val)

    localStorage.setItem("history", val)
    window.location.href = "wiki.html?" + title;
}

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}