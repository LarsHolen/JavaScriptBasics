'use strict';

// Hjelpefunksjon som vist i pdf
function $(elementId)
{
    return document.getElementById(elementId);
}

// Oppgave 1
let btn =$("alertButton");
btn.addEventListener("click", AlertFunc);

function AlertFunc()
{ 
    alert("Hei, du laget en alert knapp!");
}




/* Lag en knapp som endrer både overskrift og tekst når en trykker
på en knapp*/
let btn2 = $("endreTekstBtn");
btn2.addEventListener("click", ChangeText);

function ChangeText()
{
    $("overskrift").innerText = "Overskrift endret";
    $("tekst").innerText = "Tekst endret";
}




/*Lag en knapp som endrer bilde ut ifra hva du klikker på*/
let imgBtn = $("endreBildeBtn");
imgBtn.addEventListener("click", EndreBilde);

// Hard coded bildebytting fra 1.jpg<->2.jpg
function EndreBilde()
{
    let i1 = $("bilde");
    let currentImgName = $("tekst").innerText = i1.getAttribute("src");
    if(currentImgName == "images/1.jpg")
    {
        i1.src = "images/2.jpg";
        return;
    } 
    if(currentImgName == "images/2.jpg")
    {
        i1.src = "images/1.jpg";
        return;
    }
}



/*Lag en gøy knapp som du har funnet selv*/
let goeyBtn = $("goeyBtn");
var goeyActive = false;
goeyBtn.addEventListener("click", GoeyFunc);


// Funksjon som skriver tekst bokstav for bokstav med delay på 200ms
async function GoeyFunc()
{
    goeyActive = true;
    let targetWord = "We can write one character pr 200ms";
    let counter = 0;
    let currentWord = "";
    let parag = $("goeyTekst");
    while (goeyActive)
    {
        currentWord += targetWord[counter];
        parag.innerText = currentWord;
        counter++;
        if(counter > targetWord.length-1) goeyActive = false;
        await Delay(200);
    }
}
// Delay funksjonen
const Delay = ms => new Promise(res => setTimeout(res,ms));



/*Skriv en «if else», «for» eller «while» hvor du målet antall DVDer
en person eier og hva det gir personen i status. (Typ, Om Vetle
har DVD > 50, så er han en ekte samler).
*/
let inputBtn = $("inputBtn");
inputBtn.addEventListener("click", TestInput);
function TestInput()
{
    let inputNumber = $("cdInput").value;
    $("inputOutput").innerText = "Du er en " + Collector(inputNumber);
}

function Collector(numberOfCds)
{
    let result = "";
    if(numberOfCds < 10) result = "Stusselig samler";
    if(numberOfCds >= 10) result = "Potensiale";
    if(numberOfCds >= 20) result = "Standard samler";
    if(numberOfCds > 50) result = "Ekte samler";
    return result;
}

//To player Tick tack toe (ingen AI/Computer player)

// Legger knappene i en 2d array
let gameButtons = new Array(3).fill(0).map(() => new Array(3).fill(0));
gameButtons[0][0] = $("gamebtn0_0");
gameButtons[1][0] = $("gamebtn1_0");
gameButtons[2][0] = $("gamebtn2_0");
gameButtons[0][1] = $("gamebtn0_1");
gameButtons[1][1] = $("gamebtn1_1");
gameButtons[2][1] = $("gamebtn2_1");
gameButtons[0][2] = $("gamebtn0_2");
gameButtons[1][2] = $("gamebtn1_2");
gameButtons[2][2] = $("gamebtn2_2");

// hvem sin tur er det?
var oTurn = true;
var startBtn = $("startBtn");
startBtn.addEventListener("click", StartGame);

// Starter spillet med å renske spillbrettet/2d arrayen og adder eventlisteners til knappene
function StartGame()
{
    for(let y = 0; y < 3; y++)
    {
        for(let x = 0; x < 3; x++)
        {   
            gameButtons[x][y].innerText = " ";
            gameButtons[x][y].addEventListener("click", ClickTickTackToe);
        }
    }   
    $("tur").innerText = "Det er O sin tur.";
}

// Funksjon som kjører når en klikker på en av spill knappene
function ClickTickTackToe(e)
{
    if(oTurn == true)
    {
        // Setter knapp tekst til rett markering
        e.target.innerText = "O";
        // fjerner eventlistener på den knappen, og kan da ikke velges flere ganger
        e.target.removeEventListener("click", ClickTickTackToe);
        $("tur").innerText = "Det er X sin tur.";
        oTurn = false;
    } else
    {
        e.target.innerText = "X";
        e.target.removeEventListener("click", ClickTickTackToe);
        $("tur").innerText = "Det er O sin tur.";
        oTurn = true;
    }
    // Tester om noen har vunnet/uavgjort
    TestForWin();
    
}

