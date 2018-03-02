var chelsea = ['Hazard', 'Cesar Azpiliqeta', 'Andreas Christenten', 'Cesc Fabregas', 'Ngolo Kante', 'Alvaro Morata']
var newbox = document.getElementById('box');

function neww(inp, arr) {
    /**
     * execute a function when someone writes into the text box
     */
    inp.addEventListener("box", function (e) {

        var a, b, c, val = this.value;
        for (var i = 0; i < arr.length; i++) {
            console.log('good');
            if (newbox.value == arr[i]) {
                a = document.createElement("text");
                a.setAttribute("class", "neww");
                this.parentNode.appendChild(a);

                b = document.createElement("DIV");
                // /*make the matching letters bold:*/
                // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                // b.innerHTML += arr[i].substr(val.length);
                // /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            }
        }

        a.appendChild(b);
    });

    neww(document.getElementById("box"), chelsea);


}