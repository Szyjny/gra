<?php
    $username = $_POST['acountName'];
    $password = $_POST['password'];
    $passwordRepeat = $_POST['passwordRepeat']
    $email = $_POST['email'];

    if (empty($username) || empty($password) || empty($email) || empty($passwordRepeat) || $password != $passwordRepeat) {
        echo "Proszę wypełnić wszystkie pola formularza.";
        exit;
    }

    $servername = "localhost";
    $dbUsername = "root";
    $dbPassword = " ";
    $dbName = "gra";

    $conn = new mysqli($servername,$dbUsername, $dbPassword, $dbName);

    if ($conn->connect_error) {
        die("Błąd połączenia z bazą danych: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Użytkownik o podanej nazwie już istnieje. Wybierz inną nazwę.";
        exit;
    }

    $stmt->free_result();

    $salt = random_bytes(16);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, password, email, salt) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $hashedPassword, $email, $salt);

    if ($stmt->execute()) {
        echo "Konto zostało pomyślnie utworzone.";
    } else {
        echo "Wystąpił błąd podczas tworzenia konta. Spróbuj ponownie.";
    }

    $stmt->close();
    $conn->close();

    header("Location: /GameFiles/LPaktUKmainLobby.html");
?>