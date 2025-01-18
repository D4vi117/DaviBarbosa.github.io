const pages = [
    {
        nome: "capelas",
        path: "pages/mapa/map.html"
    },
    {
        nome: "noticias",
        path: "pages/noticias/noticias.html"
    },
    // Adicione outras páginas conforme necessário
];

let contentIndex = -1;

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

// Função para verificar a URL e carregar o conteúdo correspondente
function loadContentFromURL() {
    const path = window.location.pathname; // Pega o caminho da URL atual

    const page = pages.find(p => `/${p.nome}` === path); // Encontra o conteúdo baseado no nome da página
    if (page) {
        const pageName = page.nome;
        const pagePath = page.path;

        // Atualiza o histórico de navegação
        history.pushState({ pageName: pageName }, "", `/${pageName}`);

        loadHTMLContent(pagePath).then(content => {
            console.log(content);
            const mainContent = document.getElementById("mainContent");
            mainContent.innerHTML = content;

            // Carregar o script necessário dinamicamente (caso haja)
            const script = document.createElement("script");
            script.src = `pages/${pageName}/script.js`; // Ajuste o caminho para o script da página
            script.type = "text/javascript";
            script.onload = function() {
                console.log("Script carregado com sucesso.");
            };
            script.onerror = function() {
                console.error("Erro ao carregar o script.");
            };

            // Inserir o script após o conteúdo
            mainContent.appendChild(script);
        }).catch(error => {
            console.error("Erro ao carregar o conteúdo: ", error);
            document.getElementById("mainContent").innerHTML = "Erro ao carregar o conteúdo.";
        });
    }
}

// Carregar o conteúdo assim que a página for carregada
document.addEventListener("DOMContentLoaded", loadContentFromURL);
