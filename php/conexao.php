<?php
// Estrutura inicial do sistema da Pizzaria (PHP 5.5)

// conexao.php
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "pizzaria";

$conn = mysqli_connect($host, $usuario, $senha, $banco);
if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

?>