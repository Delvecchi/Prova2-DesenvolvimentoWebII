const inputcep = document.querySelector('#cep')
const botaobuscar = document.querySelector('#buscar')   
const inputrua = document.querySelector('#rua')
const inputcidade = document.querySelector('#cidade')
const inputbairro = document.querySelector('#bairro')
const inputuf = document.querySelector('#uf')
botaobuscar.addEventListener('click',async function(e){
    console.log(e.target)
    e.preventDefault()
async function buscaRuas(uf,cidade,rua){ 
    const request = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json//`);
    return request.json();
    }  
const dados = await buscaRuas(inputuf.value,inputcidade.value,inputrua.value)
const ul = document.createElement('ul')
dados.forEach(element => {
    const li = document.createElement('li')
    li.innerHTML = element.cep
    ul.appendChild(li)
    document.body.appendChild(ul)
});
console.log(dados)
})
inputcep.addEventListener('blur',async function(){
    inputuf.value = '...'
    inputcidade.value = '...'
    inputbairro.value = '...'
    inputrua.value = '...'
    if(inputcep.value === ""){
        alert("cep vazio")
        return true;
    }
    
 function preencherForm(dados){
    inputuf.value = dados.uf
    inputcidade.value = dados.localidade
    inputbairro.value = dados.bairro
    inputrua.value = dados.logradouro
 }   
 async function buscaCep(cep){ //https://viacep.com.br/ws/01001000/json/
  const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return request.json();
}  

const retorno = await buscaCep(inputcep.value)
preencherForm(retorno)

})