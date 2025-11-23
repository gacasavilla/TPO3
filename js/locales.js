const categorias = ["Accesorios", "Belleza", "Juguetería","Indumentaria", "Tecnología"]

function agregarCategorias(categorias, selector){
    categorias.forEach(categoria => {
        let texto = '<option value="' + categoria + '">' + categoria + '</option>'
        selector.innerHTML+=texto
    })
}


function filtrarLocales(lista_locales, categoria){
    lista_locales.forEach(local => {
        if(categoria == ""){
            local.classList.remove("ocultar")
        }else if(local.dataset.categoria != categoria){
            local.classList.add("ocultar")
        }else if(local.dataset.categoria == categoria){
            local.classList.remove("ocultar")
        }
    })
}

document.addEventListener("DOMContentLoaded", function(){
    const selector = document.getElementById("selector-categoria");
    const lista_locales = document.querySelectorAll(".local");
    const boton = document.getElementById("boton-limpia-filtros");

    agregarCategorias(categorias, selector);

    selector.addEventListener("change", function(){
        filtrarLocales(lista_locales, this.value)
    });

    boton.addEventListener("click", function(){
        selector.selectedIndex = 0;
        filtrarLocales(lista_locales, "")
    })

});