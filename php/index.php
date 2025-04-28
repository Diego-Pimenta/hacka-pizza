<?php


session_start();
include("conexao.php");
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $login = $_POST['login'];
        $senha = $_POST['senha'];

        $sql = "SELECT * FROM usuarios WHERE login = '$login' AND senha = '$senha' AND ativo = 1";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) === 1) {
            $_SESSION['usuario'] = $login;
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Usuário ou senha inválidos ou inativo.";
        }
    }
?>
<form method="post">
    <label>Login:</label>
    <input type="text" name="login">
    <br>
    <label>Senha:</label>
    <input type="password" name="senha">
    <br>
    <input type="submit" value="Entrar">
</form>