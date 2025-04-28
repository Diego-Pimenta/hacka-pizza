<?php
include("../conexao.php");

$clienteEncontrado = false;
$dadosCliente = null;

if (isset($_POST['buscar_cliente'])) {
    $telefone = $_POST['telefone'];
    $res = mysqli_query($conn, "SELECT * FROM clientes WHERE telefone = '$telefone'");
    if (mysqli_num_rows($res) > 0) {
        $clienteEncontrado = true;
        $dadosCliente = mysqli_fetch_assoc($res);
    } else {
        header("Location: cadastro_cliente.php?telefone=$telefone");
        exit();
    }
}

if (isset($_POST['salvar_pedido'])) {
    $cliente_id = $_POST['cliente_id'];
    $tamanho_id = $_POST['tamanho'];
    $sabores = $_POST['sabores'];
    $bebida_id = $_POST['bebida'];
    $pagamento = $_POST['pagamento'];
    $datahora = date('Y-m-d H:i:s');

    $sql_pedido = "INSERT INTO pedidos (cliente_id, tamanho_id, bebida_id, forma_pagamento, data_hora) VALUES ($cliente_id, $tamanho_id, $bebida_id, '$pagamento', '$datahora')";
    mysqli_query($conn, $sql_pedido);
    $pedido_id = mysqli_insert_id($conn);

    foreach ($sabores as $sabor_id) {
        mysqli_query($conn, "INSERT INTO pedido_sabores (pedido_id, sabor_id) VALUES ($pedido_id, $sabor_id)");
    }

    echo "Pedido registrado com sucesso!";
}
?>
<h2>Novo Pedido</h2>
<form method="post">
    Telefone do Cliente: <input type="text" name="telefone">
    <input type="submit" name="buscar_cliente" value="Buscar Cliente">
</form>
<?php if ($clienteEncontrado): ?>
    <form method="post">
        <input type="hidden" name="cliente_id" value="<?php echo $dadosCliente['id']; ?>">
        Nome: <?php echo $dadosCliente['nome']; ?><br>
        Endereço: <?php echo $dadosCliente['rua'] . ', ' . $dadosCliente['numero'] . ' ' . $dadosCliente['complemento'] . ' - ' . $dadosCliente['bairro'] . ', ' . $dadosCliente['cidade']; ?><br>

        <label>Tamanho:</label>
        <select name="tamanho">
            <?php
            $res = mysqli_query($conn, "SELECT * FROM tamanhos_pizza");
            while ($row = mysqli_fetch_assoc($res)) {
                echo "<option value='{$row['id']}'>{$row['tamanho']} - R$ {$row['preco']}</option>";
            }
            ?>
        </select><br>

        <label>Sabores:</label><br>
        <?php
        $res = mysqli_query($conn, "SELECT * FROM sabores");
        while ($row = mysqli_fetch_assoc($res)) {
            echo "<input type='checkbox' name='sabores[]' value='{$row['id']}'> {$row['nome']}<br>";
        }
        ?>

        <label>Bebida:</label>
        <select name="bebida">
            <?php
            $res = mysqli_query($conn, "SELECT * FROM bebidas");
            while ($row = mysqli_fetch_assoc($res)) {
                echo "<option value='{$row['id']}'>{$row['nome']} - R$ {$row['preco']}</option>";
            }
            ?>
        </select><br>

        <label>Forma de Pagamento:</label>
        <select name="pagamento">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
        </select><br>

        <input type="submit" name="salvar_pedido" value="Salvar Pedido">
    </form>
<?php endif; ?>
