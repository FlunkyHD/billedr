// Insert navigation bar
$(function(){
  $("#nav-bar-placeholder").load("/nav-bar/nav-bar-index.html");
});

async function controlFunction() {
    let data = await getData();
    insertData(data);
}

function getData() {
    return fetch("/get/pictureCount/").then((response) => {
        return response.json();
    });
}

function insertData() {

}

controlFunction();

