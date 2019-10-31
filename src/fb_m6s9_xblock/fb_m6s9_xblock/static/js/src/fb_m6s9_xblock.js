/* Javascript for FBm6s9XBlock. */



// $(".additem").on("swipeleft",function(){
//   if(app.isMobile){
//    var i = $(this).children("div.item.active").index()+1;
//  var l = $(this).children("div.item").length;
//  $(".carousel-indicators li").removeClass("active");
//   $(this).children("div.item").removeClass("active");
//    if(i==l)
//  {
//     $(".carousel-indicators li:nth-child(1)").addClass("active");
//     $(".additem div.item:nth-child(1)").addClass("active");
//  }
//  else{
//      i++;
//    $(".carousel-indicators li:nth-child("+i+")").addClass("active");
//     $(".additem div.item:nth-child("+i+")").addClass("active");
//  }
//  }
// });
// $(".additem").on("swiperight",function(){
//   if(app.isMobile){
//    var i = $(this).children("div.item.active").index()+1;
//  var l = $(this).children("div.item").length;
//  $(".carousel-indicators li").removeClass("active");
//   $(this).children("div.item").removeClass("active");
//    if(i==1)
//  {
//     $(".carousel-indicators li:nth-child("+l+")").addClass("active");
//     $(".additem div.item:nth-child("+l+")").addClass("active");
//  }
//  else{
//      i--;
//    $(".carousel-indicators li:nth-child("+i+")").addClass("active");
//     $(".additem div.item:nth-child("+i+")").addClass("active");
//  }
//  }
// });


$(".calculator input.cost").keypress(function (e) {
  //if the letter is not digit then display error and don't type anything
  if (e.which != 46 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    //display error message
    return false;
  }
});
var CalcJsonDB = "";
function sum(id) {
  var CalcResult = 0;
  $.each($('.calculator input.cost'), function (i, v) {
    if ($(v).val() != '') {
      CalcResult = CalcResult + parseFloat($(v).val());
    }
  });
  $('#totalcost').html(CalcResult.toFixed(2));
}
$(".textshow1").hide();



// $('td.userdata').click(function(){
//   if($(this).attr("Index")!=undefined)
//   {
//     $('#myModal9').modal('toggle');
//     $('#myModal9').modal('show');
//     $('#myModal9 .modal-title .Urank').html('RANK '+(parseInt($(this).attr("Index"))+1));
//     $('#myModal9 .modal-title .Uname').html(CalcJsonDB[$(this).attr("Index")]['name']+', '+CalcJsonDB[$(this).attr("Index")]['PPRole']);
//     var Data=CalcJsonDB[$(this).attr("Index")].Data;
//     $.each($('#myModal9 .Seesolntable1'),function(i,v){
//     $(v).find(".cost").html('$ '+Data.Cost['Cost'+(i+1)]);
//     $(v).find(".Desc").html(Data.Description['Desc'+(i+1)]);
//     });
//     $('#myModal9 .Seesolntable .Tcost').html('$ '+Data.Cost["TotalCost"]);
//   }
// });

// $('.ExamplePop').click(function(){
//     $('#myModalExample').modal('toggle');
//     $('#myModalExample').modal('show');

// });
