// funksjon som sjekker om noen har 3 på rad. Quick and dirty, burde nok ryddet litt her :P
function TestForWin()
{
    let won = false;
    for(let i = 0; i < 3; i++)
    {
        // Test for vertikale 3 like
        if(gameButtons[0][i].innerText == gameButtons[1][i].innerText && gameButtons[2][i].innerText == gameButtons[1][i].innerText )
        {
            if(gameButtons[0][i].innerText == "O" || gameButtons[0][i].innerText == "X")
            {
                $("tur").innerText = "Gratulerer " + gameButtons[2][i].innerText;
                StopGame();
                return;
            }
        }
        // Test for horisontale 3 like
        if(gameButtons[i][0].innerText == gameButtons[i][1].innerText && gameButtons[i][2].innerText == gameButtons[i][1].innerText )
        {
            if(gameButtons[i][0].innerText == "O" || gameButtons[i][0].innerText == "X")
            {
                $("tur").innerText = "Gratulerer " + gameButtons[i][0].innerText;
            StopGame();
            return;
            }
        }
    }
    // tester diagonal top venstre til bunn høyre
    if(gameButtons[1][1].innerText == gameButtons[0][0].innerText && gameButtons[1][1].innerText == gameButtons[2][2].innerText)
    {
        if(gameButtons[1][1].innerText == "O" || gameButtons[1][1].innerText == "X")
        {
            $("tur").innerText = "Gratulerer " + gameButtons[1][1].innerText;
            StopGame();
            return;
        }
        
    }
    // Tester diagonal top høyre til bunn venstre
    if(gameButtons[1][1].innerText == gameButtons[0][2].innerText && gameButtons[1][1].innerText == gameButtons[2][0].innerText)
    {
        if(gameButtons[1][1].innerText == "O" || gameButtons[1][1].innerText == "X")
        {
            $("tur").innerText = "Gratulerer " + gameButtons[1][1].innerText;
            StopGame();
            return;
        }
        
    }
    // Er det uavgjort?
    TestIfBoardFull();
}

// test som sjekker om bordet er fullt/det er uavgjort
function TestIfBoardFull()
{
    let hasASpot = false;
    for(let y = 0; y < 3; y++)
    {
        for(let x = 0; x < 3; x++)
        {   
            // Tester her om innerText på knappen er undefined eller tom, og dermed er ikke bordet fullt og spillet kan fortsette 
            if(!gameButtons[x][y].innerText || gameButtons[x][y].innerText.length === 0)
            {

                hasASpot = true;
                break;
            }
        }
    }
    // Stopper spillet om bordet er fullt
    if(!hasASpot)
    {
        $("tur").innerText = "Uavgjort ";
        StopGame();
    }
    
}

// Stopp spill funksjonen
function StopGame()
{
    for(let y = 0; y < 3; y++)
    {
        for(let x = 0; x < 3; x++)
        {   
            gameButtons[x][y].removeEventListener("click", ClickTickTackToe);
        }
    }
}


// Dag 2 Oppgaver
// Bruker samme knapp på Play/Pause
var playBtn = $("playBtn");
var downloadBtn = $("downloadBtn");
playBtn.addEventListener("click", PlaySound);
downloadBtn.addEventListener("click", DownloadSound);

var sound = new Audio("https://larsholen.com/bilder/Battle.MP3");
sound.addEventListener("ended", SoundEnded);

// Start avspilling og forandre knappen/eventene
function PlaySound(e)
{
    sound.play();
    e.target.innerText = "Pause";
    e.target.removeEventListener("click", PlaySound);
    e.target.addEventListener("click", PauseSound);
}
// Pause avspilling og forandre knappen/eventene
function PauseSound(e)
{
    sound.pause();
    e.target.innerText = "Play";
    e.target.removeEventListener("click", PauseSound);
    e.target.addEventListener("click", PlaySound);
}
// Når filen er ferdig avspilt, resett knapp eventer og tekst
function SoundEnded()
{
    // resetting the buttontext, in case it was "Pause"
    playBtn.innerText = "Play"; 
    playBtn.removeEventListener("click", PauseSound);
    playBtn.addEventListener("click", PlaySound);
}

// Nedlasting av lydfilen
function DownloadSound(e)
{
    // Hardcoded filenames
    DownloadURI("../mp3/Battle.MP3", "Battle.MP3");
}
function DownloadURI(url, name) 
{
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = name; 
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
    };
    xhr.open('GET', url);
    xhr.send();
}

// Skriv inn navn, og få en hilsen når du trykker enter med en variabel og teksten på en knapp
var inputName = $("nameInput");
var variableHilsen = 10;
inputName.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        $("hilsenP").innerText += "Hei og velkommen, " + e.target.value + ".  Her ett tall fra en variabel " + variableHilsen + " og her er innerText fra en knapp: " + playBtn.innerText;
        e.target.value = "";
    }
    
});

/* Endre bilde basert på if, se EndreBilde() funksjonen lengre oppe.
PS.  Bruker ikke "else" med vilje, der bruker jeg "return" for å gå ut av funksjonen.
if setninger inni if setninger inni if... Kan fort bli vanskeligere å lese.  Bruker derfor
heller "return" når deg går an og deler opp funksjonene. */

/*Good bad*/
var goodBtn = $("goodBtn");
var badBtn = $("badBtn");
var img = $("goodBadImage");

goodBtn.addEventListener("click", LoadGood);
badBtn.addEventListener("click", LoadBad);

function LoadGood()
{
    img.src = "https://i-viaplay-com.akamaized.net/viaplay-prod/297/988/1631268308-c556521ec55a9c61a361ad51b7ca1dfbdb43ef1d.jpg?width=400&height=600";
}
function LoadBad()
{
    img.src = "https://www.starwarsaddicted.it/wp-content/uploads/2020/04/Darth-Maul-Son-of-Dathomir-evidenza.jpg";
}








