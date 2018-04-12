var palette = document.getElementById("palette");
var ctxPalette = palette.getContext("2d");
var paletteOffset = $("#palette").offset();
var offsetPaletteX = paletteOffset.left;
var offsetPaletteY = paletteOffset.top;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var pixelDim = 10;

var paintColor = "white";
//
var pixel = (function () {

    // constructor
    function pixel(id, x, y, width, height, fill, stroke, strokewidth) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = width;
        this.height = height;
        this.fill = fill || "gray";
        this.stroke = stroke || "skyblue";
        this.strokewidth = strokewidth || 1;
        this.redraw(this.x, this.y);
        return (this);
    }
    pixel.prototype.redraw = function (x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.draw(this.stroke);
        return (this);
    }
    //
    pixel.prototype.highlight = function (x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.draw("orange");
        return (this);
    }
    //
    pixel.prototype.draw = function (stroke) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = this.strokewidth;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
    //
    pixel.prototype.isPointInside = function (x, y) {
        return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
    }
    pixel.prototype.setFill =function (fill) {
        this.fill = fill;
        this.redraw(this.x, this.y);
    }


    return pixel;
})();

var paintPixel = (function () {

    // constructor
    function paintPixel(id, x, y, width, height, fill, stroke, strokewidth) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = width;
        this.height = height;
        this.fill = fill || "gray";
        this.stroke = stroke || "skyblue";
        this.strokewidth = strokewidth || 1;
        this.redraw(this.x, this.y);
        return (this);
    }
    paintPixel.prototype.redraw = function (x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.draw(this.stroke);
        return (this);
    }
    //
    paintPixel.prototype.highlight = function (x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.draw("orange");
        return (this);
    }
    //
    paintPixel.prototype.draw = function (stroke) {
        ctxPalette.save();
        ctxPalette.beginPath();
        ctxPalette.fillStyle = this.fill;
        ctxPalette.strokeStyle = stroke;
        ctxPalette.lineWidth = this.strokewidth;
        ctxPalette.rect(this.x, this.y, this.width, this.height);
        ctxPalette.stroke();
        ctxPalette.fill();
        ctxPalette.restore();
    }

    //
    paintPixel.prototype.isPointInside = function (x, y) {
        return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
    }


    return paintPixel;
})();

//
function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousedown stuff here
    var clicked = "";
    for (var i = 0; i < pixels.length; i++) {
        if (pixels[i].isPointInside(mouseX, mouseY)) {
            pixels[i].setFill(paintColor);
        }
    }
}
//
function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < pixels.length; i++) {
        if (pixels[i].isPointInside(mouseX, mouseY)) {
            pixels[i].highlight();
        } else {
            pixels[i].redraw();
        }
    }
}

function handleColorMove(e) {
    mouseX = parseInt(e.clientX - offsetPaletteX);
    mouseY = parseInt(e.clientY - offsetPaletteY);

    ctxPalette.clearRect(0, 0, palette.width, palette.height);
    for (var j = 0; j < paints.length; j++) {
        if (paints[j].isPointInside(mouseX, mouseY)) {
            paints[j].highlight();
        } else {
            paints[j].redraw();
        }
    }
}
function handleColorSelect(e) {
    mouseX = parseInt(e.clientX - offsetPaletteX);
    mouseY = parseInt(e.clientY - offsetPaletteY);
    // Put your mousedown stuff here
    for (var i = 0; i < paints.length; i++) {
        if (paints[i].isPointInside(mouseX, mouseY)) {
            paintColor = paints[i].id;
            
        }
    }
}
//
//
var pixels = [];
//
for (var i=0; i<100; i++) {
    for(var j=0; j<100; j++) {
        pixels.push(new pixel("("+i+", "+j+")", i*pixelDim,j*pixelDim,pixelDim,pixelDim));
    }
}

var paints = [];
paints.push(new paintPixel("white", 0, 0, pixelDim+10,pixelDim+10, "white","black"));
paints.push(new paintPixel("black", 20, 0, pixelDim+10,pixelDim+10, "black","black"));
paints.push(new paintPixel("red", 40, 0, pixelDim+10,pixelDim+10, "red","black"));
paints.push(new paintPixel("blue", 60, 0, pixelDim+10,pixelDim+10, "blue","black"));
paints.push(new paintPixel("green", 80, 0, pixelDim+10,pixelDim+10, "green","black"));


//
$("#canvas").click(handleMouseDown);
$("#canvas").mousemove(handleMouseMove);
$("#palette").click(handleColorSelect);
$("#palette").mousemove(handleColorMove);
