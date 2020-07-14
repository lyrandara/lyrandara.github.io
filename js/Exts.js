let developMode = true;

/* Exts functions */
//let ArrayExt =
// (function(){
//
// })();

// logger //
let Log = {
  trace(msg) {
    if (developMode)
      console.log(msg);
  },
  error(msg) {
    if (developMode)
      console.error(msg);
  }
};

Array.prototype.removeItem = function (i) {
  if (i != -1) {
    this.splice(i, 1);
  }
}

Array.prototype.removeObj = function (obj) {
  var i = this.indexOf(obj);
  if (i != -1) {
    this.splice(i, 1);
  }
}

Array.ConcatUnique = function(a, b) {
  return a.concat(b.filter((item) => a.indexOf(item) < 0));
}

function CopyObjects(obj1, obj2) {
  for (let attrname in obj2) {
    obj1[attrname] = obj2[attrname];
  }
}

function VueModelInitial(vueModel) {
  if (typeof vueModel == "undefined")
      return;

  if (typeof vueModel.data == "undefined")
    vueModel.data = {};

  if (typeof vueModel.methods == "undefined")
    vueModel.methods = {};

  if (typeof vueModel.watch == "undefined")
    vueModel.watch = {};

  if (typeof vueModel.userInitsCallbacks == "undefined")
    vueModel.userInitsCallbacks = {};

  if (typeof vueModel.AddInitCallback == "undefined") {
    vueModel.AddInitCallback = function (fn) {
      vueModel.userInitsCallbacks.push(fn);
    }
  }
}

let VueExts = {
  RunInitCallBacks(vueModel) {
    if(typeof vueModel == "undefined")
      return;

    setTimeout(()=> {
      let callBacks = vueModel.userInitsCallbacks;

      for (let i in callBacks)
      {
        if(typeof callBacks[i] == "function") {
          callBacks[i](vueModel.data);
        }
      }
    }, 100);
  }
};

let CalcElements = {
  CalcStage1(element) {
  if(element.length == 0)
      return 0;
    return  parseInt(element.css('margin-top')) + parseInt(element.css('margin-bottom') ) +
        parseInt(element.css('border-top-width') ) + parseInt(element.css('border-bottom-width') );
  },
  CalcPaddingTopBottom(element) {
    if(element.length == 0)
      return 0;
    return  parseInt(element.css('padding-top')) + parseInt(element.css('padding-bottom') );
  },
  CalcHeightOfElement(element)
  {
    if(element.length == 0)
      return 0;

    return CalcElements.CalcStage1(element) + parseInt(element.css('height'));
  }
}

let DateTimeParser = (function() {
  const months = ["All", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return {
    FromString(dateTimeString) {
      if (typeof dateTimeString == 'undefined')
        return null;

      let timeArr = dateTimeString.split(' ');

      let arr = timeArr[0].split('.');

      if (arr.length < 3) {
        arr = timeArr[0].split('/');
        if (arr.length < 3) {
          return null;
        }
      }

      let result = {
        day: parseInt(arr[0].trim()),
        month: parseInt(arr[1].trim()),
        year: parseInt(arr[2].trim())
      };

      if(timeArr.length >= 2)
      {
        result.time = {};

        let times = timeArr[1].split(':');

        if(times.length >=1)
          result.time.hours = parseInt(times[0]);

        if(times.length >=2)
          result.time.minutes = parseInt(times[1]);

        if(times.length >=3)
          result.time.seconds = parseInt(times[2]);
      }

      return result;
    },
    ToString(dateTimeObj, delim) {
      delim = delim || '.';

      if (typeof dateTimeObj == 'undefined' || dateTimeObj == null)
        return "";

      let result = ('0' + dateTimeObj.day).slice(-2) + delim
      + ('0' + (dateTimeObj.month)).slice(-2) + delim
      + dateTimeObj.year;

      if(typeof  dateTimeObj.time != "undefined") {
        if(typeof dateTimeObj.time.hours != "undefined")
          result += " " + ('0' + dateTimeObj.time.hours).slice(-2)

        if(typeof dateTimeObj.time.minutes != "undefined")
          result += ":" + ('0' + dateTimeObj.time.minutes).slice(-2)

        if(typeof dateTimeObj.time.seconds != "undefined")
          result += ":" + ('0' + dateTimeObj.time.seconds).slice(-2)
      }

      return result;
    },
    ToStringByFormat(dateTimeObj, format) {
      if (typeof dateTimeObj == 'undefined' || dateTimeObj == null)
        return "";

      let hours = 0, minutes = 0, seconds = 0;

      if(typeof dateTimeObj.time != "undefined") {
        if (typeof dateTimeObj.time.hours != "undefined")
          hours = dateTimeObj.time.hours;
        if (typeof dateTimeObj.time.minutes != "undefined")
          minutes = dateTimeObj.time.minutes;
        if (typeof dateTimeObj.time.seconds != "undefined")
          seconds = dateTimeObj.time.seconds;
      }

      let dt = moment(new Date(dateTimeObj.year, dateTimeObj.month, dateTimeObj.day, hours, minutes, seconds));
      return dt.format(format);
    },
    GetMonths() {
      return months;
    },
    GetMonthIndex(monthName) {
      return months.indexOf(monthName);
    },
    GetCurrentDateByString(delim){
      delim = delim || '.';
      let dt = new Date();

      return ('0' + dt.getDate()).slice(-2) + delim
          + ('0' + (dt.getMonth()+1)).slice(-2) + delim
          + dt.getFullYear();
    },
    Equal(date1, date2) {
      return date1.year == date2.year &&
          date1.month == date2.month &&
          date1.day == date2.day
    },
    InRangeDate(dateFrom, dateTo, current) {

      if (typeof dateFrom == 'undefined')
        return false;

      if (typeof dateTo == 'undefined')
        return false;

      if (typeof current == 'undefined')
        return false;

      let from = new Date(dateFrom.year, parseInt(dateFrom.month)-1, dateFrom.day);
      let to   = new Date(dateTo.year, parseInt(dateTo.month)-1, dateTo.day);
      let check = new Date(current.year, parseInt(current.month)-1, current.day);

      return check >= from && check <= to;
    },
    daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
    }
  };
})();

function IsObject(obj, name) {
  return typeof obj == "object" && f.constructor.name == name;
}

function CheckObjFields(obj, fields) {
  let r = true;
  fields.forEach(f => {
    if(typeof obj[f] == "undefined") {
      r = false;
      return;
    }
  });
  return r;
}

function GenIds() {

  let alphaArr = "0123456789ABCDEF";

  let fn = () => alphaArr[Math.ceil(Math.random()*15)];

  return [1, 2, 3, 4].map( x => fn().toString() + fn().toString()).join(':')
}

function loadScript(url, callback){
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState){// IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
          script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {// Others
    script.onload = function(){
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

jQuery(window).on('load', function() {

  const loginPageUrl = "login.html";

  loadScript("js/jquery.cookie.js", function(){

    jQuery('.log-out').bind('click', function () {

      $.removeCookie("login");

      return true;

    });

    if($.cookie("login") != 1) {
      document.location.href = loginPageUrl;
    }

  });

});

