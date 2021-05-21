var data = JSON.parse(localStorage.getItem("history")) || 
{
    dasdsdddsadsd:{
        title:"Read history",
        abs:"You can see all the history of the pages you visited here! Click here to start searching!"
    }
};
const items = Object.values(data).map(array => `
    <a class="his-root-item" href="wiki.html?${array.title}">
    <div class="item-wrap" card-title="${array.title}">
        <div class="item-text">
            <h1>${array.title}</h1>
            <h6 class="his-root-title">${array.abs}</h6>
        </div>
        <div class="item-image">
            <img class="image-${array.link}" alt="">
        </div>
    </div>
    </a>   
`)
$(".history-box").html(
    items.join('')
);


function filterItem() {
    var input, filter, cards, h5, title, i;
    input = document.getElementById("filter-js");
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("his-root-item");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector("h6.his-root-title");
        var len = cards.length;
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
            len --;
        }
    }

}