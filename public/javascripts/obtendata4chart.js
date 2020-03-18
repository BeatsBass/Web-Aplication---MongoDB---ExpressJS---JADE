$(document).ready(function() {
	graficar();
});

function graficar() {
	//console.log('hola');
    var array1 = ($('#midatxy').attr('data_chartx')).split(',');
    var array2_t =($('#midatxy').attr('data_charty')).split(',');
    var array2 = new Array();
    for (var i = 0; i < array2_t.length; i++) {
    	array2[i] = Number(array2_t[i]);
    }
    console.log(array2);
    //Number() parseFloat()
    /*
	console.log(array1);console.log(array2);*/
	/*var data2 = [{
                semestre: '2014-I',
                promedio: 18,
                ponderado: 1 },
              { semestre: '2014-II',
                promedio: 10,
                ponderado: 0  },
              { semestre: '2015-I',
                promedio: 20,
                ponderado: 1  },
              { semestre: '2015-II',
                promedio: 20,
                ponderado: 0  },
              { semestre: '2016-I',
                promedio: 13,
                ponderado: 0  },
              { semestre: '2016-II',
                promedio: 11,
                ponderado: 0  }];
    var array1 = new Array();
            var array2 = new Array();
            for (var i = 0; i < data2.length; i++) {
                array1 [i] = data2[i].semestre;
                array2 [i] = data2[i].promedio;
            }
    */
    Highcharts.chart('grafico_chart', {
                title: {
                    text: 'Promedios x Semestres',
                    style: {
                      color: '#3C4858',
                      fontWeight: 'bold',
                      fontSize:'1.4em',
                      background:'#000'
                    },
                    align:'center'
                },

                subtitle: {
                    text: '<strong>Fuente:</strong> Leandro ALviña <br>'+new Date()
                },
                xAxis: {
                    title:{
                        text:''
                    },
                    categories: array1
                },

                yAxis: {
                    title: {
                        text: ''
                    },
                    max:21,
                    min:0,
                    showLastLabel:false,
                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,
                    plotLines:[{
                        value:13,
                        color:'rgba(0, 150, 136,.5)',
                        width:2
                    },{
                        value:7,
                        color:'rgba(0, 150, 136,.5)',
                        width:2
                    }],
                    plotBands: [{
                        from: 13,
                        to: 21,
                        className:'hola',
                        label: {
                            text: 'Ponderado',
                            style: {
                                color: 'teal',
                                fontWeight:'bold',
                                fontSize:'11px'
                            }
                        }
                    },{
                        from: 0,
                        to: 7,
                        label: {
                            text: 'Reprobado',
                            style: {
                                color: 'rgba(244, 0, 0, 0.86)',
                                fontWeight: 'bold',
                                fontSize:'11px'
                            }
                        }
                    },{
                        from: 7,
                        to: 13,
                        label: {
                            text: 'Desaprobado',
                            style: {
                                color: 'rgba(244, 0, 0, 0.56)',
                                fontWeight: 'bold'
                            },
                        }
                    }]
                },
                legend: {
                    enabled:false
                },
                tooltip: {
                    color:'transparent',
                    formatter: function () {
                        console.log(this);
                        this.color="transparent";
                        this.series.color ="transparent";
                        return '<h5 style="color:#e91e63;font-weight:bold">' + this.series.name + '</h5><br/>' +
                        '<h4><strong>Promedio:</strong> '+this.point.y+'</h4>'+'<br><h4><strong>Semestre:</strong> '+this.x+'</h4>';
                    },
                    backgroundColor:'rgba(255,255,255,.8)',
                    borderColor:'rgba(0,0,0,0)',
                    borderRadius:0,
                    borderWidth:0,
                    shadow:false
                },
                series: [{
                    type: 'spline',
                    name: ' ',
                    data: array2,
                    lineWidth:3,
                    color: 'rgba(55,55,55,.7)',//'#E91E63'//'rgba(0,0,0,.5)'//'rgba(0, 150, 136,.6)'
                }]
    });
    Highcharts.chart('grafico_chart2', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
            text: '% de Créditos Obtenidos y Perdidos',
            style: {
              color: '#3C4858',
              fontWeight: 'bold',
              fontSize:'1.4em',
              background:'#000'
            },
            align:'center'
        },

        subtitle: {
            text: '<strong>Fuente:</strong> Leandro ALviña <br>'+new Date()
        },
	    tooltip: {
	    	color:'transparent',
            /*formatter: function () {
                        console.log(this);
                        this.color="transparent";
                        this.series.color ="transparent";
                        return '<h5 style="color:#e91e63;font-weight:bold">' + this.series.name + '</h5><br/>' +
                        '<h4><strong>Promedio:</strong> '+this.point.y+'</h4>';
            },*/
            backgroundColor:'rgba(255,255,255,.8)',
            borderColor:'rgba(0,0,0,0)',
            borderRadius:0,
            borderWidth:0,
            shadow:false,
            enabled:false,
	        pointFormat: '<b>{point.percentage:.1f}%</b> = 10'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                color:'#e91e63',
	                format: '<b style="font-size:10px;">{point.name}</b><br> <h5 class="small" style="color:#3C4858">{point.percentage:.1f} %</h5>',  
	            },
	            className:'gol2',
	            showInLegend: true
	        }
	    },
	    series: [{
	        name: '	Creditos',
	        colorByPoint: true,
	        data: [{
	            name: 'Aprobados',
	            y: 90.8
	        }, {
	            name: 'Desaprobados',
	            y: 9.2,
	            sliced: true,
	            selected: true
	        }]
	    }]
	});
	Highcharts.chart('grafico_chart3', {
	    chart: {
	        type: 'column'
	    },
	    title: {
                    text: 'Creditos x Semestres',
                    style: {
                      color: '#3C4858',
                      fontWeight: 'bold',
                      fontSize:'1.4em',
                      background:'#000'
                    },
                    align:'center'
                },
        subtitle: {
                    text: '<strong>Fuente:</strong> Leandro ALviña <br>'+new Date()
        },
	    xAxis: {
	        categories:array1 //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
	    },
	    yAxis: {
	        min: 0,
	        showLastLabel:false,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
	        title: {
	            text: 'Total Créditos'
	        },
	        stackLabels: {
	            enabled: true,
	            style: {
	                fontWeight: 'bold',
	                color:'gray'
	            }
	        }
	    },
	    legend: {
	        align: 'center',
	        //x: -30,
	        verticalAlign: 'bottom',
	        //y: 25,
	        //floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	        borderColor: '#CCC',
	        borderWidth: 0,
	        shadow: false
	    },
	    tooltip: {
	        headerFormat: '<b>{point.x}</b><br/>',
	        pointFormat: '{series.name}: {point.y} Creditos',//<br/>Total: {point.stackTotal} Creditos',
	        backgroundColor:'rgba(255,255,255,.8)',
            //borderColor:'rgba(0,0,0,0)',
            borderRadius:0,
            borderWidth:0,
            shadow:false,
            enabled:false
	    },
	    plotOptions: {
	        column: {
	            stacking: 'normal',
	            dataLabels: {
	                enabled: true,
	                style:{
	                	color:'#e91e63',
	                	fontWeight:'bold'
	                },
	                className:'gol',
	                //backgroundColor:'rgba(255,255,255,.4)'
	            }
	        }
	    },
	    series: [{
	        name: 'Aprobado',
	        data: [10, 16, 13, 21, 21],
	        color:"#626c90"
	    }, {
	        name: 'Desarpobado',
	        data: [11, 5, 8, 0, 3],
	        color:'#906aa0'//#826290
	    }]
	});
	/*Highcharts.chart('grafico_chart4', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Stacked column chart'
	    },
	    xAxis: {
	        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Total fruit consumption'
	        }
	    },
	    tooltip: {
	        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
	        shared: true
	    },
	    plotOptions: {
	        column: {
	            stacking: 'percent'
	        }
	    },
	    series: [{
	        name: 'John',
	        data: [5, 3, 4, 7, 2]
	    }, {
	        name: 'Jane',
	        data: [2, 2, 3, 2, 1]
	    }, {
	        name: 'Joe',
	        data: [3, 4, 4, 2, 5]
	    }]
	});*/
}