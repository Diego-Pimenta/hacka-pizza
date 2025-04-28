<?php
include("../conexao.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $login = $_POST['login'];
    $senha = $_POST['senha'];
    $ativo = isset($_POST['ativo']) ? 1 : 0;
    $sql = "INSERT INTO usuarios (nome, login, senha, ativo) VALUES ('$nome', '$login', '$senha', $ativo)";
    mysqli_query($conn, $sql);
    echo "Usuário cadastrado!";
}
?>
<h2>Cadastrar Usuário</h2>
<form method="post">
    Nome: <input type="text" name="nome"><br>
    Login: <input type="text" name="login"><br>
    Senha: <input type="password" name="senha"><br>
    Ativo: <input type="checkbox" name="ativo" checked><br>
    <input type="submit" value="Salvar">
</form>
<hr>
<h2>Usuários Cadastrados</h2>
<ul>
<?php
$res = mysqli_query($conn, "SELECT * FROM usuarios");
while ($row = mysqli_fetch_assoc($res)) {
    $status = $row['ativo'] ? 'Ativo' : 'Inativo';
    echo "<li>{$row['nome']} ({$row['login']}) - $status</li>";
}
?>
</ul>