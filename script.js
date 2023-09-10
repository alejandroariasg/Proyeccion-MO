$( document ).ready(function() {
    $(".captacion-sede").hide();
    /*** Variables globales */
    var n = 42000;
    var ya_evaluados = 10883
    var pendientes = n - ya_evaluados;
    var mes_para_cumplimiento = 0;
    var total_mese_cumplimiento = 0;
    var total_semana_cumplimiento = 0;
    var total_dias_cumplimiento = 0;


    var ctx = document.getElementById("myChart").getContext('2d');
    var mons = [   
        "oct-23", "nov-23", "dic-23", "ene-24", "feb-24", "mar-24", "abr-24", "may-24", "jun-24", "jul-24", "ago-24", "sep-24",
         "oct-24", "nov-24", "dic-24", "ene-25", "feb-25", "mar-25", "abr-25", "may-25", "jun-25", "jul-25", "ago-25", "sep-25", 
         "oct-25", "nov-25", "dic-25", "ene-26", "feb-26", "mar-26", "abr-26", "may-26", "jun-26", "jul-26", "ago-26", "sep-26", 
         "oct-26", "nov-26", "dic-26", "ene-27", "feb-27", "mar-27", "abr-27", "may-27", "jun-27", "jul-27", "ago-27", "sep-27"
    ];
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mons,
            datasets: null},
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height ,
          scales: {
            y: {
                //beginAtZero: true, // Comienza la escala en 0
                suggestedMin: 0,    // Valor mínimo sugerido
                suggestedMax: 50000,  // Valor máximo sugerido
                stepSize: 100        // Tamaño de los intervalos entre los valores en el eje Y
            }
        }
        },
        
    });
    
    /*** CAPTACIÓN ACTUAL POR DIA */
    var pacientes_samenin = 10;
    var pacientes_manizales = 5;
    var pacientes_homo = 20;
    var total_captacion_actual_dia = pacientes_samenin + pacientes_manizales + pacientes_homo;

    var meses_finalizacion_captacion_actual = (pendientes / total_captacion_actual_dia) / 20;
    var años_finalizacion_captacion_actual = años_finalizacion_captacion_actual / 12;

    /**Sumatoría hasta la fecha de cumplimiento con la meta de captación ideal */
    var ya_evaluados_proyeccion_1 = 0;

    var data_chart = [];
    var data_chart_2 = [];

    /**Sumatoría hasta la fecha de cumplimiento con la meta de captación actual */
    var ya_evaluados_proyeccion_2 = ya_evaluados;
    data_chart_2.push(ya_evaluados_proyeccion_2);
    for (let index = 0; index < meses_finalizacion_captacion_actual; index++) {
        ya_evaluados_proyeccion_2 += (total_captacion_actual_dia * 20);
        //if(ya_evaluados_proyeccion_2 > 32000){ break; }
        data_chart_2.push(ya_evaluados_proyeccion_2)
        //console.log("Nuevos evaluados "+index+": "+ ya_evaluados)
    }
   


    $( "#proyeccionActual" ).on( "click", function() {
        var datosActuales =  {
            label: 'Captación Actual', // Name the series
            data: data_chart_2, // Specify the data values array
            fill: false,
            borderColor: '#2d2a2a', // Add custom color border (Line)
            backgroundColor: '#ee8d8d', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        };
    if (myChart.data.datasets.length > 0) {
        // Elimina el dataset por su índice
        myChart.data.datasets.splice(1, 1);
        // Llama al método update() para aplicar los cambios y refrescar el gráfico
        myChart.update();
    } 
    
    myChart.data.datasets.push(datosActuales);
    myChart.update();
        
    } );

    $("#proyeccionCaptacion").on( "click", function() {
        $(".captacion-sede").show();
        mes_para_cumplimiento = 0;
        total_mese_cumplimiento = 0;
        total_semana_cumplimiento = 0;
        total_dias_cumplimiento = 0;
        data_chart=[];
        ya_evaluados_proyeccion_1 = ya_evaluados;
        data_chart.push(ya_evaluados_proyeccion_1);

        var fechaFinalizacion = new Date($('#fechaFinalizacion').val());
        var fechaActual = new Date($('#fechaImplementacion').val());

        // Calcular la diferencia en meses
        var diferenciaMeses = (fechaFinalizacion.getFullYear() - fechaActual.getFullYear()) * 12 + (fechaFinalizacion.getMonth() - fechaActual.getMonth());
        $('#captacionMensualProyeccion').val(diferenciaMeses);

        mes_para_cumplimiento = diferenciaMeses;
        total_mese_cumplimiento =  Math.round(pendientes / mes_para_cumplimiento);
        total_semana_cumplimiento = total_mese_cumplimiento / 4;
        total_dias_cumplimiento = total_semana_cumplimiento / 5;

        $('#pacientesMes').val(total_mese_cumplimiento);
        $('#pacientesSemana').val(total_semana_cumplimiento);
        $('#pacientesDia').val(total_dias_cumplimiento);

        data_chart.push[ya_evaluados];
        for (let index = 0; index < mes_para_cumplimiento; index++) {
            ya_evaluados_proyeccion_1 += total_mese_cumplimiento;
            //if(ya_evaluados_proyeccion_1 >= 33000){ break; }
            data_chart.push(Math.round(ya_evaluados_proyeccion_1))
            //console.log("Nuevos evaluados "+index+": "+ ya_evaluados_proyeccion_1)
        }
            
        $('#captacion-sameinagua').val( Math.round(total_dias_cumplimiento * (11 / 100)) );
        $('#captacion-sameinsan').val( Math.round(total_dias_cumplimiento * (11 / 100)) );
        $('#captacion-ceja').val( Math.round(total_dias_cumplimiento * (17 / 100)) );
        $('#captacion-mani').val( Math.round(total_dias_cumplimiento * (11 / 100)) );
        $('#captacion-homo').val( Math.round(total_dias_cumplimiento * (50 / 100)) );
        $('#total').val(parseFloat($('#captacion-sameinagua').val()) + parseFloat($('#captacion-sameinsan').val()) + parseFloat( $('#captacion-ceja').val()) + parseFloat( $('#captacion-mani').val()) + parseFloat( $('#captacion-homo').val()));
    });

    $(".cap-sede").on( "input", function() {
        var dia = parseInt($('#pacientesDia').val());
        var sameinagua = parseInt($('#captacion-sameinagua').val());
        var sameinsan = parseInt($('#captacion-sameinsan').val());
        var ceja = parseInt($('#captacion-ceja').val());
        var mani = parseInt( $('#captacion-mani').val()); 

        $('#captacion-homo').val(  dia - sameinagua - sameinsan - ceja - mani);
    });

    $("#captacion-homo").on( "input", function() {
        var dia = parseInt($('#pacientesDia').val());
        var sameinagua = parseInt($('#captacion-sameinagua').val());
        var sameinsan = parseInt($('#captacion-sameinsan').val());
        var ceja = parseInt($('#captacion-ceja').val());
        var mani = parseInt( $('#captacion-mani').val()); 
        var homo = parseInt( $('#captacion-homo').val()); 
        
        $('#total').val( sameinagua + sameinsan + ceja + mani + homo);
    });

    /** Funcion para mostrar nuevo dataset */
    $( "#proyeccionEsperada" ).on( "click", function() {
        var nuevosDatos = {
                label: 'Captación Esparada', // Name the series
                data: data_chart, // Specify the data values array
                fill: false,
                borderColor: '#2196f3', // Add custom color border (Line)
                backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                borderWidth: 1 // Specify bar border width
            };
        if (myChart.data.datasets.length > 0) {
            // Elimina el dataset por su índice
            myChart.data.datasets.splice(1, 1);
            // Llama al método update() para aplicar los cambios y refrescar el gráfico
            myChart.update();
        } 
        
        myChart.data.datasets.push(nuevosDatos);
        myChart.update();
    });

});





