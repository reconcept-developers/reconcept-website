<?php
# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

function send_mailgun_mail($to_email, $from_email, $from_name, $subject, $message){

	# Instantiate the client.
	$mgClient = new Mailgun('key-afdd6e06110d512825a1af2e7f544f4d');
	$domain = "mg.reconcept.nl";

	# Make the call to the client.
	$result = $mgClient->sendMessage($domain, array(
	    'from'    => $from_name.' <'.$from_email.'>',
		  'to'      => $to_email,
	    'subject' => $subject.' - Reconcept website',
	    'text'    => $message
	));

	return $result;

};

?>