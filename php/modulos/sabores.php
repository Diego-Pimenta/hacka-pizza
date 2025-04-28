<?php
include("../conexao.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sabor = $_POST['sabor'];
    $sql = "INSERT INTO sabores (nome) VALUES ('$sabor')";
    mysqli_query($conn, $sql);
    echo "Sabor cadastrado!";
}
?>
<h2>Cadastrar Sabor</h2>
<form method="post">
    Nome do Sabor: <input type="text" name="sabor">
    <input type="submit" value="Salvar">
</form>
<hr>
<h2>Sabores Cadastrados</h2>
<ul>
<?php
$res = mysqli_query($conn, "SELECT * FROM sabores");
while ($row = mysqli_fetch_assoc($res)) {
    echo "<li>{$row['nome']}</li>";
}
?>
</ul>
