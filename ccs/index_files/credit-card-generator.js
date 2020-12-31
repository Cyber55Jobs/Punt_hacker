function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  $("#tabb").val(tabName);
}
  
    //FOR CHANGING COUNTRIES
docReady(function() {
    $("#cc-brand").change(function() {
        var val = $(this).val();
        $.ajax({
            url: base_url+'frontend/creditMaker',
            method:'post',
            data:{cbrand:true,brand:val},
            dataType:'json',
            success:function(dat)
            {
                $("#cc-country").html(dat['countries']);
            }
        });
    });

    //FOR CHANGING BANKS
    $("#cc-country").change(function() {
        var val = $(this).val();
        $.ajax({
            url: base_url+'frontend/creditMaker',
            method:'post',
            data:{bcountry:true,country:val},
            dataType:'json',
            success:function(dat)
            {
                $("#cc-bank").html(dat['banks']);
            }
        });
    });
});

  function stopActions()
        {
            $("#calcRatio").removeClass("active");
        }

        function allowActions()
        {
            $("#calcRatio").addClass("active");
        }
    docReady(function() {
      
        
         $("#calcRatio").click(function(){

            var tabact=$("#tabb").val();

            if (tabact=='advance') {
                var brand = $("#cc-brand").val();
                var country = $("#cc-country").val();
                var bank = $("#cc-bank").val();
                var cvv = $("#cvv").val();
                var month = $("#cc-date").val();
                var year = $("#cc-year").val();
                var range = $("#cc-range").val();
                var quantity = $("#cc-amount").val();

                if($("input[name=sumbullet]").is(':checked')){
                    var pin = "yes";
                }else{
                    var pin = "no";
                }

                var ajaxData={generate:true,labelss:labelss,brand:brand,country:country,bank:bank,cvv:cvv,month:month,year:year,range:range,quantity:quantity,pin:pin};

                

                if(!$(this).hasClass('active'))
                {
                    return false;
                }


                if ($("#cc-brand").val()=='' || $("#cc-country").val()=='' || $("#cc-bank").val()=='') 
                {
                    showModel("Error", "Pleasy Select All Fields");
                    return false;
                }
                if ($("#cvv").val()!='') 
                {
                    if($("#cvv").val().length != 3)
                {
                    showModel("Error", "CVV must be a 3 digit number");
                    return false;
                }
                
                }
                

                $("#loading").show();
                $("#ressultSec").show();
                stopActions();
                $("#resultsTable tbody").html("");
                var elemOff = $("#ressultSec").offset().top;
                elemOff = elemOff-100;
                $("html, body").animate({ scrollTop: elemOff }, 500);
               
                $.ajax({
                    url : base_url+"frontend/creditMaker",
                    data : ajaxData,
                    type:"post",
                    dataType:"json",
                    success: function(resp) {

                        if (typeof resp.error != 'undefined') {
                            showModel("Error", resp.error);
                            allowActions();
                            return false;
                        }
                        $("#resDiv").html(resp.cards);
                        $(".cardbrand").text(cardbrand+" :");
                        $(".cardnumber").text(cardnumber+" :");
                        $(".holdername").text(holdername+" :");
                        $(".holderbank").text(holderbank+" :");
                        $(".holderaddress").text(holderaddress+" :");
                        $(".holdercountry").text(holdercountry+" :");
                        $(".money").text(money+" :");
                        $(".cvvlabel").text(cvvlabel+" :");
                        $(".cardexpiry").text(cvvlabel+" :");
                        $("#ressultSec").show();
                        console.log(resp);
                        allowActions();
                        $("#loading").hide();
                    }
                });
            }
            else
            {
                generatebasic();
            }
        });
    });
