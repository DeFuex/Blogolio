# Include the Autoloader (see "Libraries" for install instructions)
require '../vendor/autoload.php';
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun('key-722ab466daff92ad06e2a1f8f72dfe5a');
$domain = "sandbox102af30daf9e4b1e80bae2e606ef9ec7.mailgun.org";

# Make the call to the client.
$result = $mgClient->sendMessage($domain, array(
    'from'    => 'Excited User <mailgun@sandbox102af30daf9e4b1e80bae2e606ef9ec7.mailgun.org>',
    'to'      => 'Baz <timo.obereder@gmail.com>',
    'subject' => 'Hello',
    'text'    => 'Testing some Mailgun awesomness!'
));