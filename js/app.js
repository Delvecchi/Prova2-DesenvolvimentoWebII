document.addEventListener('DOMContentLoaded', () => {
    let deputadoSelecionado = null;
    let enderecoDeputado = {
        cep: "",
        rua: "",
        cidade: "",
        estado: "",
        latitude: "",
        longitude: ""
    };

    const deputadosLista = document.getElementById('deputados-lista');
    const modal = document.getElementById('modal');
    const span = document.getElementsByClassName('close')[0];
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados';
    const cepInput = document.getElementById('cep');
    const salvarBtn = document.getElementById('salvar');

    async function fetchJSON(url) {
        const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
        return await response.json();
    }

    function createDeputadoElement(deputado) {
        const li = document.createElement('li');
        li.classList.add('deputado');
        li.innerHTML = `
            <img src="${deputado.urlFoto}" alt="Foto de ${deputado.nome}" />
            <div>
                <strong>${deputado.nome}</strong><br>
                ${deputado.siglaPartido} - ${deputado.siglaUf}
            </div>`;
        li.querySelector('img').addEventListener('click', () => mostrarDetalhesDeputado(deputado));
        return li;
    }

    async function fetchDeputados() {
        try {
            const data = await fetchJSON(url);
            const deputados = data.dados.sort((a, b) => a.nome.localeCompare(b.nome));
            deputados.forEach(deputado => deputadosLista.appendChild(createDeputadoElement(deputado)));
        } catch (error) {
            console.error('Erro ao buscar deputados:', error);
        }
    }

    async function mostrarDetalhesDeputado(deputado) {
        try {
            const data = await fetchJSON(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}`);
            const deputadoDetalhes = data.dados;
            deputadoSelecionado = deputado;

            // Restaurar valores padrão do endereço ao selecionar um novo deputado
            enderecoDeputado = deputadoSelecionado.endereco || {
                cep: "",
                rua: "",
                cidade: "",
                estado: "",
                latitude: "",
                longitude: ""
            };

            const idade = new Date().getFullYear() - new Date(deputadoDetalhes.dataNascimento).getFullYear();
            const email = deputadoDetalhes.ultimoStatus.email || 'N/A';

            document.getElementById('foto').src = deputadoDetalhes.ultimoStatus.urlFoto;
            document.getElementById('nome').textContent = deputadoDetalhes.nomeCivil;
            document.getElementById('sexo').textContent = deputadoDetalhes.sexo;
            document.getElementById('idade').textContent = `${idade} anos`;
            document.getElementById('partido').textContent = deputadoDetalhes.ultimoStatus.siglaPartido;
            document.getElementById('email').textContent = email;
            document.getElementById('estado').textContent = deputadoDetalhes.ultimoStatus.siglaUf;

            // Preencher campos de endereço
            cepInput.value = enderecoDeputado.cep || '';
            document.getElementById('cepDisplay').textContent = enderecoDeputado.cep || '';
            document.getElementById('rua').textContent = enderecoDeputado.rua || '';
            document.getElementById('cidade').textContent = enderecoDeputado.cidade || '';
            document.getElementById('estadoEndereco').textContent = enderecoDeputado.estado || '';
            document.getElementById('latitude').textContent = enderecoDeputado.latitude || '';
            document.getElementById('longitude').textContent = enderecoDeputado.longitude || '';

            // Adicionar event listener ao campo CEP
            cepInput.removeEventListener('input', handleCepInput);
            cepInput.addEventListener('input', handleCepInput);

            // Adicionar event listener ao botão salvar
            salvarBtn.removeEventListener('click', salvarEndereco);
            salvarBtn.addEventListener('click', salvarEndereco);

            modal.style.display = 'block';
            span.onclick = () => { modal.style.display = 'none'; };
            window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

        } catch (error) {
            console.error('Erro ao buscar detalhes do deputado:', error);
        }
    }

    function handleCepInput(event) {
        const cep = event.target.value;
        if (/^\d{8}$/.test(cep)) {
            obterEndereco(cep);
        }
    }

    async function obterEndereco(cep) {
        try {
            const data = await fetchJSON(`https://viacep.com.br/ws/${cep}/json/`);
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }
            // Atualizar informações do endereço
            enderecoDeputado.cep = cep;
            enderecoDeputado.rua = data.logradouro;
            enderecoDeputado.cidade = data.localidade;
            enderecoDeputado.estado = data.uf;

            document.getElementById('cepDisplay').textContent = cep;
            document.getElementById('rua').textContent = data.logradouro;
            document.getElementById('cidade').textContent = data.localidade;
            document.getElementById('estadoEndereco').textContent = data.uf;
            obterCoordenadas(data.logradouro, data.localidade, data.uf);
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    }

    async function obterCoordenadas(rua, cidade, estado) {
        try {
            const data = await fetchJSON(`https://nominatim.openstreetmap.org/search?format=json&q=${rua},${cidade},${estado},Brasil`);
            if (data.length === 0) {
                alert('Coordenadas não encontradas.');
                return;
            }
            const { lat, lon } = data[0];
            // Atualizar informações de coordenadas
            enderecoDeputado.latitude = lat;
            enderecoDeputado.longitude = lon;

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
        } catch (error) {
            console.error('Erro ao buscar coordenadas:', error);
        }
    }

    function salvarEndereco() {
        if (deputadoSelecionado) {
            // Atualizar o objeto deputadoSelecionado com o novo endereço
            deputadoSelecionado.endereco = { ...enderecoDeputado };
            console.log('Endereço salvo:', deputadoSelecionado.endereco); // Debugging
            alert('Informações salvas com sucesso!');
            modal.style.display = 'none';
        } else {
            alert('Nenhum deputado selecionado.');
        }
    }

    fetchDeputados();
});

