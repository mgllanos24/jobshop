<?php
// Silent visitor logging
$log_file = "visitor_log.txt";

// Gather visitor details
$visitor_ip = $_SERVER['REMOTE_ADDR'];
$visitor_agent = $_SERVER['HTTP_USER_AGENT'];
$visitor_time = date("Y-m-d H:i:s");

// Prepare the log entry
$log_entry = "IP: $visitor_ip | Time: $visitor_time | User Agent: $visitor_agent\n";

// Append to the log file
file_put_contents($log_file, $log_entry, FILE_APPEND);

// Return an empty response (silent)
http_response_code(204);
?>
