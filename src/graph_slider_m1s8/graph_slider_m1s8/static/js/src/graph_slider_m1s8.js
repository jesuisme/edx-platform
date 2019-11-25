/* Javascript for Graphsliderm1s8XBlock. */
var JasonData={
    "item_id": null,
    "number_of_test_items": 1,
    "product_id": 0,
    "subproduct_id": 0,
    "categories": [{
        "HR": 0,
        "MIN": 0,
    }],
    "test_name": "Dell Med\\ Module 1\\ Section 1 Item",
    "test_id": "Create a unique identifier for each test instance",
    "item_number": 1,
    "student_id": "student email",
    "date": new Date().toISOString().slice(0,10),
    "item_type": "MC",
    "item_stem": "Example test question",
    "options": [{
            "letter": "A",
            "text": "Example Answer Value A",
            "selected": false,
            "correct": false
        }, {
            "letter": "B",
            "text": " Example Answer Value B",
            "selected": false,
            "correct": false
        },{
            "letter": "C",
            "text": " Example Answer Value C",
            "selected": true,
            "correct": true
        },{
            "letter": "D",
            "text": " Example Answer Value D",
            "selected": false,
            "correct": false
        }
    ],
    "option_score": 1

}

function checkAnswer(obj, f) {
    var TempJson = JasonData;
    TempJson.item_id = "m1s8";
    TempJson.test_name = "Dell Med\\ Module 1\\ Section 8 Item";
    TempJson.test_id = "m1s8t001";
    //TempJson.student_id = app.Decrypt(app.LoginEmail);
    TempJson.item_stem = $(obj).closest('.item').find('.ques').text();
    var options = $(obj).closest('.row-eq-height').find('.ans');
    TempJson.options = new Array();
    $.each(options, function (i, v) {
        TempJson.options.push({
            "letter": i,
            "text": $(v).text().trim(),
            "selected": $(v).text().trim() == $(obj).text().trim() ? true : false,
            "correct": $(v).attr('correct') == 1 ? true : false,
        });
    })
    $(obj).parents(".row-eq-height").find(".ans").removeClass("selectedAns");
    $(obj).parents(".white").removeClass("correct incorrect");
    if (f === 1) {
        $(obj).addClass('selectedAns').parents('.white').addClass('correct');
    } else if (f === 0) {
        $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
    } else {
        $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
        //alert(f);
        $(".5401, .2497").addClass("hide");
        $("." + f).removeClass("hide");
    }
    //app.SaveJson(JSON.stringify(TempJson));
}

var ans = [0, 0, 0];
function trackAns(i, val) {
    ans[i - 1] = val;
    //alert(ans);
}


