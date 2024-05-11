<?php
include 'ConnectTracker.php';

if(isset($_POST['expense_id'])) {
    $expense_id = $_POST['expense_id'];
    
    try {
        // Prepare and execute SQL statement to delete the expense from the database
        $stmt = $conn->prepare("DELETE FROM expenses WHERE id = ?");
        $stmt->execute([$expense_id]);

        // Return success response if deletion is successful
        echo "Expense deleted successfully";
    } catch(PDOException $e) {
        // Return error message if deletion fails
        echo "Error: " . $e->getMessage();
    }
}
?>
