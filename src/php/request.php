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
            array("X-Api-Key:api_key",
                  "X-Auth-Token:api_token"));
$payload = Array(
    'purpose' => $Data[3],
    'amount' => $Data[4],
    'phone' => $Data[2],
    'buyer_name' => $Data[0],
    'redirect_url' => 'request.php',
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