function Graphsliderm1s8XBlock(runtime, element) {

   


var xDiagnosis = [
    10915,
    11996,
    14340,
    7787,
    8621,
    15583,
    3958,
    12030,
    5371,
    7930,
    4221,
    1504,
    3033,
    22372,
    8839
];
var yDiagnosis = [
    0.55,
    1.65,
    1.12,
    0.89,
    0.67,
    0.99,
    1.71,
    2.88,
    0.62,
    0.79,
    0.47,
    2.67,
    1.91,
    1.65,
    0.88
];

var trace = {
    y: yDiagnosis,
    x: xDiagnosis,
    text: [
        'Diagnosis:Acute appendicitis<br>X= $10915, Y=0.55<br>Opportunity Index (size): $474270',
        'Diagnosis:Acute kidney failure<br>X= $11996, Y=1.65<br>Opportunity Index (size): $2256383',
        'Diagnosis:Acute pancreatitis<br>X= $14340, Y=1.12<br>Opportunity Index (size): $1493637',
        'Diagnosis:Alcohol withdrawal<br>X= $7787, Y=0.89<br>Opportunity Index (size): $609903',
        'Diagnosis:Cellulitis and abscess of leg<br>X= $8621, Y=0.67<br>Opportunity Index (size): $675813',
        'Diagnosis:Cerebral artery occlusion<br>X= $15583, Y=0.99<br>Opportunity Index (size): $2206151',
        'Diagnosis:Condition of mother<br>X= $3958, Y=1.71<br>Opportunity Index (size): $615878',
        'Diagnosis:Diabetes with ketoacidosis<br>X= $12030, Y=2.88<br>Opportunity Index (size): $3395270',
        'Diagnosis:Other chest pain<br>X= $5371, Y=0.62<br>Opportunity Index (size): $352979',
        'Diagnosis:Pneumonia<br>X= $7930, Y=0.79<br>Opportunity Index (size): $645245',
        'Diagnosis:Post term pregnancy<br>X= $4221, Y=0.47<br>Opportunity Index (size): $359115',
        'Diagnosis:Single liveborn<br>X= $1504, Y=2.67<br>Opportunity Index (size): $3192578',
        'Diagnosis:Single liveborn, c-section<br>X= $3033, Y=1.91<br>Opportunity Index (size): $1141213',
        'Diagnosis:Unspecified septicemia<br>X= $22372, Y=1.65<br>Opportunity Index (size): $12624520',
        'Diagnosis:Urinary tract infection<br>X= $8839, Y=0.88<br>Opportunity Index (size): $614486'
    ],
    mode: 'markers',
    hoverinfo: "text",
    marker: {
        color: [
            'rgb(166,206,227)',
            'rgb(72,138,190)',
            'rgb(133,177,159)',
            'rgb(137,201,105)',
            'rgb(93,162,62)',
            'rgb(239,156,146)',
            'rgb(237,76,64)',
            'rgb(244,124,68)',
            'rgb(255,173,86)',
            'rgb(254,131,33)',
            'rgb(216,171,188)',
            'rgb(141,102,175)',
            'rgb(176,141,158)',
            'rgb(241,219,127)',
            'rgb(177,89,40)'
        ],
        size: [
            10.8895533169,
            23.959645329,
            18.3656339493,
            11.8842914676,
            12.3676781914,
            23.5912417194,
            11.9281123699,
            32.3122906895,
            10,
            12.1434911883,
            10.0450016832,
            30.8257390005,
            15.7809414482,
            100,
            11.9179033831
        ],
        opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        sizemode: ['area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area'],
    },
    type: 'scatter',
    xaxis: 'x',
    yaxis: 'y'
};

var data = [trace];

layout = {
    hovermode: 'closest',
    plot_bgcolor: "#EEEEEE",
    paper_bgcolor: "#EEEEEE",
    margin: {
        r: 10,
        t: 0,
        b: 60,
        l: 60
    },
    showlegend: false,
    //title: 'Diagnosis Opportunity Index Scatterplot',
    xaxis: {
        domain: [0, 1],
        title: 'Mean Cost of Diagnosis',
        fixedrange: true
    },
    yaxis: {
        domain: [0, 1],
        title: 'Coefficient of Variation (SD/Mean)',
        fixedrange: true
    }
};



//for physician
var xPhysician = [
    14228,
    19245,
    23870,
    18938,
    22683,
    17220,
    14598,
    19572,
    15147
];
var yPhysician = [
    1,
    0.75,
    1.76,
    1.08,
    0.88,
    0.82,
    0.61,
    0.78,
    1.29
];

var trace1 = {
    y: yPhysician,
    x: xPhysician,
    text: [
        'Physician ID:2497<br>X= $14228, Y=1<br>Opportunity Index (size): $256109',
        'Physician ID:3228<br>X= $19245, Y=0.75<br>Opportunity Index (size): $245379',
        'Physician ID:3320<br>X= $23870, Y=1.76<br>Opportunity Index (size): $714199',
        'Physician ID:3745<br>X= $18938, Y=1.08<br>Opportunity Index (size): $409065',
        'Physician ID:4162<br>X= $22683, Y=0.88<br>Opportunity Index (size): $359307',
        'Physician ID:4406<br>X= $17220, Y=0.82<br>Opportunity Index (size): $211805',
        'Physician ID:4926<br>X= $14598, Y=0.61<br>Opportunity Index (size): $186998',
        'Physician ID:5401<br>X= $19572, Y=0.78<br>Opportunity Index (size): $290052',
        'Physician ID:5842<br>X= $15147, Y=1.29<br>Opportunity Index (size): $449424'
    ],
    mode: 'markers',
    hoverinfo: "text",
    marker: {
        color: [
            'rgb(166,206,227)',
            'rgb(109,157,167)',
            'rgb(88,176,68)',
            'rgb(250,141,137)',
            'rgb(244,124,68)',
            'rgb(255,135,26)',
            'rgb(178,148,199)',
            'rgb(204,179,158)',
            'rgb(177,89,40)'
        ],
        size: [
            21.7981377122,
            19.9663885311,
            100,
            47.9096966812,
            39.4153652971,
            14.2348743648,
            10,
            27.5926449305,
            54.7994977248
        ],
        opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        sizemode: ['area', 'area', 'area', 'area', 'area', 'area', 'area', 'area', 'area']
    },
    type: 'scatter',
    xaxis: 'x',
    yaxis: 'y'
};

var data1 = [trace1];

Phy_layout = {
    hovermode: 'closest',
    plot_bgcolor: "#EEEEEE",
    paper_bgcolor: "#EEEEEE",
    margin: {
        r: 10,
        t: 0,
        b: 60,
        l: 60
    },
    showlegend: false,
    //title: 'Physician Opportunity Index Scatterplot for Unspecified septicemia',
    xaxis: {
        domain: [0, 1],
        title: 'Mean Cost of Diagnosis',
        fixedrange: true
    },
    yaxis: {
        domain: [0, 1],
        title: 'Coefficient of Variance (SD/Mean)',
        fixedrange: true
    }
};

//Bar chart
var xValue = ['Patient ID 25472', 'Patient ID 61852', 'Patient ID 64013'];
var yValue = [20463, 46457, 6323];


var databar = [
    {
        x: xValue,
        y: yValue,
        hoverinfo: "none",
        //text: ['Text A', 'Text B', 'Text C'], //tooltip
        marker: {
            color: ['rgba(7,55,99,1)', 'rgba(31,119,180,1)', 'rgba(44,182,157,1)'],
            line: { color: 'transparent' }
        },
        type: 'bar',
        xaxis: 'x',
        yaxis: 'y'
    }
];
var annotationContent = [];
function getLayoutBar() {
    //alert($("#scatter7").width());
    //            if ($("#scatter7").width() < 940) {
    //                var title = 'Total Encounter Cost for Patients Diagnosed <br>with Unspecified septicemia By Physician: 3320';
    //                var t = 40;
    //            } else {
    //                var title = 'Total Encounter Cost for Patients Diagnosed with Unspecified septicemia By Physician: 3320';
    //                var t = 25;
    //            }

    var layoutbar = {
        plot_bgcolor: "#EEEEEE",
        paper_bgcolor: "#EEEEEE",
        annotations: annotationContent,
        hovermode: "closest",
        margin: {
            r: 10,
            t: 0,
            b: 30,
            l: 60
        },
        //title: title,
        xaxis: {
            categoryarray: ['25472', '61852', '64013'],
            categoryorder: 'array',
            domain: [0, 1],
            //title: 'Deidentified Patient ID',
            type: 'category',
            fixedrange: true
        },
        yaxis: {
            domain: [0, 1],
            title: 'Total Cost of Encounter, In Dollars',
            fixedrange: true
        }
    };
    return layoutbar;
}



for (var i = 0; i < xValue.length; i++) {
    var result = {
        x: xValue[i],
        y: yValue[i],
        text: "$" + yValue[i].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        xanchor: 'center',
        yanchor: 'top',
        font: {
            color: '#ffffff'
        },
        showarrow: false
    };
    annotationContent.push(result);
}

$("#myCarousel").on('slid.bs.carousel', function (i) {
    updateChart();

    $(".popup").addClass("hide");
    $(".overlayBG").hide();

    setMsgBoxHeight();

});

drawChart();
function drawChart() {
    //alert(1);
    Plotly.newPlot('scatter1', data, layout);
    Plotly.newPlot('scatter2', data1, Phy_layout);
    layoutbar = getLayoutBar();
    Plotly.newPlot('scatter3', databar, layoutbar);
}


if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    var chart_Event = 'plotly_hover';
} else {
    var chart_Event = "plotly_click";
}

