<?php

$host = "localhost";
$username = "postgres";
$password = "1541";
$dbname = "IoTBay";
$conn = new PDO("pgsql:$host;port=5432;$dbname;", $username, $password);

