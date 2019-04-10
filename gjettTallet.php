<?php
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

session_start();

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$seBrukerID=$_SESSION["id"];
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);

while ($row = mysqli_fetch_array($kjort)) {
    $balanse=$row['balance'];
}
?>
<html>
<head>
    <title> Casino Royale | Gjett Tallet </title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
<input type="number" id="valgtTall" placeholder="Hvilket tall tror du det blir?" max="99" min="1" style="width:200px;">

<select id="bet">
    <option value="50">50kr</option>
    <option value="100">100kr</option>
    <option value="200">200kr</option>
    <option value="250">250kr</option>
</select>

<button onclick="kjorBet()">Gjett!</button>

<p id="balance">Balanse: <?php echo $balanse; ?></p>

<script>
    var betEl=document.querySelector("#bet");
    var valgtTallEl=document.querySelector("#valgtTall");

    function kjorBet() {
        $.ajax({url:"funksjonGjettTall.php?gTall="+valgtTallEl.value+"&bTall="+betEl.value,success:function(){
                console.log("Gjett tall kjørt.");
            }
        })
        console.log("Funksjon kjørt.");
    }

</script>

</body>
</html>