$('.submit').on('click',function () {
	$(this).attr('disabled', 'disabled');
	/*$(this).css('backgroundColor', '#ccc');*/
   /*获取第一行输入*/
    var arrOne = [];
    var arrTwo = [];
    var postDataA = '';
    var postDataB = '';
    var flag = false;
    /*输入框1*/
    var firstInputOne = $('.firstRowOne input');
    var secondInputOne = $('.secondRowOne input');
    var thirdInputOne = $('.thirdRowOne input');
    var fourthInputOne = $('.fourthRowOne input');
    var fifthInputOne = $('.fifthRowOne input');
    var sixthInputOne = $('.sixthRowOne input');
    var length = firstInputOne.length;
    getEachArr(firstInputOne,arrOne);
    if (flag) {
        return;
    }
    getEachArr(secondInputOne,arrOne);
    if (flag) {
        return;
    }
    getEachArr(thirdInputOne,arrOne);
    if (flag) {
        return;
    }
    getEachArr(fourthInputOne,arrOne);
    if (flag) {
        return;
    }
    getEachArr(fifthInputOne,arrOne);
    if (flag) {
        return;
    }
    getEachArr(sixthInputOne,arrOne);
    if (flag) {
        return;
    }
    /*输入框2*/
    var firstInputTwo = $('.firstRowTwo input');
    var secondInputTwo = $('.secondRowTwo input');
    var thirdInputTwo = $('.thirdRowTwo input');
    var fourthInputTwo = $('.fourthRowTwo input');
    var fifthInputTwo = $('.fifthRowTwo input');
    var sixthInputTwo = $('.sixthRowTwo input');
    getEachArr(firstInputTwo,arrTwo);
    if (flag) {
        return;
    }
    getEachArr(secondInputTwo,arrTwo);
    if (flag) {
        return;
    }
    getEachArr(thirdInputTwo,arrTwo);
    if (flag) {
        return;
    }
    getEachArr(fourthInputTwo,arrTwo);
    if (flag) {
        return;
    }
    getEachArr(fifthInputTwo,arrTwo);
    if (flag) {
        return;
    }
    getEachArr(sixthInputTwo,arrTwo);
    if (flag) {
        return;
    }
    postDataA = '[' + arrOne.join(',') + ']';
    postDataB = '[' + arrTwo.join(',') + ']';
    /*发送ajax请求*/
    $.ajax({
        url:commonIp+'/RobotReliabilityVerificationSystem/test1',
        data:{a:postDataA,b:postDataB},
        dataType:'json',
        type:'POST',
        async:false,
        success:function (data) {
        	var msg = data.MSG;
        	if (msg != 'success') {
        		alert(msg);
        		$('.submit').removeAttr('disabled');
        		return;
        	}
        	console.log(data)
            var tbList = data.t6List;
            var tbListTrDom = '.tbList tbody tr';
            renderTd(tbList,tbListTrDom);
            var jacobList = data.JacobList;
            var jacobListTrDom = '.jacobList tbody tr';
            renderTd(jacobList,jacobListTrDom);
            var posList = data.PosList;
            var posListTrDom = '.posList tbody tr';
            renderTd(posList,posListTrDom);
            var oriList = data.OriList;
            var oriListTrDom = '.oriList tbody tr';
            renderTd(oriList,oriListTrDom);
            $('.renderImg1').attr('src',commonIp+'/matlab/robot.png?t='+ Math.random());
            $('.renderImg2').attr('src',commonIp+'/matlab/jacob.png?t='+Math.random());
            $('.renderImg3').attr('src',commonIp+'/matlab/pos.png?t='+Math.random());
            $('.renderImg4').attr('src',commonIp+'/matlab/ori.png?t='+Math.random());
            $('.submit').removeAttr('disabled');
			/*$('.submit').css('backgroundColor', '#5ccdde');*/
        }
    });
    function renderTd (dataArr,tableTrDom) {
        for (var i = 0; i < dataArr.length; i++) {
            for (var j = 0; j < dataArr[i].length; j++) {
                var tdVal = Math.ceil(dataArr[i][j] * 1000)/1000;
                $(tableTrDom).eq(i).find('td').eq(j).html(tdVal);
            }
        }
    }
    function getEachArr (eachDom,arr) {
        var a = [];
        var b = '';
        for(var i=1;i<length;i++){
            var domVal = eachDom.eq(i).val();
            if (domVal == ''|| domVal == null) {
                alert('输入框不能为空');
                $('.submit').removeAttr('disabled');
                flag = true;
                break;
            }
            a.push(domVal);
        }
        b = '['+ a.join(',') + ']';
        arr.push(b);
    }

});
/*点击按钮清空输入框-fzy*/
$('.clear').on('click',function () {
	$("input[type='number']").val('');
})