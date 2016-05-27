(function($) {
	
	'use strict';
	
	$.charts = {
		init : function() {
			
		},
		
		buildLine : function(regx, title, subtitle, yAxisTitle, yAxisUnit, series, height, max) {
			$(regx).highcharts({
				chart: {
					type : 'line',
					height : !height ? 300 : height,
					zoomType: 'x',
					spacingRight: 20,
					borderRadius: 0,
				},
				title: {
					text: title
				},
				subtitle: {
					text: subtitle
				},
				credits: {
					enabled: false
				},
				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					min: 0,
					max : max,
					title: {
						text: yAxisTitle
					}
				},
				exporting: {
					enabled: false
				},
				tooltip: {
					xDateFormat: '%Y-%m-%d',
					shared: true,
					crosshairs: true,
				},
				plotOptions: {
		            line: {
		                dataLabels: {
		                    enabled: true
		                }
		            }
		        },
		        series: series
			});
		},
		
		buildLineX : function(regx, title, subtitle, xAxis, yAxisTitle, yAxisUnit, series, height, max) {
			$(regx).highcharts({
				chart: {
				type : 'line',
				height : !height ? 300 : height,
						zoomType: 'x',
						spacingRight: 20,
						borderRadius: 0,
			},
			title: {
				text: title
			},
			subtitle: {
				text: subtitle
			},
			credits: {
				enabled: false
			},
			yAxis: {
				min: 0,
				max : max,
				title: {
				text: yAxisTitle
			},
			labels: {
				formatter: function() {
				return this.value + ((undefined == yAxisUnit) ? '' : yAxisUnit);
			}
			}
			},
			exporting: {
				enabled: false
			},
			tooltip: {
				xDateFormat: '%Y-%m-%d',
				shared: true,
				crosshairs: true,
			},
			plotOptions: {
				line: {
				dataLabels: {
				enabled: true
			}
			}
			},
			series: series
			});
		},
		
		buildAreaAndLine : function(regx, title, subtitle, yAxisTitle, yAxisUnit, lineColor, series) {
			$(regx).highcharts({
				chart: {
					height : 300,
	                zoomType: 'x',
	                spacingRight: 20,
		            borderRadius: 0,
	            },
	            title: {
	                text: title
	            },
	            subtitle: {
	                text: subtitle
	            },
	            credits: {
		        	enabled: false
		        },
	            xAxis: {
	                type: 'datetime'
	            },
	            yAxis: {
		        	min: 0,
	                title: {
	                    text: yAxisTitle
	                },
	                labels: {
		                formatter: function() {
		                    return this.value + ' ' + yAxisUnit;
		                }
		            }
	            },
	            plotOptions: {
	                area: {
	                    fillColor: {
	                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
	                        stops: [
	                            [0, Highcharts.getOptions().colors[0]],
	                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                        ]
	                    },
	                    lineWidth: 1,
	                    marker: {
	                        enabled: false
	                    },
	                    shadow: false,
	                    states: {
	                        hover: {
	                            lineWidth: 1
	                        }
	                    },
	                    threshold: null
	                },
	                line: {
		        		color: lineColor,
		        		lineWidth: 1,
		        		states: {
	                        hover: {
	                            lineWidth: 1
	                        }
	                    },
		            	marker: {
		            		radius: 0
		            	}
		        	},
		        	series: {
		        		turboThreshold: 0
		        	}
	            },
	            exporting: {
		            enabled: false
		        },
				tooltip: {
					xDateFormat: '%Y-%m-%d',
					shared: true,
					crosshairs: true
				},
	            series: series
		    });
		},
		
		buildPie: function(regx, title, series) {
			$(regx).highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: title
				},
				credits: {
					enabled: false
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.y}</b>'
				},
				plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
				series: series
			});
		}
	}
	
})(jQuery);