<?php
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../classes/User.php';
require_once '../classes/Auth.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password) && !empty($data->user_type)) {

    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    $user->email = $data->email;

    if ($user->emailExists()) {

        if (password_verify($data->password, $user->password) && $user->user_type === $data->user_type) {

            if ($user->is_active) {
                // Generate JWT token
                $user_data = [
                    'id' => $user->id,
                    'email' => $user->email,
                    'user_type' => $user->user_type
                ];
                $token = Auth::generateToken($user_data);

                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'user_type' => $user->user_type
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Account is inactive. Please contact tutor for approval.'
                ]);
            }
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid credentials or user type.'
            ]);
        }
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'User not found.'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Email, password, and user type are required.'
    ]);
}
?>
