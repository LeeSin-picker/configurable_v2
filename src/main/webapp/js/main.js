$('.submit').on('click',function () {
   /*获取第一行输入*/
    var arr = [];
    var postData = '';
    var flag = false;
    var firstInput = $('.firstRow input');
    var secondInput = $('.secondRow input');
    var thirdInput = $('.thirdRow input');
    var fourthInput = $('.fourthRow input');
    var fifthInput = $('.fifthRow input');
    var sixthInput = $('.sixthRow input');
    var length = firstInput.length;
    /*var firstArr = [];
    var secondArr = [];
    var thirdArr = [];
    var fourthArr = [];
    var fifthArr = [];
    var sixthArr = [];*/
    firstArr = getEachArr(firstInput);
    if (flag) {
        return;
    }
    secondArr = getEachArr(secondInput);
    if (flag) {
        return;
    }
    thirdArr = getEachArr(thirdInput);
    if (flag) {
        return;
    }
    fourthArr = getEachArr(fourthInput);
    if (flag) {
        return;
    }
    fifthArr = getEachArr(fifthInput);
    if (flag) {
        return;
    }
    sixthArr = getEachArr(sixthInput);
    if (flag) {
        return;
    }
    postData = '[' + arr.join(',') + ']';
    /*发送ajax请求*/
    $.ajax({
        url:'http://192.168.58.153:8080/RobotReliabilityVerificationSystem/test',
        data:{a:postData},
        dataType:'json',
        type:'POST',
        async:false,
        success:function (data) {
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
            $('.renderImg1').attr('src','http://192.168.58.153:8080/matlab/robot.png?t='+ Math.random());
            $('.renderImg2').attr('src','http://192.168.58.153:8080/matlab/jacob.png?t='+Math.random());
            $('.renderImg3').attr('src','http://192.168.58.153:8080/matlab/pos.png?t='+Math.random());
            $('.renderImg4').attr('src','http://192.168.58.153:8080/matlab/ori.png?t='+Math.random());
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
    function getEachArr (eachDom) {
        var a = [];
        var b = '';
        for(var i=0;i<length;i++){
            var domVal = eachDom.eq(i).val();
            console.log(domVal);
            if (domVal == ''|| domVal == null) {
                alert('输入框不能为空');
                flag = true;
                break;
            }
            a.push(domVal);
        }
        b = '['+ a.join(',') + ']';
        arr.push(b);
    }

});