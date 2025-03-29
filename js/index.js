let cropper;
// Dispara uma função sempre que o usuario selecionar um arquivo
document.getElementById('fileInput').addEventListener('change', function(e) {
  const files = e.target.files; // Retorna uma lista dos arquivos selecionados
  // Verifica se há algum arquivo e se algum foi selecionado
  if (files && files.length > 0) {
    const image = document.getElementById('image');
    // Pega o primeiro arquivo da lista de arquivos selecionado
    const file = files[0]; 

    // Define o src da tag <img>
    if (URL) {
      image.src = URL.createObjectURL(file); // Cria uma URL temporaria para a imagem
    } else if (FileReader) { 
      // Alternativa para navegadores antigos que nao suportam URL.createObjectURL 
      const reader = new FileReader();
      reader.onload = function(e) {
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    // Verifica se há uma instancia cropper e apaga ela
    if (cropper) {
      cropper.destroy();
    }
    // Dispara uma função quando a imagem terminar de carregar
    image.onload = function() {
      // Cria uma nova instancia cropper
      cropper = new Cropper(image, {
        aspectRatio: 300 / 298, // Define o tamanho inicial da area de corte
        viewMode: 1, // Define o modo de visualização
        guides: false, // Desativa as guias
        background: false, // Desativa o background
        cropBoxResizable: false, // Desativa o redimencionamento da area de corte
        dragMode: 'move', // Define o modo inicial para mexer a imagem
        toggleDragModeOnDblclick: false, // Impede que o user troque de modo 
      });
    };
  }
});
// Dispara uma função quando o botao de recorte for clicado
document.getElementById('cropBtn').addEventListener('click', function() {
  // Verifica se o cropper esta inicializado 
  if (cropper) {
    // Pega a verção cortada da imagem
    const canvas = cropper.getCroppedCanvas(); 
    if (canvas) {
      // Tranforma a imagem recortada em um blob (um tipo de obj representado
      // por binarios) Dispara uma função para lidar com este blob
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob); // Cria um URL temporario para imagem recortada
        const a = document.createElement('a'); // Cira um link que sera usado apra o dowload
        a.href = url; // Define o href do <a> (link)
        a.download = 'imagem-recortada.jpg'; // Define o nome do arquivo que sera baixado
        a.click(); // Simula o click no link para fazer o dowload
      }, 'image/jpeg', 0.95); 
    }
  }
});
