const pages = [
    "<iframe src='pages/mapa/map.html' frameborder='0' style='border: none; height: 700px; width:100%;'></iframe>",
    "<p>asdadsada</p>"
]

contentIndex = 0

function selectContent(value){
    contentIndex = (contentIndex + value + pages.length) % pages.length;
    document.getElementById("mainContent").innerHTML = pages[value];
}