function updateChart() {
    //console.log($('.carousel-inner .active').index());
    var indexNo = $('.carousel-inner .active').index();
    // $("#scatter1").parents(".scatter").removeClass("fixedPos");
    if (indexNo == 0 || indexNo == 1 || indexNo == 2) {
        if ($("#scatter1").parents(".scatter").hasClass("fixedPos")) {
            $(".scatter").addClass("fixedPos");
            $("#scatter1").parents(".scatter").hide().removeClass("fixedPos").fadeIn("slow");
            Plotly.newPlot('scatter2', data1, Phy_layout);
        }
    } else if (indexNo == 3 || indexNo == 4) {
        if ($("#scatter2").parents(".scatter").hasClass("fixedPos")) {
            $(".scatter").addClass("fixedPos");
            $("#scatter2").parents(".scatter").hide().removeClass("fixedPos").fadeIn("slow");
            Plotly.newPlot('scatter1', data, layout);
        }
    } else if (indexNo == 5) {
        if ($("#scatter3").parents(".scatter").hasClass("fixedPos")) {
            $(".scatter").addClass("fixedPos");
            $("#scatter3").parents(".scatter").hide().removeClass("fixedPos").fadeIn("slow");
            Plotly.newPlot('scatter1', data, layout);
            Plotly.newPlot('scatter2', data1, Phy_layout);
        }
    }

    //Click and hover events
    if (indexNo === 2) {
        redrowChart("scatter1", 13);
    } else if (indexNo === 4) {
        redrowChart("scatter2", 2);
    } else if (indexNo === 5) {
        var myPlot2 = document.getElementById('scatter3');
        myPlot2.on(chart_Event, function (data) {
            //console.log(data.points[0].pointNumber);
            $("#ansTrack").addClass("hide");
            $("#dialog" + data.points[0].pointNumber).removeClass("hide");
            $(".overlayBG").show();
        });
    }
}

