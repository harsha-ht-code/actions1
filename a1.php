<?php
// ❌ PHPCS: Direct output without escaping
$name = $_GET['name'];
echo "<h1>Hello $name</h1>"; // WordPress.Security.EscapeOutput.OutputNotEscaped

// ❌ PHPCS: Using superglobals directly
if ( $_POST['submit'] ) { // WordPress.Security.ValidatedSanitizedInput.InputNotValidated
    $file = $_FILES['upload']['tmp_name']; // WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    move_uploaded_file( $file, '/tmp/test.txt' ); // WordPressVIP.Files.FileOperations.NotWritingToFileSystem
}

// ❌ PHPCS: Using extract() is forbidden
$data = [ 'foo' => 'bar' ];
extract( $data ); // WordPress.PHP.DontExtract

// ❌ PHPCS: Using error suppression
$value = @file_get_contents( 'no-file.txt' ); // WordPress.PHP.NoSilencedErrors



// ❌ PHPCS:  Using eval() is forbidden

