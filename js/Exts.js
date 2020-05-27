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

function CopyObjects(obj1, obj2) {
  for (let attrname in obj2) {
    obj1[attrname] = obj2[attrname];
  }
}
