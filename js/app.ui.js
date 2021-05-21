const w_icon = $(".wiki-icon");
const result_container = $(".overlay-search");
const close_button = $(".close-button");
const nav_item = $(".nav-item");
const item = $(".item-box");
const his_sel = $(".his-sel");
const mode_sel = $(".mode-sel");
const close_settings_btn = $(".settings-close");
const settings_open = $(".settings-btn");
const about_open = $(".about-btn");
const delete_button = $(".delete-btn");
const wiki_icon = $(".wiki-icon");

var settings_overlay = $(".settings-overlay");
var about_overlay = $(".about-overlay");
var menu_vis = false;
var themeButton = $(".toggle-theme");

w_icon.on("click", function(){
    w_icon.parent().addClass('animate__animated animate__jello');
    setTimeout(function(){
        w_icon.parent().removeClass('animate__animated animate__jello')
    },500)
});

close_button.on("click", function(){
    
    result_container.addClass("animate__animated animate__zoomOut");
    result_container.fadeOut();
    result_container.removeClass("animate__animated animate__zoomOut");
    search_root.html("")
    document.title = "Wikify - A Simplified WikiPedia";
})


function animate(element, style, remove_state){
    element = $(element)
    element.addClass("animate__animated " + style);
    if(remove_state){
        element.removeClass("animate__animated " + style)
    }
}


nav_item.on("click", function(){
    var indic = $(".indic");
    indic.removeClass("indic-active");
    $(this).children(".indic").addClass("indic-active");
    setContent($(this).attr("data-type"))
})

$(document).click(function(evt) {
    var target = evt.target.className;
    var inside = $(".more-pop");

    if ($.trim(target) != '') {
        if(menu_vis === true){
            inside.fadeOut();
            menu_vis = false;
        }
        
    }
});

$(".wiki-more").on("click", function(){
    $(".more-pop").fadeIn();
    setTimeout(() => {
        menu_vis = true;
    }, 1000);
})

themeButton.on("click", function(){
    toggleTheme();
})

function toggleTheme(){
    var theme = window.localStorage.getItem('theme');
    if(theme === "light"){
        localStorage.setItem("theme","dark")
    }
    else{
        localStorage.setItem("theme","light")
    }
    checkTheme()
}

function goLight(bool){
    if(bool === true){
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "css/light.css");
        link.setAttribute("type", "text/css");
        link.className = "light-link";

        document.head.appendChild(link);
        $(".cblob").hide();
    }
    else{
        $(".light-link").remove();
        $(".cblob").show();
    }
}

function checkTheme() {
    var theme = window.localStorage.getItem('theme');
    if(theme === "light"){
        goLight(true)
    }
    else{
        goLight(false)
    }
};
window.onload = checkTheme;

his_sel.on("input", function(){
    localSET("history_mode", $(this).val())
})

mode_sel.on("input", function(){
    localSET("ex_mode", $(this).val())
})

function localSET(key, value){
    localStorage.setItem(key, value);
}

close_settings_btn.on("click", function(){
    settings_overlay.fadeOut();
    about_overlay.fadeOut();
})

settings_open.on("click", function(){
    settings_overlay.fadeIn().css("display", "flex");
})

about_open.on("click", function(){
    about_overlay.fadeIn().css("display", "flex");
})

delete_button.on("click", function(){
    if (confirm('Do you want to clear your history?')) {
        localStorage.removeItem("history")
        console.log('History was cleared');
    } else {}
})

wiki_icon.on("click", function () {
    getTih();
})