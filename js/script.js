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

// var count_pawns = 0;
// var count_boxes = 0;
// var move_left = 92.5;
// var move_top = 35;
// var to_move = new Array(8);
// for (i = 0; i < 8; i++) {
//     to_move[i] = new Array(8)
//     for (j = 0; j < 8; j++) {
//         to_move[i][j] = null;
//     }
// }

// for (let i = 0; i < 8; i++) {
//     for (let j = 0; j < 8; j++) {

//         if (i % 2 === 0 && j % 2 === 0 || i % 2 !== 0 && j % 2 !== 0) {
//             field.appendChild(document.createElement("div")).className = "white";
//         } else {
//             let black_box = field.appendChild(document.createElement("div"));
//             black_box.className = "black";
//             let id_box = "box_" + count_boxes;
//             black_box.setAttribute("id", id_box);
//             to_move[i][j] = id_box;

//             if (count_boxes < 12) {
//                 let green_pawn = black_box.appendChild(document.createElement("div"));
//                 let id = "pawn_" + count_pawns;
//                 green_pawn.className = "pawn";
//                 green_pawn.setAttribute('id', id)
//                 document.getElementById(id).style.backgroundColor = "green";
//                 count_pawns++;
//             } else if (count_boxes > 19) {
//                 let red_pawn = black_box.appendChild(document.createElement("div"));
//                 let id = "pawn_" + count_pawns;
//                 red_pawn.className = "pawn";
//                 red_pawn.setAttribute('id', id)
//                 document.getElementById(id).style.backgroundColor = "red";
//                 count_pawns++;
//             }
//             count_boxes++;
//         }
//     }
// }

// function movePawn() {
//     document.addEventListener("click", getPawn, false);
// }

// const getPawn = function (event) {
//     var target = event.target.id;

//     if (document.getElementById(target).className === "pawn") {

//         document.addEventListener("click", function (e) {

//             let tar = e.target.id;

//             if (document.getElementById(tar).childElementCount === 0 && document.getElementById(tar).className === "black") {

//                 for (let i = 0; i < 8; i++) {
//                     for (let j = 0; j < 8; j++) {
//                         if (document.getElementById(target).style.backgroundColor === "green") {
//                             if (document.getElementById(target).parentNode.id === to_move[i][j]) {
//                                 if (tar === to_move[i + 2][j + 2] && parseInt(document.getElementById(to_move[i + 1][j + 1]).childElementCount) || tar === to_move[i + 2][j - 2] && parseInt(document.getElementById(to_move[i + 1][j - 1]).childElementCount)) {
//                                     let color = document.getElementById(target).style.backgroundColor;
//                                     document.getElementById(target).remove();
//                                     if (tar === to_move[i + 2][j + 2]) {
//                                         document.getElementById(document.getElementById(to_move[i + 1][j + 1]).firstChild.id).remove();
//                                     } else {
//                                         document.getElementById(document.getElementById(to_move[i + 1][j - 1]).firstChild.id).remove();
//                                     }
//                                     let pw = document.getElementById(tar).appendChild(document.createElement('div'));
//                                     pw.className = "pawn";
//                                     pw.setAttribute("id", target);
//                                     document.getElementById(target).style.backgroundColor = color;
//                                     target = "";
//                                     tar = "";
//                                 } else if (tar === to_move[i + 1][j + 1] || tar === to_move[i + 1][j - 1]) {
//                                     let color = document.getElementById(target).style.backgroundColor;
//                                     document.getElementById(target).remove();
//                                     let pw = document.getElementById(tar).appendChild(document.createElement('div'));
//                                     pw.className = "pawn";
//                                     pw.setAttribute("id", target);
//                                     document.getElementById(target).style.backgroundColor = color;
//                                     target = "";
//                                     tar = "";
//                                 }
//                             }
//                         } else {
//                             if (document.getElementById(target).parentNode.id === to_move[i][j]) {
//                                 if(tar === to_move[i - 2][j + 2] && parseInt(document.getElementById(to_move[i - 1][j + 1]).childElementCount) || tar === to_move[i - 2][j - 2] && parseInt(document.getElementById(to_move[i - 1][j - 1]).childElementCount)) {
//                                     let color = document.getElementById(target).style.backgroundColor;
//                                     document.getElementById(target).remove();
//                                     if (tar === to_move[i - 2][j + 2]) {
//                                         document.getElementById(document.getElementById(to_move[i - 1][j + 1]).firstChild.id).remove();
//                                     } else {
//                                         document.getElementById(document.getElementById(to_move[i - 1][j - 1]).firstChild.id).remove();
//                                     }
//                                     let pw = document.getElementById(tar).appendChild(document.createElement('div'));
//                                     pw.className = "pawn";
//                                     pw.setAttribute("id", target);
//                                     document.getElementById(target).style.backgroundColor = color;
//                                     target = "";
//                                     tar = "";
//                                 }
//                                 else if (tar === to_move[i - 1][j + 1] || tar === to_move[i - 1][j - 1]) {
//                                     let color = document.getElementById(target).style.backgroundColor;
//                                     document.getElementById(target).remove();
//                                     let pw = document.getElementById(tar).appendChild(document.createElement('div'));
//                                     pw.className = "pawn";
//                                     pw.setAttribute("id", target);
//                                     document.getElementById(target).style.backgroundColor = color;
//                                     target = "";
//                                     tar = "";
//                                 }
//                             }
//                         }
//                     }
//                 }

//             }

//             /*let color = document.getElementById(target).style.backgroundColor;
//             document.getElementById(target).remove();
//             let pw = document.getElementById(tar).appendChild(document.createElement('div'));
//             pw.className = "pawn";
//             pw.setAttribute("id", target);
//             document.getElementById(target).style.backgroundColor = color;
//             target = "";
//             tar = "";*/
//         }, false);
//     }
// }

// movePawn();
