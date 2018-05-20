<?php
header('Access-Control-Allow-Origin: *');
if($_POST['data']){
$Data = $_POST['data']; 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.instamojo.com/api/1.1/payment-requests/');
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER,
            array("X-Api-Key:34773328506bcd96f1b709b2f0bf7e9f",
                  "X-Auth-Token:22b221846212169d52e04273e3923330"));
$payload = Array(
    'purpose' => $Data[3],
    'amount' => $Data[4],
    'phone' => $Data[2],
    'buyer_name' => $Data[0],
    'redirect_url' => 'http://vinayak.16mb.com/instamojo/request.php',
    'send_email' => true,
    'webhook' => '',
    'send_sms' => true,
    'email' => $Data[1],
    'allow_repeated_payments' => false
);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
$response = curl_exec($ch);
curl_close($ch); 
echo "success";
}
?>