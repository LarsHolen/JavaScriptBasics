

// Oppgave 1
let btn = document.getElementById("alertButton");
btn.addEventListener("click", AlertFunc);

function AlertFunc()
{ 
    alert("Hei, du laget en alert knapp!");
}

/* Lag en knapp som endrer både overskrift og tekst når en trykker
på en knapp*/

let btn2 = document.getElementById("endreTekstBtn");
btn2.addEventListener("click", ChangeText);

function ChangeText()
{
    document.getElementById("overskrift").innerText = "Overskrift endret";
    document.getElementById("tekst").innerText = "Tekst endret";
}

/*Lag en knapp som endrer bilde ut ifra hva du klikker på*/
let imgBtn = document.getElementById("endreBildeBtn");
imgBtn.addEventListener("click", EndreBilde);

function EndreBilde()
{
    let i1 = document.getElementById("bilde");
    let currentImgName = document.getElementById("tekst").innerText = i1.getAttribute("src");
    if(currentImgName == "images/1.jpg")
    {
        i1.src = "images/2.jpg";
        return;
    } 
    if(currentImgName == "images/2.jpg")
    {
        i1.src = "images/.jpg";
        return;
    }
}