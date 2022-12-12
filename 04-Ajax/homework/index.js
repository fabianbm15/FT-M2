const URL = "http://localhost:5000/amigos";

let agregar = $("#boton");

let viewList = () => {
    let idLista = $("#lista");
    idLista.empty(); // limpia, vacia todo lo que ese elemento contiene
    $.get(`${URL}`, (data) => {
        console.log(data);
        data.forEach((element) => {
            idLista.append(`<li>${element.name}</li>`);
        });
    });
};
agregar.click(viewList);

let search = $("#search");
// const saludar = ()=>{
//    $.get(`${URL}/1`,(d)=>{
//     console.log(d)
//    })
// }
search.click(() => {
    let id = $("#input").val();
    console.log("id --> ", id);
    let spanAmigo = $("#amigo");
    spanAmigo.empty();
    if (id) {
        $.get(`${URL}/${id}`, (d) => {
            console.log("d ----> ", d);
            spanAmigo.text(d.name);
        });
    } else {
        alert("not found id");
    }

    console.log("next request get amigos by id");
    $("#input").val("");
    // $("#input").empty()
    // $("#input").val().empty()
});

$("#delete").click(() => {
    let inputDelete = $("#inputDelete").val();
    console.log("2", inputDelete);
    if (inputDelete) {
        var buscar;
        $.get(`${URL}`, (data) => {
            buscar = data.filter((e) => {
                // devuelve un array
                return e.id === Number(inputDelete);
            });
            console.log("###", buscar);
            if (buscar.length === 1) {
                $.ajax({
                    url: `${URL}/${inputDelete}`,
                    type: "DELETE",
                    success: function (data) {
                        $("#success").text(buscar[0].name + " se ha eliminado");
                        viewList()
                    },
                });
            } else {
                $("#success").text("")
                alert("no se encuentra o ya fue eliminado")
            }
        });
        console.log("buscarrrrt", buscar);
    } else {
        alert("not found id");
    }
    $("#inputDelete").val("")
});