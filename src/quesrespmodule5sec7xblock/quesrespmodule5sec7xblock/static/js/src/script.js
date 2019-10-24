var app = {
  MData:null, 
  SelecteM:null,  
  MIN:null,
  HR:null,
  SData:null,
  PageComplete:null, 
  cArrayT:[],
  cArrayN:[],
  cArrayT1:[],
  cArrayN1:[],
  WCList1:null,
  WCList2:null,
  SearchKey:null,
  Page1:null,
  Page2:null,
  Page3:null,
  LoginName:null,
  LoginEmail:null,
  organization:null,
  role:null,
  survey_response1:null,
  survey_response2:null,
  survey_response3:null,
  survey_response4:null,
  ClickOnModule:null,
  isMobile : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
	init:function(){
		this.LoadConfig();
		this.preLoader();
		this.Anim();
    this.Events();
	//this.GetallResponse1('m1','s2');
	},  
DataSave:function(dataSave){
    // data save in recods table.
      $.post( "dataSave.php", dataSave, 
        function( data ) {  
        }, "json");
     //  console.log(dataSave)
},
  MDataPopulate:function(){
    // this function used for data populate for home page menu.
    var loc1 = app.MData[app.SelecteM];

     var loc01 = {'m1':[0,45],'m2':[0,45],'m3':[1, 10],'m4':[1, 10],'m5':[1, 30],'m6':[1, 10],'m7':[1, 30],'m8':[0, 45],'m9':[1, 05],'m10':[1, 00],'survey':[0, 10]}
    $(".menus .HR").html(loc01[app.SelecteM][0]);
    $(".menus .MIN").html(loc01[app.SelecteM][1]);
	
	if(app.SelecteM !="survey")
	{
    $(".menus .lG2 .progress-bar").css({"width":loc1['complete']+"%"});
    $(".menus .lG2 .mP").text(loc1['complete']);
	$(".menus .lG2 .ProgressText").text('Module Progress');
	}
    var i=0;
	var TmpArray={'m1':'headingSix','m2':'headingSeven','m3':'headingEight','m4':'headingTen','m5':'headingEleven','m6':'headingThirteen','m7':'headingFourteen','m8':'headingSixteen','m9':'headingSeventeen','m10':'headingEightteen'};
	if(app.SelecteM !="survey")
	{
    $.each(app.MData,function(v1,k1){ 
		i++;
        if(k1.complete == '100') {
           $(".btnM"+i).addClass('complete');
          $(".btnM"+i+" .alert1").text('Revisit');
		  $('#'+TmpArray[v1]+' .text-center.small span').text('complete');
			$('#'+TmpArray[v1]+' .text-center.small span').css({"color":'#43bea7'});
			$('#'+TmpArray[v1]+' .CollectionText span').css({"color":'#43bea7'});
        }else if (k1.complete == '0') {
           $(".btnM"+i+" .alert1").text('Begin');
           $(".btnM"+i).removeClass('complete');
		    $('#'+TmpArray[v1]+' .text-center.small span').text('not started');
			$('#'+TmpArray[v1]+' .text-center.small span').css({"color":'#a0a0a0'});
			$('#'+TmpArray[v1]+' .CollectionText span').css({"color":'#333'});
         }else{
          $(".btnM"+i+" .alert1").text('Continue');
          $(".btnM"+i).removeClass('complete');
		   $('#'+TmpArray[v1]+' .text-center.small span').text('active');
		  $('#'+TmpArray[v1]+' .text-center.small span').css({"color":'#a0a0a0'});
			$('#'+TmpArray[v1]+' .CollectionText span').css({"color":'#333'});
         }
        $.each(k1,function(v2,k2){
		    if(v2 == "status"){
				$(".btnM"+i+" .small").text(k2)
            }
		})
    })
	}
  },
  
  CDataPopulate:function(collections){
	//debugger;
    // this function used for data populate for home page menu.
	var CData={'c1':0,'c2':0,'c3':0,'c4':0};
	var Carray={'c1':['m1','m2','m3'],'c2':['m4','m5'],'c3':['m6','m7'],'c4':['m8','m9','m10']};
	var mComplete=0;
	$.each(Carray,function(i,v){
		mComplete=0;
		$.each(v,function(k,vv){
			mComplete=mComplete+parseInt(app.MData[vv]['complete']);			
		});
		var percent=parseInt(v.length*100);
		mComplete = (mComplete*100/percent).toFixed(0);
		CData[i]=mComplete;
	});	
   var loc01 = {'c1':[2,50],'c2':[2,40],'c3':[2, 40],'c4':[2, 50]}
    $(".menus .HR").html(loc01[collections][0]);
    $(".menus .MIN").html(loc01[collections][1]);
	if(app.SelecteM !="survey")
	{
    $(".menus .lG2 .progress-bar").css({"width":CData[collections]+"%"});
    $(".menus .lG2 .mP").text(CData[collections]);
	$(".menus .lG2 .ProgressText").text('Collection Progress');
	}
	var TmpArray={'c1':'headingOne','c2':'headingTwo','c3':'headingThree','c4':'headingFour'};
	if(app.SelecteM !="survey")
	{
    $.each(CData,function(v1,k1){
            if(k1== '100') {
				$('#'+TmpArray[v1]+' .text-center.small span').text('complete');
				$('#'+TmpArray[v1]+' .text-center.small span').css({"color":'#43bea7'});
				$('#'+TmpArray[v1]+' .CollectionText span').css({"color":'#43bea7'});
            }else if (k1 == '0') {
              $('#'+TmpArray[v1]+' .text-center.small span').text('not started');
				$('#'+TmpArray[v1]+' .text-center.small span').css({"color":'#a0a0a0'});
				$('#'+TmpArray[v1]+' .CollectionText span').css({"color":'#333'});
             }else{
              $('#'+TmpArray[v1]+' .text-center.small span').text('active');
			 $('#'+TmpArray[v1]+' .text-center.small span').css({"color":'#a0a0a0'});
				$('#'+TmpArray[v1]+' .CollectionText span').css({"color":'#333'});
             }
       })
	   if(app.survey_response1=='complete')
	   {
		$('.btnMC1 .text-center.small').text('complete');
		$('.btnMC1').addClass('complete');
	   }
	   if(app.survey_response2=='complete')
	   {
		$('.btnMC2 .text-center.small').text('complete');
		$('.btnMC2').addClass('complete');
	   }
	   if(app.survey_response3=='complete')
	   {
		$('.btnMC3 .text-center.small').text('complete');
		$('.btnMC3').addClass('complete');
	   }
	   if(app.survey_response4=='complete')
	   {
		$('.btnMC4 .text-center.small').text('complete');
		$('.btnMC4').addClass('complete');
	   }
	   
	} 
  },
  SDataPopulate:function(j){
	//$('.wellC').show();
	if(app.SelecteM.indexOf('survay')!=-1)
	{
			var O_cText=app.GetSurveyOutComeText(app.SelecteM);
			$(".MSection strong.outcm3").html("");
			//$("._outm1 .clickS"+j).show();
			$(".outc").show();
			$(".outc").show();
			$("._outm1 .clickS .text-center").html(O_cText);
			$("._outm1").css("display","block");
			$("._outm1 .clickS").css("display","block");
			return false;
		
	}
    var loc1 = app.MData[app.SelecteM].sections;
	if(app.ClickOnModule != 'module3') {
	 //alert(app.ClickOnModule);
    $(".MSection .lG2 .progress-bar").css({"width":loc1['s'+j]['complete']+"%"});
    $(".MSection .lG2 .mP").html(loc1['s'+j]['complete']+"%");
    $(".btnss").removeClass('act');
    $("._"+app.SelecteM+" .btnS"+j).addClass('act');
	$("#sectionProgress").css("visibility","visible");
    //$(".MSection .mn").html(j);
	$(".MSection strong.outcm3").html("SECTION <span class='mn'>"+j+"</span> OUTCOMES");
    $(".MSection .clickS").hide();
    }
	if(app.ClickOnModule == 'module3')
	{
	if(j<=2)
	{
    $(".MSection .lG2 .progress-bar").css({"width":loc1['s'+j]['complete']+"%"});
    $(".MSection .lG2 .mP").html(loc1['s'+j]['complete']+"%");
	$(".btnss").removeClass('act');
    $(".btnS"+j).addClass('act');
	
    $(".MSection strong.outcm3").html("SECTION <span class='mn'>"+j+"</span> OUTCOMES");
    $("#sectionProgress").css("visibility","visible");
	}
	else if(j==3)
	{
    $("#sectionProgress").css("visibility","hidden");
	$(".btnss").removeClass('act');
    //$(".btnS"+j).addClass('act');
	$(".btnSD").addClass('act');
    $(".MSection strong.outcm3").html("DIVE DEEPER: OUTCOMES");
	}
	else
	{
	  $("#sectionProgress").css("visibility","visible");
    jic = j - 1;
	$(".MSection .lG2 .progress-bar").css({"width":loc1['s'+jic]['complete']+"%"});
    $(".MSection .lG2 .mP").html(loc1['s'+jic]['complete']+"%");
	$(".btnss").removeClass('act');
    $(".btnS"+jic).addClass('act');
    $(".MSection strong.outcm3").html("SECTION <span class='mn'>"+jic+"</span> OUTCOMES");
	}
	    //$(".btnss").removeClass('act');
	    $(".MSection .clickS").hide();
	}
	
	/* Start:: display out_come for sections */
	
	var xPath="//Module_Menu[@name = '"+app.ClickOnModule.charAt(0).toUpperCase()+app.ClickOnModule.slice(1)+"']/item["+j+"]/out_come";
	 var nodes= app.XML.evaluate(xPath, app.XML, null, XPathResult.ANY_TYPE, null);
	 var result = nodes.iterateNext();
	 var O_cText=result.textContent;
	 //$("._outm1 .clickS"+j).show();
	 $("._outm1 .clickS .text-center").html(O_cText);
	 $("._outm1").css("display","block");
	 $("._outm1 .clickS").css("display","block");	
	 
	/* End :: display out_come for sections */
    $.each(app.MData,function(v,k){
		var i=0;
		$.each(k.sections,function(vv,kk){
			i++;
			if(kk.complete == '100') {
				$("._"+v+" .btnS"+i).addClass('complete');
				$("._"+v+" .btnS"+i+" .alert1").text('Revisit');
			}else if (kk.complete == '0') {
				$("._"+v+" .btnS"+i).removeClass('complete');
				$("._"+v+" .btnS"+i+" .alert1").text('Begin');
			}else{
				$("._"+v+" .btnS"+i).removeClass('complete');
				$("._"+v+" .btnS"+i+" .alert1").text('Continue');
			}
		});
    });
	/* Survey text change*/
	if(app.survey_response1=='complete')
	   {
		$('#collapseNine .text-center.small').text('complete');
		$('#collapseNine').addClass('complete');
		$('#headingNine .text-center.small span').text('complete');
		$('#headingNine .text-center.small span').css({"color":'#43bea7'});
		$('#headingNine .CollectionText').addClass('complete');
	   }
	   if(app.survey_response2=='complete')
	   {
		$('#collapseTwelve .text-center.small').text('complete');
		$('#collapseTwelve').addClass('complete');
		$('#headingTwelve .text-center.small span').text('complete');
		$('#headingTwelve .text-center.small span').css({"color":'#43bea7'});
		$('#headingTwelve .CollectionText').addClass('complete');
	   }
	    if(app.survey_response3=='complete')
	   {
		$('#collapseFifteen .text-center.small').text('complete');
		$('#collapseFifteen').addClass('complete');
		$('#headingFifteen .text-center.small span').text('complete');
		$('#headingFifteen .text-center.small span').css({"color":'#43bea7'});
		$('#headingFifteen .CollectionText').addClass('complete');
	   }
	  if(app.survey_response4=='complete')
	   {
		$('#collapseNineteen .text-center.small').text('complete');
		$('#collapseNineteen').addClass('complete');
		$('#headingNineteen .text-center.small span').text('complete');
		$('#headingNineteen .text-center.small span').css({"color":'#43bea7'});
		$('#headingNineteen .CollectionText').addClass('complete');
	   }
	   
		var timeFixed={
			'm1':[[00,01],[00,05],[00,05],[00,05],[00,05],[00,05],[00,05],[00,10],[00,04]],
			'm2':[[00,01],[00,05],[00,05],[00,05],[00,08],[00,05],[00,12],[00,04]],
			'm3':[[00,02],[00,10],[00,10],[00,05],[00,12],[00,06],[00,07],[00,15],[00,03]],
			'm4':[[00,01],[00,05],[00,05],[00,05],[00,05],[00,09],[00,05],[00,05],[00,25],[00,05]],
			'm5':[[00,01],[00,05],[00,05],[00,05],[00,04],[00,05],[00,05],[00,25],[00,05],[00,25],[00,05]],
			'm6':[[00,01],[00,05],[00,10],[00,10],[00,05],[00,05],[00,10],[00,10],[00,10],[00,04]],
			'm7':[[00,01],[00,08],[00,10],[00,10],[00,05],[00,10],[00,10],[00,07],[00,25],[00,04]],
			'm8':[[00,01],[00,05],[00,05],[00,03],[00,05],[00,03],[00,07],[00,5],[00,05],[00,5],[00,01]],
			'm9':[[00,01],[00,05],[00,05],[00,05],[00,05],[00,05],[00,05],[00,3],[00,05],[00,10],[00,15],[00,01]],
			'm10':[[00,01],[00,05],[00,05],[00,05],[00,05],[00,05],[00,10],[00,03],[00,10],[00,10],[00,1]],
		};
		
		$.each(timeFixed,function(i,v){
			if(app.SelecteM==i)
			{
				$(".MSection .HR").html(v[j-1][0]);
				$(".MSection .MIN").html(v[j-1][1]);
				if (j==v.length || j==1){
					$(".outc").hide();
				}else{
					$(".outc").show();
				}	
			}
		});
  },
  
  Events:function(){ 
    $('.panel-collapse').on('show.bs.collapse', function () {
		$('.panel-heading').removeClass('active');
		$('.panel-collapse').removeClass('in');
			//debugger;
		if($(this).attr('m_no')!=undefined)
		{
			app.ClickOnModule=$(this).attr('m_no');
		}
        $(this).siblings('.panel-heading').addClass('active');
    });
    $('.panel-collapse').on('hide.bs.collapse', function () {		
        $(this).siblings('.panel-heading').removeClass('active');
    });
	$('.panel-default').hover(function(e){
		//debugger;
		/* if(app.SelecteM=='survey')
		{
			$('.panel-title').removeClass('act');
			$(this).find('.panel-title').addClass('act');
			return false;
		} */
		$('.panel-title').removeClass('act');
		$(this).find('.panel-title').addClass('act');
		var selection='';
		if($(this).find('#headingOne').length==1)
		{
			$('#clocm').show();
			$('#mdocm').hide();
			$(".menus .wellC strong").css("visibility","visible");
			$('.Collection1,.Collection2,.Collection3,.Collection4').addClass('hide');
			$('.Collection1').removeClass('hide');
			$('.clickM').addClass('hide');
			$('#clocm .mn').html(1)
			selection='c1';
		}
		if($(this).find('#headingTwo').length==1)
		{
			$('#clocm').show();
			$('#mdocm').hide();
			$(".menus .wellC strong").css("visibility","visible");
			$('.Collection1,.Collection2,.Collection3,.Collection4').addClass('hide');
			$('.Collection2').removeClass('hide');
			$('.clickM').addClass('hide');
			$('#clocm .mn').html(2)
			selection='c2';
		}
		if($(this).find('#headingThree').length==1)
		{
			$('#clocm').show();
			$('#mdocm').hide();
			$(".menus .wellC strong").css("visibility","visible");
			$('.Collection1,.Collection2,.Collection3,.Collection4').addClass('hide');
			$('.Collection3').removeClass('hide');
			$('.clickM').addClass('hide');
			$('#clocm .mn').html(3)
			selection='c3';
		}
		if($(this).find('#headingFour').length==1)
		{
			$('#clocm').show();
			$('#mdocm').hide();
			$(".menus .wellC strong").css("visibility","visible");
			selection='c4';
			$('.Collection1,.Collection2,.Collection3,.Collection4').addClass('hide');
			$('.Collection4').removeClass('hide');
			$('.clickM').addClass('hide');
			$('#clocm .mn').html(4)
		}
		if(selection!='')
		{
			app.CDataPopulate(selection);
		}
		else{
			
			var MD_no=$(this).find('.panel-collapse').attr('m_no');
			if(MD_no!=undefined)
			{
				var tmp=MD_no.replace('module','m');
				app.ModuleTracking(tmp);
			}
			else{
				$(".MSection .HR").html(0);
				$(".MSection .MIN").html(10);
				$(".MSection .lG2 .progress-bar").css({"width":"0%"});
				$(".MSection .lG2 .mP").html("0%");
				$(".MSection .lG2 .ProgressText").text('Module Progress');
				$(".outc").hide();
			}
		}
	});
    

    $(".dis").click(function(e){
      $(this).hide();
    })
    $(".btns").click(function(e){
	  var index ='';
	  var module=$(this).attr('module');
	  if(module.indexOf('survay')==-1)
	  {
		index=module.replace('m','');
		$("#module, .menus").hide();
		$("#section, .MSection").show();
		window.location="?id=m"+index+"/m"+index+"s1p1";
	  }
	  else
	  {
		if(module=='survay_m1' && app.MData['m1']['status']=="complete" && app.MData['m2']['status']=="complete" && app.MData['m3']['status']=="complete")
		{
		   window.location="?id=Collection1_survey";
		}
		if(module=='survay_m2' && app.MData['m4']['status']=="complete" && app.MData['m5']['status']=="complete")
		{
		   window.location="?id=Collection2_survey";
		}
		if(module=='survay_m3' && app.MData['m6']['status']=="complete" && app.MData['m7']['status']=="complete")
		{
		   window.location="?id=Collection3_survey";
		}
		if(module=='survay_m4' && app.MData['m8']['status']=="complete" && app.MData['m9']['status']=="complete" && app.MData['m10']['status']=="complete")
		{
		   window.location="?id=Collection4_survey";
		}
		
	}
  });

    $(".allModule1 .btn, .allModule2 .btn, .allModule3 .btn, .allModule4 .btn, .allModule5 .btn").click(function(e){
    $(".allModule1 .btn, .allModule2 .btn, .allModule3 .btn, .allModule4 .btn, .allModule5 .btn").removeClass('act1');

      var index = $(this).text();
      if (index == 'Module 1') {
          $('._m1, ._m2, ._m3, ._m4, ._m5').hide();
          $('._m1').show();
          app.SelecteM = 'm1';
          $(".allModule1 .btn").eq(0).addClass('act1');
          $(".allModule2 .btn").eq(0).addClass('act1');
          $(".allModule3 .btn").eq(0).addClass('act1');
		  $(".allModule4 .btn").eq(0).addClass('act1');
		  $(".allModule5 .btn").eq(0).addClass('act1');
      }else if (index == 'Module 2') {
        $('._m1, ._m2, ._m3, ._m4, ._m5').hide();
        $('._m2').show();
        app.SelecteM = 'm2';
        $(".allModule1 .btn").eq(1).addClass('act1');
        $(".allModule2 .btn").eq(1).addClass('act1');
        $(".allModule3 .btn").eq(1).addClass('act1');
		$(".allModule4 .btn").eq(1).addClass('act1');
		$(".allModule5 .btn").eq(1).addClass('act1');
      }else if (index == 'Module 3') {
        $('._m1, ._m2, ._m3, ._m4, ._m5').hide();
        $('._m3').show();
        app.SelecteM = 'm3';
        $(".allModule1 .btn").eq(2).addClass('act1');
        $(".allModule2 .btn").eq(2).addClass('act1');
        $(".allModule3 .btn").eq(2).addClass('act1');
		$(".allModule4 .btn").eq(2).addClass('act1');
		$(".allModule5 .btn").eq(2).addClass('act1');
      }else if (index == 'Module 4') {
        $('._m1, ._m2, ._m3, ._m4, ._m5').hide();
        $('._m4').show();
        app.SelecteM = 'm4';
        $(".allModule1 .btn").eq(3).addClass('act1');
        $(".allModule2 .btn").eq(3).addClass('act1');
        $(".allModule3 .btn").eq(3).addClass('act1');
		$(".allModule4 .btn").eq(3).addClass('act1');
		$(".allModule5 .btn").eq(3).addClass('act1');
      }else if (index == 'Module 5') {
        $('._m1, ._m2, ._m3, ._m4, ._m5').hide();
        $('._m5').show();
        app.SelecteM = 'm5';
        $(".allModule1 .btn").eq(4).addClass('act1');
        $(".allModule2 .btn").eq(4).addClass('act1');
        $(".allModule3 .btn").eq(4).addClass('act1');
		$(".allModule4 .btn").eq(4).addClass('act1');
		$(".allModule5 .btn").eq(4).addClass('act1');
      }
      
      //app.SDataPopulate(1);
      var hh = $(".op").height();
      $(".r2").css({'min-height':hh+'px'});
    });
    $(".btns").hover(function(e){
       //var index = $(this).index();
	   $('.Collection1,.Collection2,.Collection3,.Collection4').addClass('hide');
	   $('#clocm').hide();
	   $('#mdocm').show();
	   var index ='';
	   var module=$(this).attr('module');
	    if(module.indexOf('survay')==-1)
		{
			//app.SurveyHover='';
		 index=module.replace('m','');
		 if(module=='m16')
		 {
			module='m6';
			$(".menus .mn").html(6);
		 }
		 else{
			$(".menus .mn").html(index);
		 }
		 app.SelecteM=module;
		 $(".menus .wellC strong").css("visibility","visible");
		}
		else
		{
			if(module=="survay_m2")
			{
				index=12;
			}
			else if(module=="survay_m3")
			{
				index=13;
			}
			else if(module=="survay_m4")
			{
				index=14;
			}
			else
			{
				index=11;
			}
		$(".menus .wellC strong").css("visibility","hidden");
		app.SelecteM='survey';
		}
        $(".menus .clickM").hide();
		if(index<=10)
		{
			$(".menus .clickM"+index).show().removeClass('hide');
		}
        $(".menus .btns").removeClass('act');
        $(".menus .btnM"+index).addClass('act');
        app.MDataPopulate();
		 if(module.indexOf('survay')!=-1)
		{
			$('.panel-title').removeClass('act');
			if(module=="survay_m1")
			{
				$('#headingOne').find('.panel-title').addClass('act');
			}
			if(module=="survay_m2")
			{
				$('#headingTwo').find('.panel-title').addClass('act');
			}
			if(module=="survay_m3")
			{
				$('#headingThree').find('.panel-title').addClass('act');
			}
			if(module=="survay_m4")
			{
				$('#headingFour').find('.panel-title').addClass('act');
			}
			var Text=app.GetSurveyOutComeText(module);
			$(".menus .clickM11 div").html(Text);
			$(".menus .clickM11").show().removeClass('hide');
			
		}
		return false;
    });
    $("body").click(function(e){
      var loc0 = $(e.target).closest('.m').length;
      var loc1 = $(e.target ).closest('.section').length;
      if (loc0 == 0 && !loc1) {
          $(".MSection").hide();
          $(".disM").hide();
        //alert(loc0)
      }
      var loc2 = $(e.target).closest('.p').length;
      var loc3 = $(e.target ).closest('.mod').length;
      if (loc2 == 0 && !loc3) {
          $(".menus").hide();
          $(".disM").hide()
          // flip--;
      }
      var loc4 = $(e.target).closest('.mainFAQ').length;
      var loc5 = $(e.target ).closest('.faqBtn').length;
      if (loc4 == 0 && !loc5) {
          $(".FAQ").hide();
          $(".disF").hide();
      }
      var loc6 = $(e.target).closest('.mainSaerch').length;
      if (loc6 == 0) {
          $(".saerch").hide();
          $(".disS").hide()
      }
        //myModal

    });
   

	$(".btnss").click(function(e){
      var index = $(this).index();
	  if(index==0)
	  {
		var module=$(this).attr('module');
		if(module=='survay_m1' && app.MData['m1']['status']=="complete" && app.MData['m2']['status']=="complete" && app.MData['m3']['status']=="complete")
		{
		   window.location="?id=Collection1_survey";
		}
		if(module=='survay_m2' && app.MData['m4']['status']=="complete" && app.MData['m5']['status']=="complete")
		{
		   window.location="?id=Collection2_survey";
		}
		if(module=='survay_m3' && app.MData['m6']['status']=="complete" && app.MData['m7']['status']=="complete")
		{
		   window.location="?id=Collection3_survey";
		}
		if(module=='survay_m4' && app.MData['m8']['status']=="complete" && app.MData['m9']['status']=="complete" && app.MData['m10']['status']=="complete")
		{
		   window.location="?id=Collection4_survey";
		}
	  }
	  else{
		app.setModuleNo();
		if(app.ClickOnModule !== 'module3') {
		window.location="?id="+app.SelecteM+"/"+app.SelecteM+"s"+index+"p1";
		}
		else
		{
			if(index<=2)
			{
				window.location="?id="+app.SelecteM+"/"+app.SelecteM+"s"+index+"p1";
			}
			else if(index == 3)
			{
			url ="m3s2p2.php";
			var width = $(window).width()-25 ; 
				var height = $(window).height()-25; 
			newwindow=window.open(url,'DellHealth','height='+height+',width='+width+',scrollbars=yes');
			newwindow.focus();
			}
			else
			{
				iindex= index -1;
			window.location="?id="+app.SelecteM+"/"+app.SelecteM+"s"+iindex+"p1";
			}
		}
	  }
    });

   
	$(".btnss").hover(function(e){
      var index = $(this).index();
	  var MD_no=$(this).closest('.panel-collapse').attr('m_no');
	  var Survey_no=$(this).attr('module');
		if(MD_no !=undefined)
		{
			var tmp=MD_no.replace('module','m');
			app.SelecteM=tmp;

		}
	  
	  else if(MD_no ==undefined)
	  {
		app.SelecteM=Survey_no;
	  }
	     app.SDataPopulate(index);
    });

  },
  herf:function(v){
     window.location=v;
  },
  Alert:function(txt){
            $('.alerts').modal({
                    show: 'false'
              }); 
          $('.alerts h3').html(txt);

  },
  Anim:function(){
     var wow = new WOW(
          {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       80,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
              // the callback is fired every time an animation is started
              // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
          }
        );
        wow.init();
  },
	preLoader:function(){
		setTimeout(function(){
          $('body').addClass('loaded');
          $('h1').css('color','#222222');
        }, 100);

	},
  WordC:function(list,id){
  //console.log(JSON.stringify(list));

       $("#"+id).jQCloud(list,{
        autoResize: true,
         colors: "#ffffff",
         delay: 1
       
      });
  },
  setModuleNo:function()
  {
	if(app.ClickOnModule == 'module1')
	{
		app.SelecteM='m1';
	}	
	if(app.ClickOnModule == 'module2'){
		app.SelecteM='m2';
	}
	if(app.ClickOnModule == 'module3'){
		app.SelecteM='m3';
	}
	if(app.ClickOnModule == 'module4'){
	app.SelecteM='m4';
	}
	if(app.ClickOnModule == 'module5') {
		app.SelecteM='m5';
	}
  },
  Encrypt:function(sText)
  {
	var retText=CryptoJS.AES.encrypt(sText, "Secret Passphrase");
	return retText;
  },
  Decrypt:function(sText)
  {
	var decrypted = CryptoJS.AES.decrypt(sText, "Secret Passphrase");
	return decrypted.toString(CryptoJS.enc.Utf8); 
  },
  GetallResponse1: function(Module,Section,Type){
	//alert(page);
	if(Type!=undefined)
	{
		var datas='';
		$.ajax({
			url: 'GetResponse.php',
			data: {ModuleName: Module,SectionName:Section,action:'Response1',userID:app.Decrypt(app.LoginEmail)},
			type: 'POST',
			dataType: "json",
			 async: false,
			success: function (result) {
				datas=result;
			}
		});
		return datas;
	}
	else{
		$.ajax({
			url: 'GetResponse.php',
			data: {ModuleName: Module,SectionName:Section,action:'Response1',userID:app.Decrypt(app.LoginEmail)},
			type: 'POST',
			dataType: "json",
			success: function (result) {
				app.Response1(result);
				app.Response2(result);				
			}
		});
	}
  },
  SaveJson: function(Json){
	$.ajax({
			url: 'SaveJSON.php',
			data: {JsonData: Json+',',action:'SaveData'},
			type: 'POST',
			dataType: "json",
			success: function (result) {				
			}
		});
  },
  
  DeleteJsonData: function(){
	$.ajax({
			url: 'SaveJSON.php',
			data: {action:'DeleteData'},
			type: 'GET',
			dataType: "json",
			success: function (result) {
					
			}
		});
  },
  GetJsonData: function(Json){
	$.ajax({
			url: 'SaveJSON.php',
			data: {action:'GetData'},
			type: 'GET',
			dataType: "json",
			success: function (result) {
			if(result.length>0)
			{
				var URL="https://stt.adaptive-datamatics.com/item_data/";
				var Token='b352c35bc1773f4f2127aeebf2ebb7681cfeaa46';
				app.sendItem(JSON.stringify(result), URL, Token).done(function (results) {
					app.DeleteJsonData();
				});
			}				
			}
		});
  },
  sendItem:function(jsonString, serverURL, accessToken) {
    return $.ajax({
        type: "POST",
        url: serverURL,
        headers: {"Authorization": "Token " + accessToken},
        dataType: 'json',
		contentType: 'application/json; charset=utf-8',
        data: jsonString,
        error: function (xhr, textStatus, errorThrown) {
            // I have alerts here, but you can remove the alerts and process the result below
            //alert(xhr.responseText);
            alert(textStatus);
            //alert(errorThrown);
        }
    });
},
  shuffle: function (o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
}

var regex = /\s+/gi;
$(document).ready(function(){
//document.getElementsByTagName("body")[0].oncontextmenu = function(e){ e.preventDefault();}
      $('input').bind("cut copy paste",function(e) {
          e.preventDefault();
      });
        $('.limit-input')
         .unbind('keyup change input paste')
         .bind('keyup change input paste',function(e){
              var $this = $(this);
              var val = $this.val().trim().replace(regex, ' ').split(' ').length;
              if(val<31){
                  e.preventDefault();
              }else{
                $(this).attr("maxlength",$this.val().length);
              }
          });
         $('.limit-input1')
         .unbind('keyup change input paste')
         .bind('keyup change input paste',function(e){
              var $this = $(this);
              var val = $this.val().trim().replace(regex, ' ').split(' ').length;
            //  console.log(val)
              if(val<31){
                  e.preventDefault();
              }else{
                $(this).attr("maxlength",$this.val().length);
              }
          });
    });


app.scroll= function(id,modal){
      $('html, body').animate({
          scrollTop: $('#'+id).offset().top
        }, 1000);

        $('#'+modal).modal({show: 'false'});
        $("body").css({"padding-right":"0px"});
        $("body").css("overflow",'visible');
        $(".modal-backdrop").hide();
}

app.topScroll=function(id){
    $('html, body').animate({
          scrollTop: $('.'+id).offset().top
        }, 1000);
}

app.qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

/*----- Start:: create Response carousel from DB  -------*/
app.Response1 = function(response){
	//debugger;
	//alert(app.SelecteM);
		//app.shuffle(response.Response1);
        var loc = $("#response1Text").val();
		
		if(loc!=undefined)
		{
		
		var section =  's'+app.qs["id"].split('s').pop().split('p').shift();
       // var section =  's'+app.qs["id"].split('s').pop().split('p').shift();		
      if (loc && $(response)[0].tagName!=undefined) {
		if($(response)[0].tagName.toLowerCase()=='button' || $(response).text().toLowerCase().trim()=='submit')
		{
			response=app.GetallResponse1(app.SelecteM,section,'Response1');
		}
		loc=loc.replace(/'/g,"&#39;").replace(/"/g,"&#34;");
        app.MData[app.SelecteM].sections[section]['response1'] = loc;
        var data = JSON.stringify(app.MData);
        var loc_1 = {email:app.Decrypt(app.LoginEmail),MData:data};
        app.DataSave(loc_1);
		$('.GoBackResponse').hide();
		if(response.Response1== undefined)
		{
			var temp1 = {};
			temp1.Response1 = new Array();
			temp1.Response1.push({
				"Rtext" : loc,
				"name"  : app.Decrypt(app.LoginName),
				"Org"  : app.Decrypt(app.organization),
				"PPRole"  : app.Decrypt(app.role),
			});
			response.Response1=temp1.Response1;
		}
		else{
			response.Response1.unshift({Rtext:loc, name:app.Decrypt(app.LoginName), Org: app.Decrypt(app.organization), PPRole:app.Decrypt(app.role)});
		}
      }else{	  	
        loc =app.MData[app.SelecteM].sections[section]['response1'];

		if(loc!='')
		{
			if(loc!="&#x201C;Student hasn&#39;t worked in a clinical environment&#x201D;")
			{
				$('.GoBackResponse').hide();
				if(response.Response1== undefined)
				{
					var temp1 = {};
					temp1.Response1 = new Array();
					temp1.Response1.push({
						"Rtext" : loc,
						"name"  : app.Decrypt(app.LoginName),
						"Org"  : app.Decrypt(app.organization),
						"PPRole"  : app.Decrypt(app.role),						
					});
					response.Response1=temp1.Response1;
				}
				else{
					response.Response1.unshift({Rtext:loc, name:app.Decrypt(app.LoginName), Org: app.Decrypt(app.organization), PPRole:app.Decrypt(app.role)});
				}
			}
		}
		
      }
      if (loc == "" && $(response)[0].tagName!=undefined) {
		 if ($(response)[0].tagName!=undefined) {
			alert("Please write the response.")
		}
       }else{
	   var l = response.Response1.length;
	   if(l>18)
	   {
	   l = 18;
	   }
         app.addOpt('myCarousel1',l);
        $(".act1").hide();
        $(".carouselC1").css({"visibility":"visible","height":"auto"});
         var items="";
         var t =0;
          var sizeC = Math.ceil(response.Response1.length/3); 
          if(sizeC > 6)
          {
            sizeC=6;
          }
        for (var i = 1; i < sizeC+1; i++) {
            var f = "";
            if(i == 1){
              f = "active";
            }else{
              f = "";
            }
           items += '<div class="item '+f+'"><div class="row">';
             for (var j = 1; j < 4; j++) {
				if(response.Response1[t]!= undefined){
					var T0 = response.Response1[t]["Rtext"];
					var N0 = response.Response1[t]["name"];
					console.log(T0)
					
                    items += '<div class="col-sm-4"><div class="well text-left small"><div class="iHeight"><span>';
                    items += T0;
                    items += '</span></div><a href="#" onclick="app.pup(this);">Read more<br></a><br><span>';
                    items += '<i class="fa fa-user-circle fa-3x" aria-hidden="true"></i> ';
                    items += '<span class="text-uppercase" style="color:#000;"> '+N0+'</span>';
                    items += '</span><br>';
					//ORG Anchor tag creation
					items+='<a href="#" class="Org" onclick="app.sortByorg(';
					items+="'"+app.SelecteM+"','"+section+"','"+response.Response1[t]["Org"]+"','Response1'";
					items+=');">'+response.Response1[t]["Org"]+'</a><br>';
					//PPRole Anchor tag creation
					if(response.Response1[t]["PPRole"]!='PPRole')
					{
						items+='<a href="#" class="PPRole" onclick="app.sortByrole(';
						items+="'"+app.SelecteM+"','"+section+"','"+response.Response1[t]["PPRole"]+"','Response1'";
						items+=');">'+response.Response1[t]["PPRole"]+'</a><br>';
					}
                    items += '</div></div>';
					t++;
                }
             }
           items += '</div></div>';
        } 
		$(".carouselC1 .additem").html(items);
        //$(".carouselC1 .additem").append(items);
        app.showRM();
      }
	}
		
   }

   
 app.addOpt=function(id,len){
	var sizeC = Math.ceil(len/3); 
	if (sizeC>1) {
		var circleList='<li data-target="#'+id+'" data-slide-to="0" class="active"></li>';
		for (var i = 1; i <sizeC; i++) {
		circleList+='<li data-target="#'+id+'" data-slide-to="'+i+'"></li>';
		}
		$('#'+id+' .carousel-indicators').html(circleList);
	}else{
		$('#'+id+' .left').hide();
		$('#'+id+' .right').hide();
	}
}


app.Response2 = function(response){
	//if(response.Response2.length>0)
	//{	
      var loc = $("#response2Text").val();
	  if(loc!=undefined)
	  {
      var section =  's'+app.qs["id"].split('s').pop().split('p').shift();
      if (loc && $(response)[0].tagName!=undefined) {
		if($(response)[0].tagName.toLowerCase()=='button' || $(response).text().toLowerCase().trim()=='submit')
		{
			response=app.GetallResponse1(app.SelecteM,section,'Response2');
		}
		loc=loc.replace(/'/g,"&#39;").replace(/"/g,"&#34;");
        app.MData[app.SelecteM].sections[section]['response2'] = loc;
        var data = JSON.stringify(app.MData);
        var loc_1 = {email:app.Decrypt(app.LoginEmail),MData:data};
        app.DataSave(loc_1);
        if(response.Response2== undefined)
		{
			var temp1 = {};
			temp1.Response2 = new Array();
			temp1.Response2.push({
				"Rtext" : loc,
				"name"  : app.Decrypt(app.LoginName),
				"Org"  : app.Decrypt(app.organization),
				"PPRole"  : app.Decrypt(app.role),				
			});
			response.Response2=temp1.Response2;
		}
		else{
			response.Response2.unshift({Rtext:loc, name:app.Decrypt(app.LoginName), Org: app.Decrypt(app.organization), PPRole:app.Decrypt(app.role)});
		}
      }else{
        loc =app.MData[app.SelecteM].sections[section]['response2'];
		if(loc!='')
		{
			if(response.Response2== undefined)
			{
				var temp1 = {};
				temp1.Response2 = new Array();
				temp1.Response2.push({
					"Rtext" : loc,
					"name"  : app.Decrypt(app.LoginName),
					"Org"  : app.Decrypt(app.organization),
					"PPRole"  : app.Decrypt(app.role),					
				});
				response.Response2=temp1.Response2;
			}
			else{
				response.Response2.unshift({Rtext:loc, name:app.Decrypt(app.LoginName), Org: app.Decrypt(app.organization), PPRole:app.Decrypt(app.role)});
			}
		}
	  }
      if (loc == "") {
		if($(response)[0].tagName!=undefined)
		{
			alert("Please write the response.");
		}
       }else{
	   	     var len = response.Response2.length;
			if(len>18)
			{
			 len = 18;
			}
			
         app.addOpt('myCarousel2',len);
        $(".act2").hide();
        $(".carouselC").css({"visibility":"visible","height":"auto"});
         var items="";
         var t =0;
          var sizeC = Math.ceil(response.Response2.length/3); 
		  if(sizeC > 6)
          {
            sizeC=6;
          }
		  
        for (var i = 1; i < sizeC+1; i++) {
            var f = "";
            if(i == 1){
              f = "active";
            }else{
              f = "";
            }
           items += '<div class="item '+f+'"><div class="row">';
             for (var j = 1; j < 4; j++) {
				if(response.Response2[t]!= undefined){
					var T0 = response.Response2[t]["Rtext"];
					var N0 = response.Response2[t]["name"];					
                    console.log(t)
                    items += '<div class="col-sm-4"><div class="well text-left small"><div class="iHeight"><span>';
                    items += T0;
                    items += '</span></div><a href="#" onclick="app.pup(this);">Read more<br></a><br><span>';
                    items += '<i class="fa fa-user-circle fa-3x" aria-hidden="true"></i> ';
                    items += '<span class="text-uppercase" style="color:#000;"> '+N0+'</span>';
                     items += '</span><br>';
					//ORG Anchor tag creation
					items+='<a href="#" class="Org" onclick="app.sortByorg(';
					items+="'"+app.SelecteM+"','"+section+"','"+response.Response2[t]["Org"]+"','Response2'";
					items+=');">'+response.Response2[t]["Org"]+'</a><br>';
					//PPRole Anchor tag creation
					if(response.Response2[t]["PPRole"]!='PPRole')
					{
						items+='<a href="#" class="PPRole" onclick="app.sortByrole(';
						items+="'"+app.SelecteM+"','"+section+"','"+response.Response2[t]["PPRole"]+"','Response2'";
						items+=');">'+response.Response2[t]["PPRole"]+'</a><br>';
					}
                    items += '</div></div>';
					t++;
                }
             }
           items += '</div></div>';
        } 
        //$(".carouselC .additem").append(items);
		$(".carouselC .additem").html(items);
        app.showRM();
      }
   }
}
   
 /*----- End:: create Response carousel from DB  -------*/  
 
 /*----- Start:: Skip Response  -------*/ 
app.SkipResponse = function(){
        var section =  's'+app.qs["id"].split('s').pop().split('p').shift();		
		response=app.GetallResponse1(app.SelecteM,section,'Response1');
		if(response.Response1== undefined)
		{
        alert("Please write the response.")
       }else{
		/*--- save Dummy Response--*/
		app.MData[app.SelecteM].sections[section]['response1'] = "&#x201C;Student hasn&#39;t worked in a clinical environment&#x201D;";
        var data = JSON.stringify(app.MData);
        var loc_1 = {email:app.Decrypt(app.LoginEmail),MData:data};
        app.DataSave(loc_1);
	   var l = response.Response1.length;
	   if(l>18)
	   {
	   l = 18;
	   }
        // addOpt1('myCarousel2',l);
		app.addOpt('myCarousel1',l);
        /* //$(".act1").hide();
        $("#CarouselPopup .carouselC1").css({"visibility":"visible","height":"auto"}); */
		$(".act1").hide();
        $(".carouselC1").css({"visibility":"visible","height":"auto"});
         var items="";
         var t =0;
		 var sizeC = Math.ceil(response.Response1.length/3); 
          if(sizeC > 6)
          {
            sizeC=6;
          }          
        for (var i = 1; i < sizeC+1; i++) {
            var f = "";
            if(i == 1){
              f = "active";
            }else{
              f = "";
            }
           items += '<div class="item '+f+'"><div class="row">';
             for (var j = 1; j < 4; j++) {
				if(response.Response1[t]!= undefined){
					var T0 = response.Response1[t]["Rtext"];
					var N0 = response.Response1[t]["name"];
					console.log(T0)
					//t++;
                    items += '<div class="col-sm-4"><div class="well text-left small"><div class="iHeight"><span>';
                    items += T0;
                    items += '</span></div><a href="#" onclick="app.pup(this);">Read more<br></a><br><span>';
                    items += '<i class="fa fa-user-circle fa-3x" aria-hidden="true"></i> ';
                    items += '<span class="text-uppercase" style="color:#000;"> '+N0+'</span>';
					items += '</span><br>';
					//ORG Anchor tag creation
					items+='<a href="#" class="Org" onclick="app.sortByorg(';
					items+="'"+app.SelecteM+"','"+section+"','"+response.Response1[t]["Org"]+"','Response1'";
					items+=');">'+response.Response1[t]["Org"]+'</a><br>';
					//PPRole Anchor tag creation
					items+='<a href="#" class="PPRole" onclick="app.sortByrole(';
					items+="'"+app.SelecteM+"','"+section+"','"+response.Response1[t]["PPRole"]+"','Response1'";
					items+=');">'+response.Response1[t]["PPRole"]+'</a><br>';
                    items += '</div></div>';
					t++;
                }
             }
           items += '</div></div>';
        } 
		//$(".carouselC1 .additem").append(items);
		$(".carouselC1 .additem").html(items);
        app.showRM();
		//$('#CarouselPopup').modal({show: 'false'});
      }
	
   }
   /*----- End:: Skip Response -------*/ 
   
   /*----- Start:: go back and Response  -------*/ 
   
   app.GoBackResponse = function(){
		$(".act1").show();
        $(".carouselC1").css({"visibility":"hidden","height":"0px"});	
   }
   /*----- End:: go back and Response  -------*/ 

 /* GET Poll */
  app.Getpoll= function(Module,Section,Type){
		//alert('Hi');
	if(Type!=undefined)
	{
		var datas='';
		$.ajax({
			url: 'GetResponse.php',
			data: {ModuleName: Module,SectionName:Section,action:'poll',userID:app.Decrypt(app.LoginEmail)},
			type: 'POST',
			dataType: "json",
			 async: false,
			success: function (result) {
				datas=result;
			}
		});
		return datas;
	}
	else{
		$.ajax({
			url: 'GetResponse.php',
			data: {ModuleName: Module,SectionName:Section,action:'poll',userID:app.Decrypt(app.LoginEmail)},
			type: 'POST',
			dataType: "json",
			success: function (result) {
				app.Response3(result);			
			}
		});
	}
  }

/* end GET Poll */



/* Save for Poll Module 6 section 4*/
app.Response3 = function(response){
	//if(response.Response3.length>0)
	//{	
	 // var loc = $("#Response3Text").val();  
	  var loc = $('input[name=response3Text]');
	  if(loc!=undefined)
	  { 
      var section =  's'+app.qs["id"].split('s').pop().split('p').shift();
	  loc = $('input[name=response3Text]:checked').val();
      if (loc && $(response)[0].tagName!=undefined) {
		//if($(response)[0].tagName.toLowerCase()=='button' || $(response).text().toLowerCase().trim()=='submit')
		if($(response).attr('name')=='response3Text')
		{ 
		//alert('aaa2');
			response=app.Getpoll(app.SelecteM,section,'poll');
		}
       	loc=loc.replace(/'/g,"&#39;").replace(/"/g,"&#34;");
		
        app.MData[app.SelecteM].sections[section]['poll'] = loc; //save for POLL
        var data = JSON.stringify(app.MData);
        var loc_1 = {email:app.Decrypt(app.LoginEmail),MData:data};
        app.DataSave(loc_1);
		
       if(response.poll==undefined)
		{
			var temp1 = {};
			temp1.poll = new Array();
			temp1.poll.push({
				"Polltext" : loc,
				});
			response.poll=temp1.poll;
		}
		else{
			response.poll.unshift({Polltext:loc});
		}
      }else{
        loc =app.MData[app.SelecteM].sections[section]['poll'];
		if(loc!='')
		{
			if(loc!="&#x201C;Student hasn't worked in a clinical environment&#x201D;")
			{
				if(response.poll==undefined)
				{
					var temp1 = {};
					temp1.poll = new Array();
					temp1.poll.push({
						"Polltext" : loc,
								
					});
					response.poll=temp1.poll;
				}
				else{
					response.poll.unshift({Polltext:loc});
				}
			}
		}
		
      }
      if (loc == "" && $(response)[0].tagName!=undefined) {
		 if ($(response)[0].tagName!=undefined) {
			alert("Please write the response.")
		}
       }else{
	  
        //alert('al22');
        $(".act2").hide();
        $(".carouselC").css({"display":"block","height":"auto"});
		
         var items="";
         var t =0;
          var sizeC = Math.ceil(response.poll.length); 
		  //alert(sizeC);
			 // for section 4 start//
		  if(section=='s4') {
			var countYes=0;
			var countNo=0;
		  $.each(response.poll,function(i,v){
			if(v.Polltext=='yes')
			{
				countYes++
			}
			if(v.Polltext=='no')
			{
				countNo++;
			}
		  });
		 // $(".carouselC .well .Yes").html('Yes: '+countYes);
		 var countall=countYes+countNo;
		// var countYes1=Math.round(countYes/countall*100);
		 //var countNo1=Math.round(countNo/countall*100);
		 var countYes1=(countYes/countall*100).toFixed(1);
		 var countNo1=(countNo/countall*100).toFixed(1);
		 
	    $(".carouselC .well .Yes").html('<br/><div class="pollbox"><span class="left1">Yes</span> <div class="pbox1" style="width:'+countYes1+'%; max-width:80%;"> </div><span class="span1">'+countYes1+' %</span></div>');
		 
		 $(".carouselC .well .No").html('<br/><div class="pollbox"><span class="left1">No&nbsp;</span> <div class="pbox2" style="width:'+countNo1+'%; max-width:80%;"> </div><span class="span2">'+countNo1+' %</span></div>');
		 // $(".carouselC .well .No").html('No: '+countNo);
	}
	// for section 4 end//
	//  Module - 6 section 7 poll start result ///
	 if(section=='s7') {
			var count1=0;
			var count2=0;
			var count3=0;
			var count4=0;
			var count5=0;
		  $.each(response.poll,function(i,v){
			if(v.Polltext=='extremely likely')
			{
				count1++
			}
			if(v.Polltext=='likely')
			{
				count2++;
			}
			if(v.Polltext=='neutral')
			{
				count3++;
			}
			if(v.Polltext=='unlikely')
			{
				count4++;
			}
			if(v.Polltext=='extremely unlikely')
			{
				count5++;
			}
		  });
		 // $(".carouselC .well .Yes").html('Yes: '+countYes);
		 var countall=count1+count2+count3+count4+count5;
		 var countYes1=(count1/countall*100).toFixed(1);
		 var countYes2=(count2/countall*100).toFixed(1);
		 var countYes3=(count3/countall*100).toFixed(1);
		 var countYes4=(count4/countall*100).toFixed(1);
		 var countYes5=(count5/countall*100).toFixed(1);
		 
		 var count1w=countYes1/2;
		 var count2w=countYes2/2;
		 var count3w=countYes3/2;
		 var count4w=countYes4/2;
		 var count5w=countYes5/2;
		
		 
	    $(".carouselC .well .count1").html('<br/><div class="pollbox"><span class="left1">extremely likely</span> <div class="pbox1" style="width:'+count1w+'%; max-width:40%;"> </div><span class="span1 sp1">'+countYes1+' %</span></div>');
		 
	    $(".carouselC .well .count2").html('<div class="pollbox"><span class="left1">likely</span> <div class="pbox1" style="width:'+count2w+'%; max-width:40%;"> </div><span class="span1 sp2">'+countYes2+' %</span></div>');
		
		$(".carouselC .well .count3").html('<div class="pollbox"><span class="left1">neutral</span> <div class="pbox1" style="width:'+count3w+'%; max-width:40%;"> </div><span class="span1 sp3">'+countYes3+' %</span></div>');
		
		$(".carouselC .well .count4").html('<div class="pollbox"><span class="left1">unlikely</span> <div class="pbox1" style="width:'+count4w+'%; max-width:40%;"> </div><span class="span1 sp4">'+countYes4+' %</span></div>');
		
		$(".carouselC .well .count5").html('<div class="pollbox"><span class="left1">extremely unlikely</span> <div class="pbox1" style="width:'+count5w+'%; max-width:40%;"> </div><span class="span1 sp5">'+countYes5+' %</span></div>');
	}
	//////////////////////	
	//  Module - 7 section 3 poll start result ///
	 if(section=='s3') {
			var count1=0;
			var count2=0;
			var count3=0;
			var count4=0;
		  $.each(response.poll,function(i,v){
			if(v.Polltext=='60 seconds')
			{
				count1++
			}
			if(v.Polltext=='2 minutes or less')
			{
				count2++;
			}
			if(v.Polltext=='5 minutes')
			{
				count3++;
			}
			if(v.Polltext=='10 minutes or more')
			{
				count4++;
			}
		  });
		 // $(".carouselC .well .Yes").html('Yes: '+countYes);
		 var countall=count1+count2+count3+count4;
		 var countYes1=(count1/countall*100).toFixed(1);
		 var countYes2=(count2/countall*100).toFixed(1);
		 var countYes3=(count3/countall*100).toFixed(1);
		 var countYes4=(count4/countall*100).toFixed(1);
		 
		 var count1w=countYes1/2;
		 var count2w=countYes2/2;
		 var count3w=countYes3/2;
		 var count4w=countYes4/2;
		 
	    $(".carouselC .well .count1").html('<br/><div class="pollbox"><span class="left1">60 seconds</span> <div class="pbox1" style="width:'+count1w+'%; max-width:40%;"> </div><span class="span1 sp1">'+countYes1+' %</span></div>');
		 
	    $(".carouselC .well .count2").html('<div class="pollbox"><span class="left1">2 minutes or less</span> <div class="pbox1" style="width:'+count2w+'%; max-width:40%;"> </div><span class="span1 sp2">'+countYes2+' %</span></div>');
		
		$(".carouselC .well .count3").html('<div class="pollbox"><span class="left1">5 minutes</span> <div class="pbox1" style="width:'+count3w+'%; max-width:40%;"> </div><span class="span1 sp3">'+countYes3+' %</span></div>');
		
		$(".carouselC .well .count4").html('<div class="pollbox"><span class="left1">10 minutes or more</span> <div class="pbox1" style="width:'+count4w+'%; max-width:40%;"> </div><span class="span1 sp4">'+countYes4+' %</span></div>');

		$(".carouselC .well .count5").html('<f>A study<sup>13</sup> was done in Switzerland in which doctors were asked to allow their patients to speak uninterrupted after the initial greeting, &#x201C;What brings you to the clinic today?&#x201D; Patient responses were recorded and their interview times averaged. The mean of these (N = 335) was just 92 seconds and the median was 59 seconds. Only 2% of patients spoke for longer than 5 minutes, while nearly 80% finished within 2 minutes. Many clinicians fear that, uninterrupted, their entire day would be devoted to a few patient interviews. The reality is that it only takes a couple minutes, and the consultation will be more effective and lead to higher patient satisfaction.</f>');
	}
	///////end///////////////	
	}
   }
   }
/* save for poll end */

 
/*Start:: Read more Popup  for carousel */

app.pup= function(v){
  var loc =  $(v).parent().find('.iHeight').text();//$(".iHeight").eq(v-1).text();
   var name =  $(v).closest('.col-sm-4').find('.text-uppercase').text();//$(".iHeight").eq(v-1).next().next().next().text();
    $('#RdDialog .modal-content .modal-body').html(loc);
	if($(v).closest('#CarouselPopup').length==1)
	{
		$('#RdDialog .modal-dialog').css('marginTop','180px');
	}
    $('#RdDialog').modal({show: 'false'});
    $('#RdDialog .modal-content #name').html(name);
	$('#RdDialog .modal-content #Org').html($(v).closest('.col-sm-4').find('.Org').text());
	$('#RdDialog .modal-content #PPRole').html($(v).closest('.col-sm-4').find('.PPRole').text());
	
}   

/*End:: Read more Popup  for carousel */

app.sortByorg= function(Module,Section,Sort,resp){
		//alert('Hi');
		 $.ajax({
			url: 'GetResponse.php',
			data: {ModuleName: Module,SectionName:Section,action:'sortByorg',userID:app.Decrypt(app.LoginEmail),sortBy:Sort},
			type: 'POST',
			dataType: "json",
			success: function (result) {
				if(resp=='Response1')
				{
					app.Response1(result);
				}
				if(resp=='Response2')
				{
					app.Response2(result);
				}
			}
		}); 
  }
  app.sortByrole= function(Module,Section,Sort,resp){
		//alert('Hi');
		 $.ajax({
			url: 'GetResponse.php',
			data: {ModuleName: Module,SectionName:Section,action:'sortByPPRole',userID:app.Decrypt(app.LoginEmail),sortBy:Sort},
			type: 'POST',
			dataType: "json",
			success: function (result) {
				if(resp=='Response1')
				{
					app.Response1(result);
				}
				if(resp=='Response2')
				{
					app.Response2(result);
				}				
			}
		}); 
  }
app.LoadConfig= function(){
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for older browsers
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			app.XML=xmlhttp.responseXML;
		}
	};
	xmlhttp.open("GET", "Config/Header.xml", false);
	xmlhttp.send();
}
app.GetSurveyOutComeText= function(HoverText){
		var xPath='';
		if(app.MData.m1.status=='complete' && app.MData.m2.status=='complete' && app.MData.m3.status=='complete' && HoverText=='survay_m1')
		{
			xPath="//"+HoverText+"/complete";
		}
		else if(app.MData.m4.status=='complete' && app.MData.m5.status=='complete' && HoverText=='survay_m2')
		{
			xPath="//"+HoverText+"/complete";
		}
		else if(app.MData.m6.status=='complete' && app.MData.m7.status=='complete' && HoverText=='survay_m3')
		{
			xPath="//"+HoverText+"/complete";
		}
		else if(app.MData.m8.status=='complete' && app.MData.m9.status=='complete' && app.MData.m10.status=='complete' && HoverText=='survay_m4')
		{
			xPath="//"+HoverText+"/complete";
		}
		else{
			xPath="//"+HoverText+"/not_complete";
		}
			var nodes= app.XML.evaluate(xPath, app.XML, null, XPathResult.ANY_TYPE, null);
			var result = nodes.iterateNext();
			var O_cText=result.textContent;
			return O_cText;
}
app.ModuleTracking= function(Md_no){
	var loc1 = app.MData[Md_no];
     var loc01 = {'m1':[0,45],'m2':[0,45],'m3':[1, 10],'m4':[1, 10],'m5':[1, 30],'m6':[1, 10],'m7':[1, 30],'m8':[0, 45],'m9':[1, 05],'m10':[1, 00],'survey':[0, 10]}
	 $(".MSection .HR").html(loc01[Md_no][0]);
	 $(".MSection .MIN").html(loc01[Md_no][1]);
	 $(".MSection .lG2 .progress-bar").css({"width":loc1['complete']+"%"});
    $(".MSection .lG2 .mP").html(loc1['complete']+"%");
	$(".MSection .lG2 .ProgressText").text('Module Progress');
	 $(".MSection strong.outcm3").html("Module <span class='mn'>"+Md_no.replace('m','')+"</span> OUTCOMES");
	var xPath="//module_outcome/"+Md_no;
	var nodes= app.XML.evaluate(xPath, app.XML, null, XPathResult.ANY_TYPE, null);
	var result = nodes.iterateNext();
	var O_cText=result.textContent;
	$(".outc").show();
	$("._outm1 .clickS .text-center").html(O_cText);
	$("._outm1").css("display","block");
	
	
}
$(document).keydown(function(e){
    if(e.keyCode==123){
    return false;
   }
       e = e || window.event;//Get event
    if (e.ctrlKey) {
        var c = e.which || e.keyCode;//Get key code
        switch (c) {
            case 83://Block Ctrl+S
            case 87://Block Ctrl+W --Not work in Chrome
                e.preventDefault();     
                e.stopPropagation();
            break;
        }
    }
});









