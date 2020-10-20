<?php
# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

function send_mailgun_mail($from_email, $from_name, $subject, $message){

	# Instantiate the client.
	$mgClient = new Mailgun('key-afdd6e06110d512825a1af2e7f544f4d');
	$domain = "mg.reconcept.nl";

	# Make the call to the client.
	$result = $mgClient->sendMessage($domain, array(
	    'from'    => $from_name.' <'.$from_email.'>',
		'to'      => 'Jürgen Visser <jurgen@reconcept.nl>, Reconcept <info@reconcept.nl>',
	    'subject' => $subject.' - Reconcept website',
	    'text'    => $message
	));

	return $result;

};

?>