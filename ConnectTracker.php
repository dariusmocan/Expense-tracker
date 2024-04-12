<?php

$db_name = 'mysql:host=localhost;dbname=expensetracker';
$db_user_name = 'root';
$db_user_pass = '';

try {
    // Connect to the database
    $conn = new PDO($db_name, $db_user_name, $db_user_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch expenses data from the database
    $stmt = $conn->query("SELECT * FROM expenses");
    $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract data from the POST request
    $name = $_POST['name'];
    $amount = $_POST['amount'];

    date_default_timezone_set('Europe/Bucharest');
    $data = date('Y-m-d');

    try {

        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO expenses (name, amount, data) VALUES (:name, :amount, :data)");

        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':data',$data);

        // Execute the query
        $stmt->execute();

        echo "Expense added successfully";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

?>