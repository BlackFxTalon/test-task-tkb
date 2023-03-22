<?php

// Get the JSON string from the request body
$jsonString = file_get_contents('php://input');

// Attempt to decode the JSON string into an array
$array = json_decode($jsonString, true);

// Check if the transformation was successful
if (is_array($array)) {
  // Transformation succeeded
  $success = true;
} else {
  // Transformation failed
  $success = false;
}

// Return the success boolean as JSON
echo json_encode(['success' => $success]);

?>