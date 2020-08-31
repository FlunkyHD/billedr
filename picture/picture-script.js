// Insert navigation bar (from: https://stackoverflow.com/questions/31954089/how-can-i-reuse-a-navigation-bar-on-multiple-pages)
$(function(){
    $("#nav-bar-placeholder").load("/nav-bar/nav-bar-index.html");
});

async function controlFunction(){
    let nameOfPicture = await NameOfPictureFromURI();
    InsertPicture(nameOfPicture);
}

function NameOfPictureFromURI(){
    let URI = window.location.href;
    let decodedURI = decodeURI(URI);
    let splitURI = decodedURI.split("?"); // Divide URI 
    console.log(splitURI);
    return splitURI[1];
}

function InsertPicture(name){
    let div = document.createElement('div');
    
    let image = document.createElement('img');
    image.src  = "../img/" + name;
    console.log(image.src);
    image.style.height = "35%";
    image.style.width = "25%";
    image.style.padding = "4%";

    document.body.appendChild(div);
    div.appendChild(image);
}

controlFunction();