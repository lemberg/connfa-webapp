<!DOCTYPE html>
<html>
<head>
    <?php include_once("head.php");?>
</head>
<body class="open view">
<div class="load">
    <img src="images/default.gif" width="40" alt="">
</div>
<header class="header">
    <div class="top-menu">
        <div class="hamburger-box">
              <span class="hamburger">
              </span>
        </div>
        <span class="info-text">Floor Plan</span>
    </div>
    <div class="box-menu">
        <ul class="nav">
            <li>
                <a class="select" href="#">Floor/Corps_1</a>
                <ul class="nav-sub">
                    <li><a class="router-link-active" href="#">Floor/Corps_1</a></li>
                    <li><a href="#">Floor/Corps_2</a></li>
                    <li><a href="#">Floor/Corps_3</a></li>
                </ul>
            </li>
        </ul>
    </div>
</header>
<div id="page">
    <div class="inner cf">
        <?php include_once("left-sidebar.php");?>
        <div class="plane">
            <div class="box-img">
                <img src="images/plan.png">
            </div>
        </div>
    </div>
</div>
<div class="over"></div>
</body>
</html>



