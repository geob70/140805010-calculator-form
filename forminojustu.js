var chelsea = ['Hazard', 'Cesar Azpiliqeta', 'Andreas Christenten', 'Cesc Fabregas', 'Ngolo Kante', 'Alvaro Morata']
var newbox = document.getElementById('next');
var create = document.getElementById('box');
var sile = document.getElementById('opener');
create.addEventListener("keypress",function(word){
    word = create.value;
    if(word == 'Hazard'){
        newbox.style.display = 'block';
    }
});
sile.addEventListener("click",function () {
        console.log('ose');
        newbox.style.display = "block";
    
});


