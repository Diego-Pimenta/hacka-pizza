<?php
include("../conexao.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $preco = $_POST['preco'];
    $sql = "INSERT INTO bebidas (nome, preco) VALUES ('$nome', '$preco')";
    mysqli_query($conn, $sql);
    echo "Bebida cadastrada!";
}
?>
<h2>Cadastrar Bebida</h2>
<form method="post">
    Nome: <input type="text" name="nome"><br>
    Preço: <input type="text" name="preco"><br>
    <input type="submit" value="Salvar">
</form>
<hr>
<h2>Bebidas Cadastradas</h2>
<ul>
<?php
$res = mysqli_query($conn, "SELECT * FROM bebidas");
while ($row = mysqli_fetch_assoc($res)) {
    echo "<li>{$row['nome']} - R$ {$row['preco']}</li>";
}
?>
</ul>