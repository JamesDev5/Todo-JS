const form = document.getElementById("formulario")
form.addEventListener("submit", (e)=>{e.preventDefault()})


const guardar = () => 
JSON.parse(localStorage.getItem('bancoDados')) ??[];
const selecionar = (dados) => 
localStorage.setItem(`bancoDados`,JSON.stringify(dados))


var criarTarefas = (tarefa, status, indice,) =>{
   
  const novaTarefa = document.createElement('div');
  novaTarefa.classList.add('lista')
  novaTarefa.innerHTML =`
  <input
    type="checkbox"${status} 
    data-indice=${indice} 
    id="icon-status" 
    class="icon-status" 
  />
  
  <div>${tarefa}</div><br/>
  
  <button 
    type ="button" 
    data-indice=${indice} 
    id="icon-trash" 
    class="icon-trash">
  </button>
    
  `
  document.getElementById("conteudo").appendChild(novaTarefa);

  
} 

const atualizarPagina = () =>{
  limpar();
  const dados = guardar();
  dados.forEach((novaTarefa, indice) => 
  criarTarefas(novaTarefa.tarefa,novaTarefa.status,indice));
}
const limpar = () =>{
  const conteudo = document.getElementById("conteudo");
  while (conteudo.firstChild){
    conteudo.removeChild(conteudo.lastChild)
  }
}
const limparTarefas = (indice) =>{
  const dados = guardar();
  dados.splice(indice,1)
  selecionar(dados);
  atualizarPagina()
} 
const selecionarTarefas = (indice) =>{
  const dados = guardar();
  dados[indice].status = dados[indice].status === '' ? 'checked': ''
  selecionar(dados)
  atualizarPagina()
}


const acoesTarefa = (e,indice) => {
  const elemento = e.target;
  if(elemento.id === 'icon-trash'){
    indice = elemento.dataset.indice;
    limparTarefas(indice);
   }

   else if(elemento.type === 'checkbox'){
      const indice = elemento.dataset.indice
       selecionarTarefas(indice)

   } 
   
  }
  const acoesRodape = (e,indice) =>{
    const elemento = e.target

if(elemento.id === "limparTodos"){
  localStorage.removeItem('bancoDados')
  atualizarPagina()

}else if(elemento.id === "ativos"){
  const dados = guardar()
  indice=elemento.dataset.indice
var filtro = dados.filter(tarefas => 
 tarefas.status === '')


limpar()
  for(const tarefas in filtro)
  
  criarTarefas(JSON.stringify((dados[tarefas].tarefa))) 


  }
 if(elemento.id === "completas"){
  const dados = guardar()
  indice=elemento.dataset.indice

var filtro = dados.filter(tarefas => 
 tarefas.status === 'checked')

limpar()
  for(const tarefas in filtro)
  criarTarefas(JSON.stringify(filtro[tarefas].tarefa)) 

  } if(elemento.id === "mostarTodos"){
    atualizarPagina()
  }
}



const inserirTarefas = (e) =>{
  const tecla = e.key
  const valor = e.target.value
  const tarefaVazia = document.getElementById("trabalhos")
  
  
  
  if (tecla === 'Enter' && tarefaVazia.value != ""){
        const dados= guardar();
        dados.push ({'tarefa':valor,'status':'' })
        selecionar(dados)
        atualizarPagina()
  e.target.value = ''

  }
}

 
  const html = document.querySelector("html")
  const pegarEstilo = (element, style)=>
  window
 
.getComputedStyle(element)
.getPropertyValue(style)
const coresIniciais = {
  bgHeader:pegarEstilo(html,'--bg-header'),
  bgBody:pegarEstilo(html,'--bg-body'),
  bgFooter:pegarEstilo(html,'--bg-footer'),
  textHeader:pegarEstilo(html,'--text-header'),
  textBody:pegarEstilo(html,'--text-body'),
  colorDivider:pegarEstilo(html,'--color-divider'),
  bgInput:pegarEstilo(html,'--bg-input'),
  button:pegarEstilo(html,'--button'),
  buttonHover:pegarEstilo(html,'--button-hover'),
  bgConteudo:pegarEstilo(html,'--bg-conteudo')
}
const coresNoturnas = {
  bgHeader:"#090c08",
  bgBody:"#212026",
  bgFooter:"#090c08",
  textHeader:"#6e6885",
  textBody:"#ffffff",
  colorDivider:"#514174",
  bgInput:"#ffffff",
  button:"#c2aeee",
  buttonHover:"#383343",
  bgConteudo:"#302E38"
}
const transformarChave = key =>
"--"+key.replace(/([A-Z])/,"-$1").toLowerCase()

const trocarCores = (cores) =>{
  Object.keys(cores).map(key=>
    html.style.setProperty(transformarChave(key),cores[key]))
    console.log(cores)
  }
  
  
  const trocarTema = (e)=>{
  e=document.getElementById('botaoTroca').classList.toggle('icon-sun')
  e? trocarCores(coresNoturnas):trocarCores(coresIniciais)
 }


document.getElementById("botaoTroca").addEventListener(
                            'click',trocarTema)  
document.getElementById("trabalhos").addEventListener(
                            'keypress',inserirTarefas)
document.getElementById("conteudo").addEventListener(
                            'click',acoesTarefa)
document.getElementById("rodape").addEventListener(
                            'click',acoesRodape)







atualizarPagina();