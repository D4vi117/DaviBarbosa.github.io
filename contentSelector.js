const pages = [
    "pages/mapa/map.html"
    
]

contentIndex = 0
async function loadHTMLContent(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(error);
        return `Erro ao carregar o conteúdo: ${error.message}`;
    }
}

// Exemplo de uso:
function selectContent(value){
    contentIndex = (contentIndex + value + pages.length) % pages.length;
    
    loadHTMLContent(pages[contentIndex]).then(content => {
        document.getElementById("mainContent").innerHTML = pages[contentIndex];
    });
}