function generatebasic(){
   
    var brand2 = $("#cc-brand2").val();
    var quantity = $("#cc-amount2").val();
    var month = $("#cc-date2").val();
    var year = $("#cc-year2").val();
    var cvv = $("#cvv2").val();
    var expiry = '';
    var html = '';
    var brandName = $("#cc-brand2 option:selected").text();
  for (var i = 0; i < quantity; i++) {
        
    

    if ($("#cvv2").val()!='') 
    {
        if($("#cvv2").val().length != 3)
    {
        showModel("Error", "CVV must be a 3 digit number");
        return false;
    }
    
    }

    if (brand2==1) {

          randomsOneVisaNumber(), randomsANameAndAddress();
          var a = [];
          monthRandomed < 10 && a.push("0"),
            a.push(monthRandomed + "/" + yearRandomed.toString()),
            (visaDigits = "" + visaDigits);
           var cardnum = visaDigits.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ")
            ;
            var name = nameRandomed + " " + secondNameRandomed;
            var cvc = Math.floor(900 * Math.random() + 100);
            var expiry = a;
            console.log(cardnum+'~'+name+'~'+cvc+'~'+expiry);

    }

    else if (brand2==2) 
    {
          randomsOneMasterCardNumber(), randomsANameAndAddress();
          var a = [];
          monthRandomed < 10 && a.push("0"),
            a.push(monthRandomed + "/" + yearRandomed.toString()),
            (masterCardDigits = "" + masterCardDigits);
            var cardnum = masterCardDigits.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
            var name = nameRandomed + " " + secondNameRandomed;
            var cvc = Math.floor(900 * Math.random() + 100);
            var expiry = a;
            console.log(cardnum+'~'+name+'~'+cvc+'~'+expiry);
    }
    else if (brand2==3) 
    {
               randomsOneAmericanExpressCardNumber(), randomsANameAndAddress();
              var a = [];
              monthRandomed < 10 && a.push("0"),
                a.push(monthRandomed + "/" + yearRandomed.toString()),
                (americanExpressDigits = "" + americanExpressDigits);
                var cardnum = americanExpressDigits.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
                var name = nameRandomed + " " + secondNameRandomed;
                var cvc = Math.floor(900 * Math.random() + 100);
                var expiry =  a;
                console.log(cardnum+'~'+name+'~'+cvc+'~'+expiry);
    }
    else if (brand2==4) 
    {
              randomsOneDiscoverCardNumber(), randomsANameAndAddress();
              var a = [];
              monthRandomed < 10 && a.push("0"),
                a.push(monthRandomed + "/" + yearRandomed.toString()),
                (discoverDigits = "" + discoverDigits);
                var cardnum = discoverDigits.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
                var name = nameRandomed + " " + secondNameRandomed;
                var cvc = Math.floor(900 * Math.random() + 100);
                var expiry = a;
                console.log(cardnum+'~'+name+'~'+cvc+'~'+expiry);
    }
    else if (brand2==5) 
    {
              randomsOneJcbCardNumber(), randomsANameAndAddress();
              var a = [];
              monthRandomed < 10 && a.push("0"),
                a.push(monthRandomed + "/" + yearRandomed.toString()),
                (jcbDigits = "" + jcbDigits);
                var cardnum = jcbDigits.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
                var name = nameRandomed + " " + secondNameRandomed;
                var cvc = Math.floor(900 * Math.random() + 100);
                var expiry = a;
    }
        var cnt = i+1;

    if (month == 'rand') {
        var month = randomNumber(1, 12);
    }
    if (year == 'rand') {
        var year = randomNumber(2021, 2030);
    }
    if (cvv != '') {
         cvc = cvv;
    }

    var expiry2 = month+"/"+year;
    var brandN = brandName.replace(' ','-');
    html+='<div class="col-sm-6 mt-3"><div class=card style="box-shadow:0 3px 6px #00000029"><div class=card-header style=background:#fff><div class="col-md-6"><h4>Card No. '+cnt+'</h4></div><div class="col-md-6" style="text-align:right"><span class="card-pay "style=margin-top:4%;background-image:url("'+base_url+'imgs/'+brandN.toUpperCase()+'.gif") title="'+brandName+'" ></span></div></div><div class=card-body><div class=col-sm-5 style=font-weight:bolder>'+cardbrand+' :</div><div class=col-sm-7>'+brandName+'</div><div class=col-sm-5 style=font-weight:bolder>'+cardnumber+' :</div><div class=col-sm-7>'+cardnum+'</div><div class=col-sm-5 style=font-weight:bolder>'+holdername+' :</div><div class=col-sm-7>'+name+'</div><div class=col-sm-5 style=font-weight:bolder>'+cvvlabel+' :</div><div class=col-sm-7>'+cvc+'</div><div class=col-sm-5 style=font-weight:bolder>'+cardexpiry+' :</div><div class=col-sm-7>'+expiry2+'</div></div></div></div>'; }
  
     $("#ressultSec").show();
     $("#resDiv").html(html);
       var elemOff = $("#ressultSec").offset().top;
                elemOff = elemOff-100;
                $("html, body").animate({ scrollTop: elemOff }, 500);
     allowActions();
     $("#loading").hide();

}
function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
} 