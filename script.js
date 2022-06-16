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
        i1.src = "images/1.jpg";
        return;
    }
}

let goeyBtn = document.getElementById("goeyBtn");
var goeyActive = false;
goeyBtn.addEventListener("click", GoeyFunc);

async function GoeyFunc()
{
    goeyActive = true;
    let targetWord = "We can write one character pr 200ms";
    let counter = 0;
    let currentWord = "";
    let parag = document.getElementById("goeyTekst");
    while (goeyActive)
    {
        currentWord += targetWord[counter];
        parag.innerText = currentWord;
        counter++;
        if(counter > targetWord.length-1) goeyActive = false;
        await Delay(200);
    }
}

const Delay = ms => new Promise(res => setTimeout(res,ms));

/*Skriv en «if else», «for» eller «while» hvor du målet antall DVDer
en person eier og hva det gir personen i status. (Typ, Om Vetle
har DVD > 50, så er han en ekte samler).
*/
let inputBtn = document.getElementById("inputBtn");
inputBtn.addEventListener("click", TestInput);
function TestInput()
{
    let inputNumber = document.getElementById("cdInput").value;
    document.getElementById("inputOutput").innerText = "Du er en " + Collector(inputNumber);
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

//Tick tack toe
//var gameButtons = [
//    [document.getElementById("gamebtn0_0")],[document.getElementById("gamebtn1_0")],[document.getElementById("gamebtn2_0")],
//    [document.getElementById("gamebtn0_1")],[document.getElementById("gamebtn1_1")],[document.getElementById("gamebtn2_1")],
//    [document.getElementById("gamebtn0_2")],[document.getElementById("gamebtn1_2")],[document.getElementById("gamebtn2_2")]
//];

let gameButtons = new Array(3).fill(0).map(() => new Array(3).fill(0));
gameButtons[0][0] = document.getElementById("gamebtn0_0");
gameButtons[1][0] = document.getElementById("gamebtn1_0");
gameButtons[2][0] = document.getElementById("gamebtn2_0");
gameButtons[0][1] = document.getElementById("gamebtn0_1");
gameButtons[1][1] = document.getElementById("gamebtn1_1");
gameButtons[2][1] = document.getElementById("gamebtn2_1");
gameButtons[0][2] = document.getElementById("gamebtn0_2");
gameButtons[1][2] = document.getElementById("gamebtn1_2");
gameButtons[2][2] = document.getElementById("gamebtn2_2");

// hvem sin tur er det?
var oTurn = true;
var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", StartGame);
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
    document.getElementById("tur").innerText = "Det er O sin tur.";
}

async function ClickTickTackToe(e)
{
    if(oTurn == true)
    {
        e.target.innerText = "O";
        e.target.removeEventListener("click", ClickTickTackToe);
        document.getElementById("tur").innerText = "Det er X sin tur.";
        oTurn = false;
    } else
    {
        e.target.innerText = "X";
        e.target.removeEventListener("click", ClickTickTackToe);
        document.getElementById("tur").innerText = "Det er O sin tur.";
        oTurn = true;
    }
    await Delay(200);
    TestForWin();
    
}
function TestForWin()
{
    let won = false;
    for(let i = 0; i < 3; i++)
    {
        if(gameButtons[0][i].innerText == gameButtons[1][i].innerText && gameButtons[2][i].innerText == gameButtons[1][i].innerText )
        {
            if(gameButtons[0][i].innerText == "O" || gameButtons[0][i].innerText == "X")
            {
                document.getElementById("tur").innerText = "Gratulerer " + gameButtons[2][i].innerText;
                StopGame();
                return;
            }
        }
        if(gameButtons[i][0].innerText == gameButtons[i][1].innerText && gameButtons[i][2].innerText == gameButtons[i][1].innerText )
        {
            if(gameButtons[i][0].innerText == "O" || gameButtons[i][0].innerText == "X")
            {
                document.getElementById("tur").innerText = "Gratulerer " + gameButtons[i][0].innerText;
            StopGame();
            return;
            }
        }
    }
    
    if(gameButtons[1][1].innerText == gameButtons[0][0].innerText && gameButtons[1][1].innerText == gameButtons[2][2].innerText)
    {
        if(gameButtons[1][1].innerText == "O" || gameButtons[1][1].innerText == "X")
        {
            document.getElementById("tur").innerText = "Gratulerer " + gameButtons[1][1].innerText;
            StopGame();
            return;
        }
        
    }
    if(gameButtons[1][1].innerText == gameButtons[0][2].innerText && gameButtons[1][1].innerText == gameButtons[2][0].innerText)
    {
        if(gameButtons[1][1].innerText == "O" || gameButtons[1][1].innerText == "X")
        {
            document.getElementById("tur").innerText = "Gratulerer " + gameButtons[1][1].innerText;
            StopGame();
            return;
        }
        
    }
    TestIfBoardFull();
}
function TestIfBoardFull()
{
    let hasASpot = false;
    for(let y = 0; y < 3; y++)
    {
        for(let x = 0; x < 3; x++)
        {   console.log(gameButtons[x][y].innerText);
            if(!gameButtons[x][y].innerText || gameButtons[x][y].innerText.length === 0)
            {

                hasASpot = true;
            }
        }
    }
    if(!hasASpot)
    {
        document.getElementById("tur").innerText = "Uavgjort ";
        StopGame();
    }
    
}

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












