<?php
header('Access-Control-Allow-Origin: *');

include "secret.php"; // contains definition of secret key

function mail_utf8($to, $from_user_root, $from_email, $subject = '(No subject)', $message = '') {
  $from_user = "=?UTF-8?B?".base64_encode($from_user_root)."?=";
  $subject = "=?UTF-8?B?".base64_encode($subject)."?=";

  $headers  = "From: PiGames – Kontakt <contact@pigam.es>\r\n";
  $headers .= "Return-Path: PiGames – Kontakt <contact@pigam.es>\r\n";
  $headers .= "Reply-To: $from_user <$from_email>\r\n";
  $headers .= "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
  $headers .= "X-Priority: 3\r\n";
  $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

  $message = "Od: $from_user_root<br>$message";

  return mail($to, $subject, $message, $headers);
}

function json( $data, $json = false ) {
  if ( $json ) {
    echo $data;
  } else {
    echo json_encode( $data );
  }
}

// getting the captcha
$captcha = "";

if (isset($_POST["g-recaptcha-response"])) {
  $captcha = $_POST["g-recaptcha-response"];
}

if ( !(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"])) ) {
  json(array(
    "success" => false,
    "error_codes" => array("missing-on-of-arguments")
  ));

  exit;
}

if (!$captcha) {
  json(array(
    "success" => false,
    "error_codes" => array("missing-input-secret")
  ));

  exit;
}

// handling the captcha and checking if it's of
$response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".SECRET."&response=".$captcha."&remoteip=".$_SERVER["REMOTE_ADDR"]), true);

// if the captcha is cleared with google, send the mail and echo ok.
if ( $response["success"] != false ) {
  // send the actual mail

  mail_utf8("pigames.team@gmail.com", $_POST["name"], $_POST["email"], $_POST["subject"], $_POST["message"]);
}

json( json_encode($response), true );
?>