function FBm6s9XBlock(runtime, element) {



  var fb_add_responses_url = runtime.handlerUrl(element, 'fb_add_responses');
  var check_user_submmited = runtime.handlerUrl(element, 'check_user_submmited');


  // $(".additem").on("swipeleft",function(){
  //     if(app.isMobile){
  //      var i = $(this).children("div.item.active").index()+1;
  //      var l = $(this).children("div.item").length;
  //      $(".carousel-indicators li").removeClass("active");
  //       $(this).children("div.item").removeClass("active");
  //      if(i==l)
  //      {
  //         $(".carousel-indicators li:nth-child(1)").addClass("active");
  //         $(".additem div.item:nth-child(1)").addClass("active");
  //      }
  //      else{
  //          i++;
  //          $(".carousel-indicators li:nth-child("+i+")").addClass("active");
  //         $(".additem div.item:nth-child("+i+")").addClass("active");
  //      }
  //      }
  //   });
  //   $(".additem").on("swiperight",function(){
  //     if(app.isMobile){
  //      var i = $(this).children("div.item.active").index()+1;
  //      var l = $(this).children("div.item").length;
  //      $(".carousel-indicators li").removeClass("active");
  //       $(this).children("div.item").removeClass("active");
  //      if(i==1)
  //      {
  //         $(".carousel-indicators li:nth-child("+l+")").addClass("active");
  //         $(".additem div.item:nth-child("+l+")").addClass("active");
  //      }
  //      else{
  //          i--;
  //          $(".carousel-indicators li:nth-child("+i+")").addClass("active");
  //         $(".additem div.item:nth-child("+i+")").addClass("active");
  //      }
  //      }
  //   });


  // function Display_lowest_Data(result)
  // {
  //   CalcJsonDB=result;
  //   $.each($('.showresult tbody tr'),function(i,v){
  //     if(result[i]!=undefined)
  //     {
  //       $(v).find("td:eq(0)").text(i+1);
  //       $(v).find("td:eq(1)").text(result[i]["name"]+', '+result[i]["PPRole"]);
  //       $(v).find("td:eq(2)").text('$ '+result[i]["DiffCost"]);
  //       $(v).find("td:eq(3)").attr('Index',i);
  //       $(v).find("td:eq(3)").html('<img src="https://s3.us-east-2.amazonaws.com/dms-vbhc/img/eyesimg.png" class="userdata1"/>');
  //     }
  //   });
  // }




  var CalcJsonDB = "";
  // function sum(id) {
  //     var CalcResult=0;
  //     $.each($('.calculator input.cost'),function(i,v){
  //         if($(v).val()!='')
  //         {
  //             CalcResult=CalcResult+parseFloat($(v).val());
  //         }
  //     });
  //     $('#totalcost').html(CalcResult.toFixed(2));
  // }
  $(".textshow1").hide();
  $('#SubmitCalc').click(function () {
    if ($('#t1').val() == '' || $('#t2').val() == '' || $('#t3').val() == '' || $('#t4').val() == '' || $('#t5').val() == '' || $('#t6').val() == '') {
      alert('Please complete this activity to submit.');
      return false;
    } else {

      $(".textshow").show();
      $(".textshow1").show();
      $("#SubmitCalc").hide();
      $(".colSavevalue,.colSavevalue1").show();
      var JSONobj = { "Cost": { "Cost1": 0, "Cost2": 0, "Cost3": 0, "Cost4": 0, "Cost5": 0, "Cost6": 0, "TotalCost": "active", "Diff": 0 }, "Description": { "Desc1": "", "Desc2": "", "Desc3": "", "Desc4": "", "Desc5": "", "Desc6": "" } };

      $.each($(".calculator tbody tr.CalcRow"), function (i, v) {
        JSONobj.Cost['Cost' + (i + 1)] = $(v).find('input.cost').val();
        JSONobj.Description['Desc' + (i + 1)] = $(v).find('textarea.Desc').val();
      });
      JSONobj.Cost["TotalCost"] = $('#totalcost').text();
      var x = 524.09;
      var y = $('#totalcost').text();
      var DiffCost = parseFloat(x) - parseFloat(y);
      if (isNaN(DiffCost)) {
        DiffCost = 0;
      }
      $('input.cost,textarea.Desc').attr('readonly', true);
      $('#Savevalue').text(DiffCost.toFixed(2));
      JSONobj.Cost["Diff"] = DiffCost.toFixed(2);
      var DataJson = JSON.stringify(JSONobj);
      $.ajax({
        url: fb_add_responses_url,
        data: JSON.stringify({ "Data": DataJson }),
        type: 'POST',
        dataType: "json",
        success: function (result) {
          Display_lowest_Data(result.user_record);
          $(".showresult").show();
          $(".Seesolntable").show();
        }
      });
    }
  });

  $('.ExamplePop').click(function () {
    $('#myModalExample').modal('toggle');
    $('#myModalExample').modal('show');

  });

  function Display_lowest_Data(result) {
    var html = '';
    $.each(result, function (i, v) {
      //console.log(v);

      html += '<tr><td>' + (i + 1) + '</td>';
      html += '<td>' + v.full_name + '</td>';
      html += '<td>' + v.response.Cost.Diff + '</td>';
      html += '<td data-json=\'' + JSON.stringify(v) + '\' class="td-json" onclick="moduleAppendData(this);" data-index=' + i + '><img src="https://s3.us-east-2.amazonaws.com/dms-vbhc/img/eyesimg.png" class="userdata1"/></td>';
      html += "</tr>";
    });

    $('.showresult tbody').html(html);
  }



  $(function ($) {
    /* Here's where you'd do things on page load. */
    $.ajax({
      url: check_user_submmited,
      data: JSON.stringify({ "Data": "testing" }),
      type: 'POST',
      dataType: "json",
      success: function (result) {
        if (result.user_record != "new_user") {
          Display_lowest_Data(result.user_record);
          $(".showresult").show();
          $(".Seesolntable").show();
          var JSONobj = result['Current_user'];
          //console.log("JSONobj---", JSONobj);
          $.each($(".calculator tbody tr.CalcRow"), function (i, v) {
            // console.log("JSONobj.response===", JSONobj.response);

            $(v).find('input.cost').val(JSONobj.response.Cost['Cost' + (i + 1)]);
            $(v).find('textarea.Desc').val(JSONobj.response.Description['Desc' + (i + 1)]);
          });
          $('#totalcost').text(JSONobj.response.Cost["TotalCost"]);
          $('#Savevalue').text(JSONobj.response.Cost["Diff"]);

          // $('totalcost').val(result.totalcost);
          $('input.cost,textarea.Desc').attr('readonly', true);

          $(".textshow").show();
          $(".textshow1").show();
          $("#SubmitCalc").hide();
          $(".colSavevalue,.colSavevalue1").show();
          // $('#Savevalue').text(result.diffcost);


        }

      }
    });


  });
}

function moduleAppendData(obj) {
  $('#myModal9').modal('toggle');
  $('#myModal9').modal('show');

  $('#myModal9 .modal-title .Urank').html('RANK ' + (parseInt($(obj).data("index")) + 1));
  $('#myModal9 .modal-title .Uname').html( $(obj).data('json').full_name );
  var Data = $(obj).data('json').response;
  $.each($('#myModal9 .Seesolntable1'), function (i, v) {
    $(v).find(".cost").html('$ ' + Data.Cost['Cost' + (i + 1)]);
    $(v).find(".Desc").html(Data.Description['Desc' + (i + 1)]);
  });
  $('#myModal9 .Seesolntable .Tcost').html('$ ' + Data.Cost["TotalCost"]);

}

// var JSONobj=result['CalcDataUser'][0];
//        $.each($(".calculator tbody tr.CalcRow"),function(i,v){

//                 $(v).find('input.cost').val(JSONobj.Data.Cost['Cost'+(i+1)]);
//                 $(v).find('textarea.Desc').val(JSONobj.Data.Description['Desc'+(i+1)]);
//             });
//       $('#totalcost').text(JSONobj.Data.Cost["TotalCost"]);
//       $('#Savevalue').text(JSONobj.Data.Cost["Diff"]);