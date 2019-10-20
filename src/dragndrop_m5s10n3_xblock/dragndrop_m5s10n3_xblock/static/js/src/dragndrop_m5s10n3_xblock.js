/* Javascript for Dragndropm5s10n3XBlock. */
var isiPad = (navigator.userAgent.match(/iPad/i) != null);
var squesC = [0, 1, 2, 3, 4, 5];
var dragLC = [150, 150, 150, 150, 150];
var dragTC = [75, 75, 75, 75, 75];
var count = 0;
function Dragndropm5s10n3XBlock(runtime, element) {
    $(document).ready(function () {
        $(".drgc").draggable({ revert: true, zIndex: 9999999, containment: ".m5s3p1" });
        $(".droc").droppable({ drop: dropfunB });

        dragNoneC();
        funSufC();
    });

    shuffle(squesC);
    //alert(squesC);

}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
function dragNoneC() {
    $("#dragsc0").hide();
    $("#dragsc1").hide();
    $("#dragsc2").hide();
    $("#dragsc3").hide();
    $("#dragsc4").hide();
    $("#dragsc5").hide();
}

function dropfunB(event, ui) {
    var drags = ui.draggable.attr('id');
    var drops = $(this).attr('id');

    if (drags.substr(drags.length - 1) == drops.substr(drops.length - 1)) {
        ui.draggable.draggable('disable');
        $(this).droppable('disable');
        ui.draggable.draggable('option', 'revert', false);
        ui.draggable.position({ of: $(this), my: "center center", at: "center center" });

        $('#' + drops).attr('data-idsc', $('#' + drags).attr('data-idsc'));

        if (drops == 'dropsc0' || drops == 'dropsc3') {
            $("#" + drops).addClass('yyr');
        }
        if (drags == 'dragsc0' || drags == 'dragsc3') {
            $("#" + drags).addClass('yyr');
        }

        if (drops == 'dropsc1' || drops == 'dropsc2') {
            $("#" + drops).addClass('Grn');
        }
        if (drops == 'dropsc4' || drops == 'dropsc5') {
            $("#" + drops).addClass('gGr');
        }
        $("#" + drags).removeClass('drc');
        count++;
        $("#dragsc" + squesC[count]).show();
    }

    var cont = 0;
    $.each($('.droc'), function (i, v) {
        if ($(v).attr('data-idsc') == -1) {
            cont++;
        }
    });
    if (cont == 0) {
        //alert('A');
        $('#dnd2').show();
        $('.bgGr').css('background-color', '#2cb69d');
        $('#dnd1').hide();
    }

}
function funSufC() {
    $("#dragsc0").css({ 'left': "" + dragLC[squesC[0]] + "px", 'top': "" + dragTC[squesC[0]] + "px" });
    $("#dragsc1").css({ 'left': "" + dragLC[squesC[1]] + "px", 'top': "" + dragTC[squesC[1]] + "px" });
    $("#dragsc2").css({ 'left': "" + dragLC[squesC[2]] + "px", 'top': "" + dragTC[squesC[2]] + "px" });
    $("#dragsc3").css({ 'left': "" + dragLC[squesC[3]] + "px", 'top': "" + dragTC[squesC[3]] + "px" });
    $("#dragsc4").css({ 'left': "" + dragLC[squesC[4]] + "px", 'top': "" + dragTC[squesC[4]] + "px" });
    $("#dragsc5").css({ 'left': "" + dragLC[squesC[5]] + "px", 'top': "" + dragTC[squesC[5]] + "px" });
    $("#dragsc" + squesC[0]).show();
}