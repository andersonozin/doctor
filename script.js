function gerarPDF(event) {
  event.preventDefault();

  const empresa = document.getElementById('nomedaempresa').value;
  const cnpj = document.getElementById('cnpjdaempresa').value;
  const endereco = document.getElementById('enderecodempresa').value;
  const numeroOs = document.getElementById('numerodaos').value;
  const dataAbertura = document.getElementById('datadeabertura').value;
  const dataResolucao = document.getElementById('dataderesolucao').value;
  const cliente = document.getElementById('nomedocliente').value;
  const cpf = document.getElementById('cpfdocliente').value;
  const telefone = document.getElementById('telefonedocliente').value;
  const descricao = document.getElementById('descricaodoservico').value;
  const valor = document.getElementById('valordoservico').value;

  const doc = new window.jspdf.jsPDF();
  let y = 20;
  const pageHeight = doc.internal.pageSize.height;

  const addField = (label, value) => {
    doc.setFontSize(14);
    const lines = doc.splitTextToSize(value, 180);
    const neededHeight = 8 + lines.length * 8;

    // Quebra de página automática
    if (y + neededHeight >= pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    doc.text(`${label}:`, 10, y);
    doc.text(lines, 10, y + 8);
    y += neededHeight;
  };

  doc.setFontSize(16);
  doc.text(`Ordem de Serviço Nº ${numeroOs}`, 10, y);
  y += 12;

  addField('Empresa', empresa);
  addField('CNPJ', cnpj);
  addField('Endereço', endereco);
  addField('Data de Abertura', dataAbertura);
  addField('Data de Resolução', dataResolucao);
  addField('Cliente', cliente);
  addField('CPF', cpf);
  addField('Telefone', telefone);
  addField('Descrição do serviço', descricao);
  addField('Valor do serviço', `R$ ${valor}`);

  if (y + 10 >= pageHeight - 20) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(10);
  doc.text(`Versão Gratuita - Assinaturas e imagens indisponíveis.`, 10, y + 10);

  doc.save(`OS_${numeroOs}.pdf`);
}

// Carrega jsPDF dinamicamente
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
script.onload = () => {
  window.jspdf = window.jspdf || window.jspdf;
  console.log("jsPDF carregado!");

  document.getElementById('formularios').addEventListener('submit', gerarPDF);
};
document.head.appendChild(script);
