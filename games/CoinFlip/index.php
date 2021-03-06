<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <script src="../../0JS/RoyaleSubsystem.js"></script> <!-- Subsystemet -->

    <link href="../../0CSS/universal.css" rel="stylesheet"> <!-- Meny øverst til høyre -->

    <script src="../../0JS/universal_menu.js"></script> <!-- Meny øverst til høyre -->
    <link href="../../0CSS/universal_menu.css" rel="stylesheet"> <!-- Meny øverst til høyre -->

    <script src="../../0CSS/winLoseAnimation.js" > </script>

    <link rel="stylesheet" href="coinFlip.css"> <!-- Stilark til siden -->
    <link rel="stylesheet" href="../../0CSS/classes.css">
    <link rel="stylesheet" href="../../0CSS/universal.css">

    <meta charset="utf-8">
    <title> Casino Royale | Coinflip </title>
</head>
<body>
<div id="documentWrapper">

    <span id="containerBorder">

        <div id="container">

            <div id="penge">
                <div class="side1"></div>
                <div class="side2"></div>
            </div>

            <div id="input">
                Tokens: <input type="number" id="bet"> <br>

                Select a side to bet on:  <br>

                <div id="velg" class="container row">
                    <div id="lilla"> </div>
                    <div id="rod"> </div>
                </div>
                <br>

                <button class="retroButton" type="button" id="flip">Flip</button>
                <p id="melding"></p>
            </div>
        </div>
    </span>
</div>

<script>
    init_royale();
    var betEl=document.getElementById("bet");
    var valgtSide = undefined;

    var knappEl=document.querySelector("#flip");
    knappEl.addEventListener("click", gjett);

    var pengeEl=document.getElementById("penge");
    var meldingEl=document.getElementById("melding");

    var lillaEl=document.getElementById("lilla");
    lillaEl.addEventListener("click", velgLilla);
    function velgLilla() {
        valgtSide="Tails";
        rodEl.style.display="none";
    }
    var rodEl=document.getElementById("rod");
    rodEl.addEventListener("click", velgRod);
    function velgRod() {
        valgtSide="Heads";
        lillaEl.style.display="none";
    }
    function valgt(){
        lillaEl.style.display="block";
        rodEl.style.display="block";
    }

    function gjett() {
        setTimeout(valgt, 5000);

        try {
            meldingEl.innerHTML = "";
            if(valgtSide === undefined) throw new Exception("Please pick red or purple");
            user.tokenManager.bet(Number(betEl.value));
            var vinnerTall = Math.random();
            if (vinnerTall <= 0.5) {
                pengeEl.className = "heads";
                if (valgtSide === "Tails") {
                    var vinn = 2 * Number(betEl.value) - Number(betEl.value);
                    user.tokenManager.resolveBet(true, vinn); /*Gi brukeren tokens hvis vinn*/
                    console.log("WIN TAILS");
                    wlAlert.won(vinn);
                } else {
                    user.tokenManager.resolveBet(false); /*Fjern tokens hvis tap*/
                    console.log("LOSS HEADS");
                    wlAlert.lost(betEl.value);
                }
                saveUser(user); /*Oppdatere til session storage*/
                updateSQL(); /*Oppdater database*/
            } else {
                pengeEl.className = "tails";
                if (valgtSide === "Heads") {
                    var vinn = 2 * Number(betEl.value) - Number(betEl.value);
                    user.tokenManager.resolveBet(true, vinn); /*Gi brukeren tokens hvis vinn*/
                    console.log("WIN HEADS");
                    wlAlert.won(vinn);
                } else {
                    user.tokenManager.resolveBet(false); /*Fjern tokens hvis tap*/
                    console.log("LOSS TAILS");
                    wlAlert.lost(betEl.value);
                }
                saveUser(user); /*Oppdatere til session storage*/
                updateSQL(); /*Oppdater database*/
            }
            valgtSide = undefined;
        } catch (e) {
            meldingEl.innerHTML = e.message;
        }
    }
</script>
</body>
</html>
