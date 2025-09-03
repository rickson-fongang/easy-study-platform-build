<?php
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../classes/User.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id)) {
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    $user->id = $data->user_id;

    if ($user->readOne()) {
        // Delete student
        if ($user->delete()) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Student rejected successfully.'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Unable to reject student.'
            ]);
        }
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Student not found.'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'User ID is required.'
    ]);
}
?>
