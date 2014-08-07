var searchButton = document.getElementById("search");
var switchSearch = document.getElementById("switch");
var forMalayalam = document.getElementById('malayalam');
var forEnglish = document.getElementById('english');
var loadingSign = document.getElementById("loading");
var resultUl = document.getElementById("result");
searchButton.addEventListener('click', function(e){
    var target, searchWord, targeUrl;
    e.preventDefault();
    if (forMalayalam.value){
        target = 'en';
        targeUrl = forMalayalam.id;
        searchWord = forMalayalam.value;
    }else if(forEnglish.value){
        target = 'ml';
        targeUrl = forEnglish.id;
        searchWord = forEnglish.value;
    }else{
        return;
    }
    loadingSign.style.display = 'block';
    resultUl.style.display = 'none';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            loadingSign.style.display = 'none';
            resultUl.style.display = 'block';
            var decodedResp = JSON.parse(xmlhttp.responseText);
            var listLimit = 9;
            if (listLimit > decodedResp.length){
                listLimit = decodedResp.length;
            }
            var resultLi = '';
            for (i=0;i<listLimit;i++){
                resultLi += "<li>" + decodedResp[i] + "</li>";
            }
            if (listLimit == 9){
                resultLi += "<li><a target='_blank' href='http://www.vanmaram.com/"+targeUrl+"/"+searchWord+"'>കൂടുതല്‍ >></a></li>";
            }
            resultUl.innerHTML = resultLi;
        }
    };
    xmlhttp.open("GET","http://www.vanmaram.com/json_result.php?"+target+"="+searchWord,true);
    xmlhttp.send();
});
switchSearch.onchange = function(){
    if(switchSearch.checked){
        forMalayalam.value = "";
        forMalayalam.style.display = 'none';
        forEnglish.style.display = 'block';
    }else{
        forEnglish.value = "";
        forEnglish.style.display = 'none';
        forMalayalam.style.display = 'block';
    }
};
document.getElementById('english').onkeypress = function(e) {
    transliterateKey(e);
};