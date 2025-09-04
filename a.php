<?php
// --- SQL Injection: user input concatenated into SQL ---
$pdo = new PDO("mysql:host=localhost;dbname=test", "root", "root");
$id = $_GET['id'] ?? '1';
$sql = "SELECT * FROM users WHERE id = $id"; // Security.SQL.SQLInjection
$pdo->query($sql);

// --- Command Injection: passing user input to shell ---
$cmd = $_GET['cmd'] ?? 'ls';
system("sh -c '$cmd'"); // Security.Exec

// --- Path Traversal / Local File Inclusion ---
$page = $_GET['page'] ?? 'home';
include "pages/$page.php"; // Security.IncludingFile

// --- Reflected XSS: echoing unsanitized input ---
echo $_GET['q'] ?? ''; // Security.XSS

// --- Weak Hash for passwords ---
$password = $_POST['password'] ?? 'secret';
$hash = md5($password); // Security.BadFunctions.MD5
echo $hash;