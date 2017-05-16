// Recebe as mensagens do background
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if( request.message === "clicked_browser_action" ) {
      $('body').css('overflow-y', 'auto'); // Evita que a barra de rolagem suma quando o dialogo aparecer
      swal({
        title: "Fatec Jundiaí",
        text: "Digite o nome da matéria aqui:",
        inputPlaceholder: "{espaço para baixar tudo}",
        type: "input",
        inputType: "text",
        confirmButtonText: "Baixar!",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        allowOutsideClick: true,
        animation: "slide-from-top"
      }, function(inputValue){
        
        if(inputValue){
          materia = inputValue.toLowerCase(); // Recebe nome da disciplina
          
          // Configuracoes
          var $materias = $('b > small');
          var ultima = $materias.length;
            var delay = 500;

          // Funcoes auxiliares
          function procuraMateria(index){
            return $('div[id=arqs'+(index)+']');
          };

          var contagem = 0;
          $.each($materias, function(){
            if($(this).text().toLowerCase().includes(materia)){
              contagem++;
            }
          });

          // Principal
          function baixarTudo(){
            $.each($materias, function(index){
                if($(this).text().toLowerCase().includes(materia)){
                  // Procura pela <div id="arqsX"> sendo X o index passado no $.each()
                  procuraMateria(index-1).find('a').each(function(){
                    // $(this) = atributo <a> encontrado dentro da <div>
                    if($(this).attr('href').startsWith('down.php')){
                      var href = $(this).attr('href');
                      var link = document.createElement('a');
                      link.setAttribute('href', href);
                      link.setAttribute('target', '_blank');
                      link.click(); // Executa o download
                    }                
                  });
                } //inclue materia
            }); //$.each
            swal({
              title: "Sucesso!",
              text: "Os seus arquivos foram baixados ;)",
              type: "success",
              allowOutsideClick: true
            });
          } //baixarTudo

          // Controle de execucao
          var semMateria = materia.replace(' ', '') == "";
          if(contagem == 1){
            baixarTudo();
          }else if(contagem > 1 && !semMateria){
            swal({
              title: "Cuidado!",
              text: "Há mais de uma matéria com esse nome, deseja baixar tudo?",
              type: "info",
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              allowOutsideClick: true
            }, function(inputValue){
              if(inputValue){
                baixarTudo();
              }
            });
          }else if(semMateria){
            swal({
              title: "Só pra confirmar!",
              text: "Você quer mesmo baixar tudo?",
              type: "info",
              showCancelButton: true,
              cancelButtonText: "Não",
              confirmButtonText: "Quero!",
              allowOutsideClick: true
            }, function(inputValue){
              if(inputValue){
                baixarTudo();
              }
            });
          }else{
            swal({
              title: "Oops!",
              text: "Essa disciplina não foi encontrada",
              type: "error",
              allowOutsideClick: true
            });
          }

        } // Confirm Button
      });

    }
  }
);