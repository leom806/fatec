chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      $('body').css('overflow', 'auto'); // Evita que a barra de rolagem suma quando o dialogo aparecer
      swal({
        title: "Fatec Jundiaí",
        text: "Digite o nome da matéria aqui:",
        inputPlaceholder: "{vazio vai baixar tudo}",
        type: "input",
        inputType: "text",
        confirmButtonText: "Baixar!",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: true,
        animation: "slide-from-top"
      }, function(inputValue){
        if (inputValue === false) return false;
        else {
          swal({
            title: "Baixando",
            showLoaderOnConfirm: true,
            timer: 2000
          });
          materia = inputValue.toLowerCase();
          $.each($('b > small'), function(index){
            if($(this).text().toLowerCase().includes(materia)){
              
              $('div[id=arqs'+(index-1)+']').find('a').each(function(){
                /* Links */
                if($(this).attr('href').startsWith('down.php')){
                  var href = $(this).attr('href');
                  var link = document.createElement('a');
                  link.setAttribute('href', href);
                  link.setAttribute('target', '_blank');
                  window.setTimeout(function(){
                    link.click();
                  }, 500);

                }
                
              });
            } 
          });
          return true;
        }
      });

    }
  }
);