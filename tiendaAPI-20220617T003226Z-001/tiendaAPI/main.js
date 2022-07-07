listarProducto();

function buscarProducto(){
    const idprodu= document.getElementById('idproducto').value;
    fetch(`https://fakestoreapi.com/products/${idprodu}`)
    .then(res=>res.json())
    .then((prod) =>{
        mostrarProducto(prod);
    })
}

function mostrarProducto(producto){

    const nombreProducto = document.querySelector('#nombre');
    nombreProducto.textContent = producto.title;

    const precioProducto = document.querySelector('#precio');
    precioProducto.textContent = producto.price;

    const categoriaProducto = document.querySelector('#categoria');
    categoriaProducto.textContent = producto.category

    const imagenProducto = document.querySelector('#imagen');
    imagenProducto.src = producto.image
    
}

function listarProducto(){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((prod) =>{
                insertarProducto(prod);
            });

}

var produtos;
function insertarProducto(prod){
    let res = document.querySelector('#tab')
    var html ='<tr>';
    for(let item of prod){
        html += `<td><table><tr>
        <tr><b> ${item.category}</b></tr>
        <tr> ${item.title}</tr>
        <tr><b>${item.price}</b></tr>
        <tr><img src=${item.image} width="100" height="100"></tr>
        <tr> <b>Agregar: </b> <input style="opacity:1; pointer-events:all; margin-left:10px;position: inherit" type="checkbox" id="${item.id}" class="form-control"> <br>
        <input type="number" name"${item.id}" min="0" max="${item.rating.count}" > Cantidad</tr>
        </tr></table>
        </td>`
    }
    html+="</tr>";
    produtos = prod;
    res.innerHTML = html;
}    

detalle = [];
function comprar(){
    detalle = [];
    total = 0;
    var tabla = document.getElementById("tab");
    for(var i = 0; i < tabla.rows[0].children.length; i++){
        var tr = tabla.rows[0].children;
        if(tr[i].children[4].checked){
            detalle.push({"nombre" : tr[i].childNodes[1].data,
                            "precio" : Number(tr[i].children[1].innerHTML),
                            "cantidad" : Number(tr[i].children[6].value)});
            total +=  Number(tr[i].children[1].innerHTML) * Number(tr[i].children[6].value);
        }
    }
    llenarDetalle(total , detalle);
}

function llenarDetalle(total, detalle){
    var html = "";
    for(var i = 0; i < detalle.length; i++){
        html += "<rt><td>"+ detalle[i].nombre+"</td><td>"+ detalle[i].precio+"</td>"+
            "<td>"+ detalle[i].cantidad+"</td><td>"+ Number(detalle[i].cantidad * detalle[i].precio).toFixed(2) +"</td></tr>";
    }
    html+= "<tr><td style='text-align: center'><b>TOTAL<b></td><td></td><td></td><td><b>"+total+"</b></td></tr>";
    var detallet = document.getElementById("detalleTbl");
    detallet.innerHTML = html
}
             
//Prueba merge
//Una prueba     
