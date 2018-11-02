var buttons = document.getElementById("number-buttons");
var options = document.getElementById("other-buttons");
var scr = document.getElementById("screen");
var menu_bar = document.getElementById("menu_bar");
var field = document.getElementById("field");
var text, result = 0;

function addNumber(e) {
    if (e.target.id != 'number-buttons') {
        var num = e.target.id;
        var doc = document.getElementById(num);
        text = doc.textContent;
        scr.style.direction = "ltr";
        scr.textContent += text;
    }
}


buttons.addEventListener("click", addNumber);


options.addEventListener("click", function (e) {
    if (e.target.id != 'other-buttons') {
        var targetClass = e.target.className;
        switch (targetClass) {
            case ("icon-plus"):
                scr.textContent += '+';
                break;
            case "icon-minus":
                scr.textContent += "-";
                break;
            case "icon-divide":
                scr.textContent += "/";
                break;
            case "icon-cancel":
                scr.textContent += "*";
                break;
            case "icon-eq":
                result = Math.round(eval(scr.textContent) * 100) / 100;
                scr.textContent += "=";
                scr.textContent += result;
                result = 0;
                break;
            case "icon-dot":
                scr.textContent += ".";
                break;
            case "but_clear":
                scr.textContent = "";
                break;
            case "but_show_scroll":
                var scroll = document.getElementById("col_1").firstElementChild;
                var screen = document.getElementById("screen");
                if (scroll.style.overflowX === "auto") {
                    scroll.style.overflowX = "hidden";
                    screen.style.height = "55px";
                } else {
                    scroll.style.overflowX = "auto";
                    screen.style.height = "45px";
                }
                break;
        }
    }
});

var draggedEl,
    grabPointX,
    grabPointY;

function dragStart(ev) {

    var boundingClientRect;

    if (ev.target.id !== 'menu_bar')
        return;

    draggedEl = this;

    boundingClientRect = draggedEl.getBoundingClientRect();


    grabPointY = boundingClientRect.top - ev.clientY;
    grabPointX = boundingClientRect.left - ev.clientX;

}

function drag(ev) {
    if (!draggedEl)
        return;

    var posX = ev.clientX + grabPointX,
        posY = ev.clientY + grabPointY - 100;

    draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
}

function dragEnd() {
    draggedEl = null;
    grabPointX = null;
    grabPointY = null;
}

function minimise(ev) {

    if (ev.target.id !== "minimise")
        return;

    document.getElementById("calculator").style.display = "none";
}

function maximise(ev) {

    if (ev.target.id !== "maximise")
        return;

    document.getElementById("calculator").style.display = "block";
}


document.addEventListener("mousemove", drag, false);
document.addEventListener("mouseup", dragEnd, false);
document.getElementById("wrapper_calculator").addEventListener("mousedown", dragStart, false);
document.getElementById("minimise").addEventListener("click", minimise, false);
document.getElementById("maximise").addEventListener("click", maximise, false);

var z = 0;
var y = 0;
var move_left = 92.5;
var move_top = 35;

for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {     
        
        if (i % 2 === 0 && j % 2 === 0 || i % 2 !== 0 && j % 2 !== 0) {
            field.appendChild(document.createElement("div")).className = "white";
        } else {
            let black_box = field.appendChild(document.createElement("div"));
            black_box.className = "black";
            let id_box = "box_" + y;
            black_box.setAttribute("id", id_box);
            y++;
            
            if (i < 3) {
                var pawn = field.appendChild(document.createElement("div"));
                let id = "id_" + z;
                let left = move_left + "px";
                let bottom = move_top + "px";
                pawn.setAttribute('id', id);
                
                if(z === 4){
                    move_left = 35;
                    left = move_left + "px";
                    move_top = 92.5;
                    bottom = move_top + "px";
                }
                
                if (z === 8){
                    move_left = 92.5;
                    left = move_left + "px";
                    move_top = 150;
                    bottom = move_top + "px";
                }
                    
                
                document.getElementById(id).style.left = left;
                document.getElementById(id).style.top = bottom;
                document.getElementById(id).style.backgroundColor = "green";
                
                pawn.className = "pawn";
                
                move_left += 115;
                z++;
            }
            
            if (i > 4) {
                var pawn = field.appendChild(document.createElement("div"));
                let id = "id_" + z;
                let left = move_left + "px";
                let bottom = move_top + "px";
                pawn.setAttribute('id', id);
                
                if(z === 12){
                    move_left = 35;
                    left = move_left + "px";
                    move_top = 322.5;
                    bottom = move_top + "px";
                }
                
                if (z === 16){
                    move_left = 92.5;
                    left = move_left + "px";
                    move_top = 380;
                    bottom = move_top + "px";
                } 
                if (z === 20) {
                    move_left = 35;
                    left = move_left + "px";
                    move_top = 437.5;
                    bottom = move_top + "px";
                }
                    
                
                document.getElementById(id).style.left = left;
                document.getElementById(id).style.top = bottom;
                document.getElementById(id).style.backgroundColor = "red";
                
                pawn.className = "pawn";
                
                
                move_left += 115;
                z++;
            }

        }
    }

}
