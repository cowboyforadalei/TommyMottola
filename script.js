// Função para adicionar uma nova entrada à lista e ao armazenamento local
function adicionarLogin(site, email, senha) {
    var list = document.getElementById("loginList");
    var listItem = document.createElement("li");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.onclick = function() {
        list.removeChild(listItem);
        // Remover do armazenamento local
        var logins = JSON.parse(localStorage.getItem("logins")) || [];
        var indexToRemove = logins.findIndex(function(login) {
            return login.site === site && login.email === email && login.senha === senha;
        });
        if (indexToRemove !== -1) {
            logins.splice(indexToRemove, 1);
            localStorage.setItem("logins", JSON.stringify(logins));
        }
    };
    listItem.innerHTML = "<strong>Site:</strong> " + site + "<br><strong>Email:</strong> " + email + "<br><strong>Senha:</strong> " + senha;
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
}

// Função para exibir o formulário de adicionar login
function exibirFormulario() {
    var form = document.getElementById("addLoginForm");
    form.style.display = "block";
    document.getElementById("siteInput").focus();
}

// Função para adicionar login ao clicar no botão de adicionar
function adicionarLoginBotao() {
    var site = document.getElementById("siteInput").value;
    var email = document.getElementById("emailInput").value;
    var senha = document.getElementById("senhaInput").value;
    if (site && email && senha) {
        adicionarLogin(site, email, senha);
        // Limpar campos e esconder formulário
        document.getElementById("siteInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("senhaInput").value = "";
        document.getElementById("addLoginForm").style.display = "none";
        // Salvando os dados no armazenamento local
        var logins = JSON.parse(localStorage.getItem("logins")) || [];
        logins.push({ site: site, email: email, senha: senha });
        localStorage.setItem("logins", JSON.stringify(logins));
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para carregar os logins salvos ao carregar a página
window.onload = function() {
    var logins = JSON.parse(localStorage.getItem("logins")) || [];
    logins.forEach(function(login) {
        adicionarLogin(login.site, login.email, login.senha);
    });
};

// Event listener para o botão de adicionar login
document.getElementById("addLoginBtn").addEventListener("click", exibirFormulario);
document.getElementById("confirmAddBtn").addEventListener("click", adicionarLoginBotao);

// Event listener para os campos de entrada
document.getElementById("siteInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.getElementById("emailInput").focus();
    }
});

document.getElementById("emailInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.getElementById("senhaInput").focus();
    }
});

document.getElementById("senhaInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        adicionarLoginBotao();
    }
});
