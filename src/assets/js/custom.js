import $ from 'jquery'; 

$(document).ready(function(){

	// $('body').click(function() {
	// 	console.log("in the datta")
	// 	$(".three_header").addClass("hide");
 //    });

	$('.filter_bhk').click(function(){
		$(".filter_bhk").removeClass('selected');
		$(".filter_bhk").css('background-color','#fff');
		$(".filter_bhk").css('color','#000');
		/*if($(this).hasClass('selected')){
			$(this).removeClass('selected');
			$(this).css('background-color','#fff');
			$(this).css('color','#000');
		}
		else {
		}*/
		$(this).addClass('selected');
		$(this).css('background-color','#56A366');
		$(this).css('color','#fff');

		// const listItems = $('.filter_ul li');
		// var bhk = [];
		// for (let i = 0; i < listItems.length; i++) {
		//     if($(listItems[i]).children('dt').hasClass('selected')){
		// 		var bhk_val= $(listItems[i]).children('dt').html();
		// 		console.log(bhk_val);
		// 		bhk.push(bhk_val);
		// 	}

		// }
		// console.log(bhk);

});

	// $("body").on("click",function(){
	// 	$(".three_header").css("display","none");
	// });


	$(".three_bar").click(function(){
		if($(".three_header").css('display')==("none")){
			
			$(".three_header").show(10);
		}else{
			$(".three_header").hide(10);
		}
	});

	
    if (window.matchMedia('(max-width: 425px)').matches) {
        $(".media_filter_block").hide();
    } else {
        $(".media_filter_block").show();
    }

    $(".temp_filter").click(function(){

    	if($(".media_filter_block").css('display')==("none")){
			
			$(".media_filter_block").show(400);
			$(".temp_filter").hide(100);
		}
    });

    $(".close_filter").click(function(){

    	if($(".media_filter_block").css('display')==("block")){
			
			$(".media_filter_block").hide(400);
			$(".temp_filter").show(100);
		}

    });

    $(".three_bar").click(function(){

    	if($(".media_filter_block").css('display')==("block")){
			
			$(".media_filter_block").hide(200);
		}

    });


});