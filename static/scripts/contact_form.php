<?php
require 'send_mail.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function clean_string($string) {
  $bad = array("content-type","bcc:","to:","cc:","href");
  return str_replace($bad,"",$string);
}

header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *');
 
$postdata = file_get_contents("php://input");
$request = [];
parse_str($postdata, $request);

// Email address
$from_email = 'info@reconcept.nl';
$to_email = $request['to_email']; // required
$to_emails = explode(",", $to_email);
// only allow to_email if it contains @reconcept.nl
$reconcept_email_exp = '/^[A-Za-z0-9._%-]+@reconcept.nl$/';

// check email validity
foreach ($to_emails as $key => $email) {
  $to_emails[$key] = trim($email);
  if(!$email || !preg_match($reconcept_email_exp, trim($email))){
    // echo "Invalid email ".$email;
    return http_response_code(400);
  }
}

$to_email_joined = implode($to_emails, ",");

// Email name
$from_name = htmlspecialchars($request['name']);

// Subject
$subject = htmlspecialchars($request['subject']); // required

// Message
$post_message = htmlspecialchars($request['message']); // required
$post_description = htmlspecialchars($request['description']);

$message = "Bericht via Reconcept.nl contactformulier\n\n";
$message .= "Van: ".$from_name."(".$from_email.")\n\n";
$message .= clean_string($post_message)."\n";

$description = clean_string($post_description);
$page_url = htmlspecialchars($request['page_url']);

if($description != ""){
  $message .= "Toelichting: ".$description."\n";
}

$message .= "Pagina op site: <a href=\"".$page_url."\">".$page_url."</a>";

// Send the mail
$result = send_mailgun_mail($to_email_joined, $from_email, $from_name, $subject, $message);

//return a response code
http_response_code($result->http_response_code);
 
?>