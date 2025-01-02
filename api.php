<?php
// Set appropriate headers
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// File to store data
$dataFile = 'data.json';

// Handle GET requests (Fetch latest data)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        // Read the file and return the contents
        echo file_get_contents($dataFile);
    } else {
        // Return an empty structure if the file doesn't exist
        echo json_encode([
            'parts' => [],
            'jobs' => [],
            'operationProgress' => [],
            'operationNotes' => []
        ]);
    }
}

// Handle POST requests (Save updated data)
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read incoming JSON data
    $input = file_get_contents('php://input');
    $decodedData = json_decode($input, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        // Save the data to a file
        file_put_contents($dataFile, $input);
        echo json_encode(['success' => true]);
    } else {
        // Respond with an error if JSON is invalid
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    }
}

// Handle unsupported request methods
else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed']);
}
