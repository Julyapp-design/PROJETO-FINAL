const apiKey = "live_ifpixENPzREqDtt2zBNMyOanjnOe9FClgOo5r80R6slTq1g3KYD68smOIuXZDAyH"; 
const baseUrl = 'https://api.thecatapi.com/v1';
 
const botao = document.getElementById('btn-buscar');
const imagem = document.getElementById('gato-img');
const seletor = document.getElementById('raca-select');
const info = document.getElementById('gato-info');
 
async function carregarRacas() {
  try {
    const resposta = await fetch(`${baseUrl}/breeds?api_key=${apiKey}`);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const racas = await resposta.json();
 
    racas.forEach(raca => {
      const opcao = document.createElement('option');
      opcao.value = raca.id;
      opcao.textContent = raca.name;
      seletor.appendChild(opcao);
    });
  } catch (erro) {
    console.error('Erro ao carregar raças:', erro);
  }
}
 
async function buscarGato() {
  try {
    let endereco = `${baseUrl}/images/search?api_key=${apiKey}`;
    if (seletor.value) endereco += `&breed_ids=${seletor.value}`;
 
    const resposta = await fetch(endereco);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
 
    const dados = await resposta.json();
    if (dados.length === 0) {
      imagem.style.display = 'none';
      info.textContent = 'Nenhuma imagem encontrada para essa raça.';
      return;
    }
 
    imagem.src = dados[0].url;
    imagem.style.display = 'inline-block';
 
    const raca = dados[0].breeds?.[0];
    info.textContent = raca ? `${raca.name} - ${raca.temperament}` : '';
  } catch (erro) {
    console.error('Erro ao buscar o gato:', erro);
    info.textContent = 'Erro ao buscar o gato.';
  }
}
 
botao.addEventListener('click', buscarGato);
seletor.addEventListener('change', buscarGato);
 
carregarRacas();
buscarGato();