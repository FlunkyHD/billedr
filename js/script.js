// Insert navigation bar (from: https://stackoverflow.com/questions/31954089/how-can-i-reuse-a-navigation-bar-on-multiple-pages)
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
        // Create image
        const image = document.createElement('img');
        image.src  = '/img/' + picture;
        image.style.height = "35%";
        image.style.width = "25%";
        image.style.padding = "4%";
        
        // Create anchor (from: https://stackoverflow.com/questions/4772774/how-do-i-create-a-link-using-javascript)
        let a = document.createElement('a');

        // Encode name of picture
        let encodedURI = encodeURI(picture);

        a.href = "/picture/picture-index.html?" + encodedURI;

        a.appendChild(image);

        document.querySelector('.billeder').appendChild(a);

    });
}

controlFunction();

