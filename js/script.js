// Insert navigation bar
$(function(){
  $("#nav-bar-placeholder").load("/nav-bar/nav-bar-index.html");
});

async function controlFunction(){
    let data = await getData();
    insertData(data);
}

function getData(){
    return fetch("/get/pictureCount/").then((response) => {
        return response.json();
    });
}

function insertData(data){
    data.forEach(picture => {
        console.log(picture);
        const image = document.createElement('img');
        image.src  = '/img/' + picture;
        image.style.height = "35%";
        image.style.width = "25%";
        image.style.padding = "4%";
        document.querySelector('.billeder').appendChild(image)
    });
}

controlFunction();

