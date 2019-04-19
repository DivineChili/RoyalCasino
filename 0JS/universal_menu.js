$(function () {

    // GENERATING THE HANDLE ELEMENT

    let rmh = document.createElement("div");
    rmh.id = "rmh";
    rmh.classList.add("container");
    rmh.innerHTML = '' +
        '        <img id="rmh_handle" src="../../resources/redChip.png">\n' +
        '\n' +
        '        <div id="rmh_bar">\n' +
        '\n' +
        '            <div class="pointer rmh_item">\n' +
        '                <i class="material-icons" onclick="window.location.href=\'../../hub/index.php\'">home</i>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="rmh_item" id="rmh_tokenCountItem">\n' +
        '                <div class="container row">\n' +
        '                    <img src="../../resources/redChip.png" alt="token" class="rmh_token">\n' +
        '                    <p id="rmh_tokenCount"> x 400</p>\n' +
        '                    <script> document.getElementById("tokenCount").innerHTML = "x " + getUser().tokenManager.getCount(); </script>\n' +
        '                </div>\n' +
        '                <button class="retroButton" onclick="">get more</button>\n' +
        '            </div>\n' +
        '        </div>\n';

    document.body.appendChild(rmh);

    /* structure:
    <div id="rmh" class="container">

        <img id="rmh_handle" src="../../resources/redChip.png">

        <div id="rmh_bar">

            <div class="pointer rmh_item">
                <i class="material-icons" onclick="window.location.href='../../hub/index.php'">home</i>
            </div>

            <div class="rmh_item" id="rmh_tokenCountItem">
                <div class="container row">
                    <img src="../../resources/redChip.png" alt="token" class="rmh_token">
                    <p id="rmh_tokenCount"> x 400</p>
                    <script> document.getElementById("tokenCount").innerHTML = "x " + getUser().tokenManager.getCount(); </script>
                </div>
                <button class="retroButton" onclick="">get more</button>
            </div>
        </div>
    </div>
     */



    //let rmh = document.getElementById("rmh");
    rmh.addEventListener("animationend", function () {
        rmh.classList.remove("rmh_open");
        rmh.classList.remove("rmh_close");
    });

    let rmh_handle = document.getElementById("rmh_handle");
    rmh_handle.addEventListener("animationend", function () {
        rmh_handle.classList.remove("rmh_handle_open");
        rmh_handle.classList.remove("rmh_handle_close");
    });

    let isRmhOpen = true;
    $(rmh_handle).on({
        click: function () {
            if (!isRmhOpen) {
                isRmhOpen = true;
                rmh.classList.remove("rmh_closed");
                rmh.classList.add("rmh_open");
                rmh.classList.add("rmh_opened");

                rmh_handle.classList.remove("rmh_handle_closed");
                rmh_handle.classList.add("rmh_handle_open");
                rmh_handle.classList.add("rmh_handle_opened");
            } else {
                isRmhOpen = false;
                rmh.classList.remove("rmh_opened");
                rmh.classList.add("rmh_close");
                rmh.classList.add("rmh_closed");

                rmh_handle.classList.remove("rmh_handle_opened");
                rmh_handle.classList.add("rmh_handle_close");
                rmh_handle.classList.add("rmh_handle_closed")
            }
        },
    });

    rmh.classList.add("rmh_open");
    rmh.classList.add("rmh_opened");
    rmh_handle.classList.add("rmh_handle_open");
    rmh_handle.classList.add("rmh_handle_opened");



});