function redrowChart(id, no) {
    var myPlot = document.getElementById(id);
    myPlot.on(chart_Event, function (data) {
        //console.log(data.points[0].pointNumber);
        if (data.points[0].pointNumber == no) {
            $('#myCarousel').carousel('next');
        }
    });
}

$(function () {
    setMsgBoxHeight();
});
function setMsgBoxHeight() {
    var f_height = 0;
    var msgboxHeight = $(".carousel .active .row-eq-height").height();
    var l = $(".carousel .active .ans").length;
    for (var i = 1; i <= l; i++) {
        var h = $(".carousel .active .row-eq-height div:nth-child(" + i + ") .ans").css("height");
        var h1 = h.split('p');
        if (f_height < Number(h1[0])) {
            f_height = h1[0];
        }
    }
    $(".carousel .active .ans").css("height", f_height + "px");
}


$(document).ready(function () {
    window.onresize = function () {
        $(".fixedPos").addClass("initialPos");
        drawChart();
        $(".fixedPos").removeClass("initialPos");
        updateChart();
    };
    $(".overlayBG").click(function () {
        $(".popup:not(.hide)").addClass("hide");
        $(this).hide();
    });
    $("#25472,#61852,#64013").mouseleave(function () {
        $(this).addClass("hide");
        $(".overlayBG").hide();
    });
});

//Track answers
var ans = [0, 0, 0];
function trackAns(i, val) {
    ans[i - 1] = val;
    //alert(ans);
}

//hide carousel controls on first and last items
$('.carousel-sync').carousel('cycle');
$('.carousel-sync').on('click', '.carousel-control[data-slide]', function (ev) {
    ev.preventDefault();
    $('.carousel-sync').carousel($(this).data('slide'));
});
$('.carousel-sync').on('mouseover', function (ev) {
    ev.preventDefault();
    $('.carousel-sync').carousel('pause');
});
$('.carousel-sync').on('mouseleave', function (ev) {
    ev.preventDefault();
    $('.carousel-sync').carousel('cycle');
});

$('#myCarousel').bind('slid.bs.carousel', function (e) {
    //var $this = $(this);
    //alert(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) == null) {
        $('.prevBtn, .nextBtn').show();
    }

    if ($('.carousel-inner .item:last').hasClass('active')) {
        $('#myCarousel').carousel('pause');
        $('.nextBtn').hide();

        //for track answer
        var ansTrack = true;
        $.each(ans, function () {
            //alert(this);
            if (parseInt(this) === 0) {
                //$("#ansTrack").removeClass("hide");
                //$(".overlayBG").show();
                ansTrack = false;
            }
        });
        //if (ansTrack)
        //$("#ansTrack").addClass("hide");

    } else if ($('.carousel-inner .item:first').hasClass('active')) {
        $('.prevBtn').hide();
    }
});



var app={isMobile : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)};
$(".additem").on("swipeleft", function () {
    if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;
        $(".carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == l) {
            $(".carousel-indicators li:nth-child(1)").addClass("active");
            $(".additem div.item:nth-child(1)").addClass("active");
        }
        else {
            i++;
            $(".carousel-indicators li:nth-child(" + i + ")").addClass("active");
            $(".additem div.item:nth-child(" + i + ")").addClass("active");
        }

        updateChart();
        setMsgBoxHeight();
    }

});
$(".additem").on("swiperight", function () {
    if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;
        $(".carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == 1) {
            $(".carousel-indicators li:nth-child(" + l + ")").addClass("active");
            $(".additem div.item:nth-child(" + l + ")").addClass("active");
        }
        else {
            i--;
            $(".carousel-indicators li:nth-child(" + i + ")").addClass("active");
            $(".additem div.item:nth-child(" + i + ")").addClass("active");
        }

        updateChart();
        setMsgBoxHeight();
    }
});




 $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}