// document.addEventListener("DOMContentLoaded", function() {
//     let pagina = 1; 
//     const apiUrl = "https://dadosabertos.camara.leg.br/api/v2/deputados";

//     const pokemonNameElement = document.getElementById("Nome");
//     const pokemonImageElement = document.getElementById("UrlFoto");
//     const prevPokemonButton = document.getElementById("anterior");
//     const nextPokemonButton = document.getElementById("proximo");

//     const buscarDadosApi = (id) => {
//         fetch(apiUrl + id)
//             .then(response => response.json())
//             .then(data => {
//                 pokemonNameElement.textContent = data.name;
//                 pokemonImageElement.src = data.sprites.front_default;
//                 pokemonImageElement.onclick = () => mostrarDetalhes(data);
//             })
//             .catch(error => {
//                 console.error("erro ao buscar: ", error);
//                 pokemonNameElement.textContent = "Falha carregar os dados";
//             });
//     };

//     const carregarAnterior = () => {
//         if (pagina > 1) {
//             pagina--;
//             buscarDadosApi(pagina);
//         }
//     };

//     const carregarProximo = () => {
//         pagina++;
//         buscarDadosApi(pagina);
//     };

//     buscarDadosApi(pagina);

//     prevPokemonButton.addEventListener("click", carregarAnterior);
//     nextPokemonButton.addEventListener("click", carregarProximo);


//     const mostrarDetalhes = (pokemonData) => {
//         let detalhes = `Altura: ${encode(pokemonData.height)}<br>`;
//         detalhes += `Peso: ${encode(pokemonData.weight)}<br>`;
//         detalhes += `Tipo: ${encode(pokemonData.types.map(t => t.type.name).join(", "))}<br>`;
//         detalhes += `Habilidades: ${encode(pokemonData.abilities.map(a => a.ability.name).join(", "))}`;
    
//         Swal.fire({
//             title: encode(pokemonData.name),
//             html: detalhes,  
//             imageUrl: pokemonData.sprites.front_default,
//             imageWidth: 200,
//             imageHeight: 200,
//             imageAlt: 'Custom image',
//         });
//     };
    
   
//     function encode(str) {
//         let div = document.createElement('div');
//         div.appendChild(document.createTextNode(str));
//         return div.innerHTML;
//     }
    
// });
