<?php
require 'send_mail.php';

// $from_email = "jurgen@reconcept.nl";
// $from_name = "Jurgen Visser";
// $subject = "Hello";
// $message = "Test";

header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *');
 
$postdata = file_get_contents("php://input");
// $request = json_decode($postdata);
$request = [];
parse_str($postdata, $request);

// Email address
$from_email = $request['email']; // required
$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

// check email validity
if(!$from_email || !preg_match($email_exp, $from_email)){
	return http_response_code(400);
}

// Email name
$from_name = htmlspecialchars($request['name']);

// Subject
$subject = htmlspecialchars($request['subject']); // required

// Message
$post_message = htmlspecialchars($request['message']); // required
$message = "Bericht via Reconcept.nl contactformulier\n\n";
$message .= "Van: ".$from_name."(".$from_email.")\n\n";

function clean_string($string) {
  $bad = array("content-type","bcc:","to:","cc:","href");
  return str_replace($bad,"",$string);
}

$message .= clean_string($post_message)."\n";

// Send the mail
$result = send_mailgun_mail($from_email, $from_name, $subject, $message);

//return a response code
http_response_code($result->http_response_code);
 
?>