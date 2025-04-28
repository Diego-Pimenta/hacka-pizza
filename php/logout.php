<?php
session_start();

// Destrói a sessão do usuário
session_unset();
session_destroy();

// Redireciona para a página de login
header("Location: index.php");
exit();
?>
