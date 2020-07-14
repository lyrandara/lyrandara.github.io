function City() {
    let args = Array.from(arguments);

    //this.selected = false;
    this.name = args[0];
    this.location = args[1];
    this.zoom = typeof args[1][2] == "undefined" ? 7 : args[1][2];
}

