const pop_root = $(".wiki-pop-root")
var today = new Date();
var res;

var api = `https://cdn.jsdelivr.net/gh/harrify-apis/historyjs/events/${today.getMonth() + 1}_${today.getDate()}.json`;
fetch(api).then(res => res.json()).then((jsondata) => {
    res = jsondata;
}).catch(err => {});



function getTih() { 
    
    if(res){
        
        var length = res.events.length;
        var id = Math.floor(Math.random() * length);
        var rot = Math.floor(Math.random() * 10) + -10;
        var data = res.events[id];
        var year_ago = today.getFullYear() - data.year;
        var description = data.description;
        var text = " <span class='grad-fill'>" + year_ago + "</span> years ago, " + description;
        var pop_id = makeid(5);
        var html = `
    
        <div class="wikipop" id="${pop_id}" style="transform: rotate(${rot}deg)">
            <div class="chat-angle"></div>
            <p>${text}</p>
        </div>
        `
    
        pop_root.html(pop_root.html() + html);
        $("#" + pop_id).fadeIn();
    
        setTimeout(() => {
            $("#" + pop_id).fadeOut();
    
            setTimeout(() => {
                $("#" + pop_id).remove();
            }, 1000);
        }, 5000);
    }
    
}

