var charts = [
  {
    type: 'location',
    chartName: 'Month',
    title: 'Behavior Events By Month',
    yTitle: 'Events',
    chart: 'column',
    height: 300,
  },
  {
    type: 'location',
    chartName: 'DayOfWeek',
    title: 'Behavior Events By Day of Week',
    yTitle: 'Events',
    chart: 'column',
    height: 300,
  },
];

var cColors = [
  '#058DC7',
  '#50B432',
  '#ED561B',
  '#DDDF00',
  '#24CBE5',
  '#64E572',
  '#FF9655',
  '#FFF263',
  '#6AF9C4',
]; //{"#FCFFC5","#89D1F3"}

var filters = [];
var studentCache = [];

function filterData(d) {
  d = $.Enumerable.From(d)
    .Where(function (x) {
      //iteration caused by enumerable loop

      return x.school_year.toString() == '2022';
    })
    .ToArray();

  filters.forEach(function (f) {
    switch (f.f) {
      case 'chtMonth':
        d = $.Enumerable.From(d)
          .Where(function (x) {
            //Establish JSJoda variable with values from x.event_date.year
            //+1 month added as JSJoda returns a value minus 1 month from data.js and moment.js
            var data = JSJoda.LocalDateTime.of(
              x.event_date.year,
              x.event_date.month,
              x.event_date.day
            ).plusMonths(1);
            //Add ZoneId.System. See notes below for implementation problems with ZoneId
            var dataDates1 = JSJoda.LocalDate.from(data)
              .atStartOfDay()
              .atZone(JSJoda.ZoneId.SYSTEM);
            // Convert to JS Date/Time object to check month
            var jsDateMonth = JSJoda.convert(dataDates1).toDate();
            var options = {
              month: 'long',
            };
            var event_dates = new Date(jsDateMonth).toLocaleDateString(
              'en-US',
              options
            );
            //$.event_date ? $.event_date.month : event_dates.month()
            return (
              //Return name of months and
              (data ? dataDates1.month() : event_dates) == f.v
            );
          })
          .ToArray();

        break;
      case 'chtDayOfWeek':
        d = $.Enumerable.From(d)
          .Where(function (x) {
            //Establish JSJoda variable with values from x.event_date.year
            //+1 month added as JSJoda returns a value minus 1 month from data.js and moment.js
            var data = JSJoda.LocalDateTime.of(
              x.event_date.year,
              x.event_date.month,
              x.event_date.day
            ).plusMonths(1);
            //Add ZoneId.System. See notes below for implementation problems with ZoneId
            var dataDates2 = JSJoda.LocalDate.from(data)
              .atStartOfDay()
              .atZone(JSJoda.ZoneId.SYSTEM);
            // Convert to JS Date/Time object to check weekday
            var jsDateWeekDay = JSJoda.convert(dataDates2).toDate();
            var options = {
              weekday: 'long',
            };
            var event_dates = new Date(jsDateWeekDay).toLocaleDateString(
              'en-US',
              options
            );

            return (data ? dataDates2.dayOfWeek() : event_dates) == f.v;
          })
          .ToArray();

        break;
    }
  });

  return d;
}
//Pass data in. DUH!
function buildChart(t, c, l, y, d, ct, h) {
  d = filterData(d);

  var groupedData = [];
  switch (c) {
    case 'Month':
      groupedData = $.Enumerable.From(d)
        .OrderBy(function (c) {
          //JSJoda init variable
          /* JSJoda.LocalDateTime; */

          //Formatter returning error "'Pattern using (localized) text not implemented, use js-joda-locale plugin!'"
          //It will not use other formats; specifically to return the name of months and/or days.

          /* const formatter = JSJoda.DateTimeFormatter.ofPattern(
            'MM-dd-yyyy'
          ).withLocale(JSJodaLocale.Locale.US); */

          //Attempted to convert dates from enum iterations to JS Date/time object
          //JSJoda.LocalDateTime.parse() does take both a string, or a variable pointing to a string; but does not take a template literal

          /* Object.keys(c.event_date).forEach(function (key) {
            var dateToParse = JSJoda.LocalDate.parse(
              `"${c.event_date.year}-${c.event_date.month}-${c.event_date.day}"`
            );
            console.log(dateToParse);
          }); */

          //Joda.js functions do not parse objects with date and time like moment.js(_isAMomentObject)
          //Moment.js appears to add an extra month when comparing "_isAMomentObject" values to data.js in the console
          //Appears the functionality of moment.js needs to be manually coded for Joda.js to have similar functionality-
          //the functionality to return the values of the data.js object as a data/time object is not coded in the library?

          //Joda.js needs to loop through the object
          //Needs to assign year, month, day to individual variables, and assign the three to another variable

          var data = JSJoda.LocalDateTime.of(
            c.event_date.year,
            c.event_date.month,
            c.event_date.day
          ).plusMonths(1);

          //.atZone(JSJoda.ZoneId.SYSTEM) cannot be added to the above chain; but can be when
          //assigned to a new variable
          //Getting unsupported when using ZoneId.of('America/Newyork) or other regions.
          /*  var zdt = ZonedDateTime.now(ZoneId.of("Europe/Paris")); */
          //Above example does not work from docs
          //SYSTEM is advised not be used from Docs- https://unpkg.com/browse/js-joda@1.11.0/CheatSheet.md)
          //UTC returns -8hrs from 00:00, resulting in -1 day

          var dataDates = JSJoda.LocalDate.from(data)
            .atStartOfDay()
            .atZone(JSJoda.ZoneId.SYSTEM);

          //Convert to JS Date/Time object to match moment.js format in the browser
          //For now, this is the cleanest method of returning e.g "Thursday, December 30, 2021, 00:00:00 GMT-0800 (PST)"
          var jsDate = JSJoda.convert(dataDates).toDate();

          var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          };

          var event_dates = new Date(jsDate).toLocaleDateString(
            'en-US',
            options
          );

          //Possible option with less code:
          /* var dataDates = JSJoda.LocalDate.from(data).month();

          console.log(dataDates);

          return dataDates;
 */
          return event_dates;
        })
        .GroupBy(
          null, // (identity)
          null, // (identity)
          //UNABLE TO READ dataDates1; which passes ZoneId
          '{ school_year: $.school_year, label: (data ? $.event_date.month : event_dates.month()), events: $$.Count() }',
          "'' + $.school_year + '-' +(data ? $.event_date.month : event_dates.month())"
        )
        .ToArray();
      break;
    case 'DayOfWeek':
      groupedData = $.Enumerable.From(d)
        .OrderBy(function (c) {
          var data = JSJoda.LocalDateTime.of(
            c.event_date.year,
            c.event_date.month,
            c.event_date.day
          ).plusMonths(1);

          var dataDates = JSJoda.LocalDate.from(data).dayOfWeek().value();

          return dataDates;
        })
        .GroupBy(
          null, // (identity)
          null, // (identity)
          '{ school_year: $.school_year, label: (data ? $.event_date.day : event_dates.dayOfWeek()), events: $$.Count() }',
          "'' + $.school_year + '-' +(data ? $.event_date.day : event_dates.dayOfWeek())"
        )
        .ToArray();
      break;
  }

  var __ion_local_Data;
  var __ion_local_Categories = new Array();
  var __ion_local_Years = new Array();
  var xAxis = {};
  var yAxis = {};
  var height = h;

  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  __ion_local_Data = groupedData;

  ////First, put all the categories into an Array.
  if (c == 'Month' || c == 'DayOfWeek') {
    __ion_local_Categories = $.Enumerable.From(__ion_local_Data)
      .Select(function (x) {
        return x.label;
      })
      .Distinct()
      .TojQuery();
  } else {
    __ion_local_Categories = $.Enumerable.From(__ion_local_Data)
      .Select(function (x) {
        return x.label;
      })
      .Distinct()
      .OrderBy(function (x) {
        return x.label;
      })
      .TojQuery();
    __ion_local_Categories = $.Enumerable.From(__ion_local_Categories)
      .OrderBy(function (x) {
        return x;
      })
      .TojQuery();
  }

  __ion_local_Years = [2022];

  var i = 0;
  var __ion_local_Series = new Array();

  $(
    $.Enumerable.From(__ion_local_Years)
      .OrderBy(function (x) {
        return x;
      })
      .TojQuery()
  ).each(function () {
    var tmpLY = parseInt(this.toString());
    var tmpSeries = { name: tmpLY.toString(), color: cColors[i], data: [] };

    $(__ion_local_Categories).each(function () {
      var tmpCat = this.toString();

      var tmpValue = $.Enumerable.From(__ion_local_Data)
        .Where(function (x) {
          return x.school_year == tmpLY && x.label == tmpCat;
        })
        .TojQuery()[0];
      if (typeof tmpValue !== 'undefined') {
        tmpSeries.data.push(tmpValue.events);
      } else {
        tmpSeries.data.push(0);
      }
    });
    i++;
    __ion_local_Series.push(tmpSeries);

    switch (ct) {
      case 'column':
        zt = 'x';
        xAxis = {
          categories: __ion_local_Categories,
          crosshair: true,
          labels: {
            rotation: 90,
            style: {
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif',
            },
            formatter: function () {
              //if (c == "Month")
              //this.value = monthNames[this.value - 1];
              //if (c == "DayOfWeek")
              //this.value = dayNames[this.value - 1];

              var words = this.value.toString().split(/[\s]+/);
              var numWordsPerLine = 2;
              var str = '';

              for (var word in words) {
                if (parseInt(word) > 0 && parseInt(word) % numWordsPerLine == 0)
                  str += '<br>';

                if (typeof words[word] == 'string') str += ' ' + words[word];
              }
              return str;
            },
            events: {
              click: function (e) {
                alert('col');
              },
            },
          },
        };
        yAxis = {
          min: 0,
          title: {
            text: y,
          },
        };
        break;
      case 'bar':
        zt = 'x';

        yAxis = {
          min: 0,
          title: {
            text: y,
          },
        };
        xAxis = {
          categories: __ion_local_Categories,
          crosshair: true,
          labels: {
            style: {
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif',
            },
            formatter: function () {
              if (c == 'Month') this.value = monthNames[this.value - 1];
              if (c == 'DayOfWeek') this.value = dayNames[this.value - 1];

              var words = this.value.toString().split(/[\s]+/);
              var numWordsPerLine = 2;
              var str = '';

              for (var word in words) {
                if (parseInt(word) > 0 && parseInt(word) % numWordsPerLine == 0)
                  str += '<br>';

                if (typeof words[word] == 'string') str += ' ' + words[word];
              }
              return str;
            },
            events: {
              click: function (e) {
                alert('hi');
              },
            },
          },
        };

        break;
    }

    $('#cht' + c).highcharts({
      chart: {
        type: ct,
        zoomType: zt, //,
        //height: height
      },
      title: {
        text: l,
      },
      credits: {
        enabled: false,
      },
      xAxis: xAxis,
      yAxis: yAxis,
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          point: {
            events: {
              click: function (e) {},
            },
          },
        },
      },
      series: __ion_local_Series,
    });
  });
}

function doBuildCharts() {
  charts.forEach(function (c) {
    buildChart(c.type, c.chartName, c.title, c.yTitle, data, c.chart);
  });
}

//Trigger the build
$(document).ready(function () {
  doBuildCharts();
});
