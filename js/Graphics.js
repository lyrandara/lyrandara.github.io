(function($) {
  let fn = function() {
    let sin = []
    for (let i = 0; i < 24; i += 2) {
      sin.push([i, Math.sin(i) * 0.1 + 79])
    }
    let power_data = {
      data: sin,
      color: '#3c8dbc'
    }
    $.plot('#power-chart', [power_data], {
      grid: {
        hoverable: true,
        borderColor: '#f3f3f3',
        borderWidth: 1,
        tickColor: '#f3f3f3'
      },
      series: {
        shadowSize: 0,
        lines: {
          show: true
        },
        points: {
          show: true
        }
      },
      lines: {
        fill: false,
        color: ['#3c8dbc', '#f56954']
      },
      yaxis: {
        show: true
      },
      xaxis: {
        show: true,
        max: 24
      }
    });

    let moneys_data = {
      data: [[1, 20], [2, 25], [3, 27], [4, 52], [5, 79], [6, 131], [7, 140], [8, 135], [9, 70], [10, 20], [11, 5], [12, 1]],
      bars: {show: true}
    }
    $.plot('#moneys-chart', [moneys_data], {
      grid: {
        borderWidth: 1,
        borderColor: '#f3f3f3',
        tickColor: '#f3f3f3'
      },
      series: {
        bars: {
          show: true, barWidth: 0.5, align: 'center',
        },
      },
      colors: ['#3c8dbc'],
      xaxis: {
        ticks: [
          [1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'June'],
          [7, 'July'],
          [8, 'Aug'],
          [9, 'Sept'],
          [10, 'Oct'],
          [11, 'Nov'],
          [12, 'Dec'],
        ]
      }
    })

    let vueModel = {
      el: ".vue",
      computed: {},
      data: {},
      methods: {},
      created() {
        mvLoading.Hide();
      }
    };

    let mvLoading = new LoadingMV(vueModel);
    let mvStations = new CitiesAggregatorMV(vueModel);

    app = new Vue(vueModel);
  }

  fn();
})(jQuery);
