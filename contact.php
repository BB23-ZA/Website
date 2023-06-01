<?php
if (isset($_POST['submit'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = "Bryan@bryanbowler.co.za";
  $subject = "New Message from Contact Form";
  $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo "Thank you for your message! <br><br>";
    echo '<a href="https://bryanbowler.co.za">Go back to the home page</a>';
  } else {
    echo "Oops! Something went wrong. Please try again later.";
  }
}
?>