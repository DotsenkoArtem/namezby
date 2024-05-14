<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

//Load Composer's autoloader
// require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

// !!!!! НА КАЖДУЮ ФОРМУ - СВОЕ ЗНАЧЕНИЕ $_POST[]

$first_name         = $_POST['firstName'];
$last_name          = $_POST['lastName'];
$phone              = $_POST['phone'];
$email              = $_POST['email'];
$message            = $_POST['msg'];
$myuploads          = $_FILES['file'];


$gender             = $_POST['gender'];

$hobbies            = array(
                        $_POST['checkbox1'],
                        $_POST['checkbox2'],
                        $_POST['checkbox3'],
                        $_POST['checkbox4']
                    );


function get_checkboxes_values($arrs) {
    $string = '';
    foreach($arrs as $arr) {
        if($arr) {
            $string .= $arr . ', ';
        }
    }

    if($string) {
        $string = substr_replace($string, '', -2, -1);  
    }
    return $string;
}



    


try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                       //Enable verbose debug output
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    // $mail->isSMTP();                                             //Send using SMTP
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;                                       //Enable SMTP authentication

    $mail->Host       = 'smtp.yandex.ru';                             //Set the SMTP server to send through
    $mail->Username   = 'dots.send@yandex.ru';                       //SMTP username
    $mail->Password   = 'pioqeprijlvtydqv';                     //SMTP password

    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;             //Enable implicit TLS encryption

    $mail->SMTPSecure = 'ssl';                                      //Enable implicit TLS encryption
    $mail->Port       = 465;                                        //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    


    //Recipients
    $mail->setFrom('dots.send@yandex.ru', 'Администратор');
    $mail->addAddress('doclko31@gmail.com');                        //Add a recipient

    // $mail->addAddress('ellen@example.com');                      //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');                //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');           //Optional name

    $attachmentSize = 0;
    // Прикрепление файлов
    if (!empty($myuploads['name'][0])) {
        for ($ct = 0; $ct < count($myuploads['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($myuploads['name'][$ct]));
            $filename = $myuploads['name'][$ct];
            $attachmentSize += $myuploads['size'][$ct];

            if (move_uploaded_file($myuploads['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }   
    }
    //  - - - - - - - - - - - - 

    $body_content;

    $first_name = "<b>Имя пользователя: </b> ". $first_name;
    $body_content = $first_name;

    if($last_name) {
        $last_name = "<b>Фамилия пользователя: </b> ". $last_name;
        $body_content .= "<br>".$last_name;
    }

    $phone = "<b>Номер телефона: </b> ". $phone;
    $body_content .= "<br>".$phone;

    $email = "<b>Электронная почта: </b> ". $email;
    $body_content .= "<br>".$email;

    
    if($gender) {
        $gender = "<b>Пол: </b> ". $gender;
        $body_content .= "<br>".$gender;
    }
    
    // if($hobbies ) {
    //     $hobbies  = "<b>Хобби: </b> ". $hobbies;
    //     $body_content .= "<br>".$hobbies;
    // }
    
    if(get_checkboxes_values($hobbies)) {
        $hobbies_str  = "<b>Хобби: </b> ". get_checkboxes_values($hobbies);
        $body_content .= "<br>".$hobbies_str;
    }

    if($message) {
        $message = "<b>Сообщение: </b> ". $message;
        $body_content .= "<br>".$message;
    }

    
    

    //Content
    $mail->isHTML(true);                                            //Set email format to HTML
    $mail->Subject = 'Тестовое письмо с сайта "artem-dots.ru"';
    $mail->Body    = $body_content;
    // $mail->Body    =    
                    // "<b>Имя пользователя: </b>{$first_name}<br>
                    // <b>Фамилия пользователя: </b>{$last_name}";

    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';





    // if ($mail->send()) {$result = "success";}       //Дефолтная отправка писем
    // else {$result = "error";}




   
    if ($attachmentSize > 10485760) {                  //Отправка с ограничением по суммарному размеру вложений
        $result = "limitExceeded";
    } else {
        $mail->isSMTP();
        if ($mail->send()) {
            $result = "success"; 
        } else {
            $result = "error";
        }
    }

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status, "myuploads['size']" => $myuploads['size'], "attachmentSize" => $attachmentSize]);

// echo json_encode(["result" => $result, "status" => $status]);
