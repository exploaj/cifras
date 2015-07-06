/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function General(depto)
{
    var valorpoblacion, imagens;
    $.ajax({
	//url:'http://siip.produccion.gob.bo/noticias/jsonservice.php',
	url:'http://localhost/udapro/noticias/jsonservice5.php',
	type:'get',
	data:{
            flag:'general', dep:depto
	},
	dataType: 'jsonp',
	jsonp: 'callback',
	success:function(data){
                valorpoblacion=data["poblacion"];
                imagens=data["imagen"];
                $("#NombreDepto").html("<h2>Cifras "+data["NombreDepto"]+"</h2>");
                $("#imagens").html(imagens);
                $("#poblacion").html('<br>'+valorpoblacion);
	},
	error:function(error,gu,tt){
            alert(error.responseText+gu+tt);
	}
	});
}

function Cargar(dpto)
{
	$("#tabla").html('<img src="img/ajax-loader.gif"/> Cargando datos...');
	var tabla='';
	var noticia_cuerpo;
	var color1,color2;
	tabla='<table width="100%" id="tablaDatos" class="table1"><thead> <tr> <th width="76%" rowspan="2" align="center" valign="middle">Producto</th> <th width="9%" rowspan="2" align="center" valign="middle">Unidad</th> <th width="4%" rowspan="2" align="center" valign="middle">Precio en Bs.</th> <th colspan="2" align="center" valign="middle">Variación</th> <th width="2%" rowspan="2" align="center" valign="middle"><i class="fa fa-bar-chart-o"></i></th> </tr> <tr> <th width="3%" align="center" valign="middle">día</th> <th width="4%" align="center" valign="middle">Sem.</th> </tr></thead><tbody>';
  
	$.ajax({
		url:'http://siip.produccion.gob.bo/noticias/jsonservice.php',
		//url:'../../noticias/jsonservice.php',
		type:'get',
		data:{
			flag:'PreciosDiarios', dpt:dpto
		},
		dataType: 'jsonp',
		jsonp: 'callback',
		success:function(data){
			hfecha=data[0].fecha;
			var lugar=''+data[0].depto+', datos del '+ hfecha+'';
			$("#detalle").html(lugar);
			for(var  i=0;i<data.length;i++)
			{   				
				color1="";
				if(data[i].dia_ant<0) color1='class="b2"';
				if(data[i].dia_ant>0) color1='class="b1"';
				
				color2="";
				if(data[i].sem_ant<0) color2='class="b2"';
				if(data[i].sem_ant>0) color2='class="b1"';
				
				//alert(data[i].codigo+' - '+format(data[i].precio));
				tabla+='<tr class="b3"><td >'+data[i].producto+'</td><td>'+data[i].unidad+'</td><td>'+format(data[i].precio)+'</td><td '+color1+'>'+format(data[i].dia_ant)+'</td><td '+color2+'>'+format(data[i].sem_ant)+'</td><td><a type="button" class="btn" style="width:100%;" href="#test_modal" data-toggle="modal" onClick="CargarGrafico('+data[i].codigo+','+dpto+')"><i class="fa fa-bar-chart-o"></i></a> </td></tr>';
				//alert('<tr class="b3"><td >'+data[i].producto+'</td><td>'+data[i].unidad+'</td><td>'+format(data[i].precio)+'</td><td '+color1+'>'+format(data[i].dia_ant)+'</td><td '+color2+'>'+format(data[i].sem_ant)+'</td><td><a type="button" class="btn" style="width:100%;" href="#test_modal" data-toggle="modal" onClick="CargarGrafico('+data[i].codigo+','+dpto+')"><i class="icon-bar-chart"></i></a> </td></tr>');
			}
			tabla+='</tbody><tr aling="left"><td colspan="6" >Fuente: MDRyT-OAP, Elaboración UDAPRO</td></tr></table>'
			$("#tabla").html(tabla);
			
		},
		error:function(error,gu,tt){
			alert(error.responseText+gu+tt);
		}
	});
}
