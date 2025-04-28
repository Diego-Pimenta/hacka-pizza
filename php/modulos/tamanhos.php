<?php
include("../conexao.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tamanho = $_POST['tamanho'];
    $preco = $_POST['preco'];
    $sabores = $_POST['sabores'];
    $sql = "INSERT INTO tamanhos_pizza (tamanho, preco, max_sabores) VALUES ('$tamanho', '$preco', '$sabores')";
    mysqli_query($conn, $sql);
    echo "Tamanho cadastrado!";
}
?>
<h2>Definir Tamanho de Pizza</h2>
<form method="post">
    Descrição: <input type="text" name="tamanho"><br>
    Preço: <input type="text" name="preco"><br>
    Quantos sabores permite: <input type="number" name="sabores"><br>
    <input type="submit" value="Salvar">
</form>
<hr>
<h2>Tamanhos Cadastrados</h2>
<ul>
<?php
$res = mysqli_query($conn, "SELECT * FROM tamanhos_pizza");
while ($row = mysqli_fetch_assoc($res)) {
    echo "<li>{$row['tamanho']} - R$ {$row['preco']} - {$row['max_sabores']} sabores</li>";
}
?>
</ul>