<?php
include 'db.php';

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);
$email = $_POST['email'];

// Check if username or email already exists
$checkUser = $conn->prepare("SELECT id FROM users WHERE username=? OR email=?");
$checkUser->bind_param("ss", $username, $email);
$checkUser->execute();
$checkUser->store_result();

if ($checkUser->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
} else {
    $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $password, $email);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error during registration']);
    }
    $stmt->close();
}

$checkUser->close();
$conn->close();
?>
