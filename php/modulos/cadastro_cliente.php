<?php
include("../conexao.php");

if (isset($_GET['excluir'])) {
    $id = (int) $_GET['excluir'];
    mysqli_query($conn, "DELETE FROM clientes WHERE id = $id");
    echo "Cliente excluído.";
}

if (isset($_GET['editar'])) {
    $id = (int) $_GET['editar'];
    $res = mysqli_query($conn, "SELECT * FROM clientes WHERE id = $id");
    $cliente = mysqli_fetch_assoc($res);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $cpf = $_POST['cpf'];
    $telefone = $_POST['telefone'];
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];
    $complemento = $_POST['complemento'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    
    if (isset($_POST['id'])) {
        $id = (int) $_POST['id'];
        $sql = "UPDATE clientes SET nome='$nome', cpf='$cpf', telefone='$telefone', rua='$rua', numero='$numero', complemento='$complemento', bairro='$bairro', cidade='$cidade' WHERE id = $id";
        mysqli_query($conn, $sql);
        echo "Cliente atualizado com sucesso!";
    } else {
        $sql_check = "SELECT * FROM clientes WHERE cpf = '$cpf' OR telefone = '$telefone'";
        $res_check = mysqli_query($conn, $sql_check);

        if (mysqli_num_rows($res_check) > 0) {
            echo "CPF ou Telefone já cadastrado.";
        } else {
            $sql = "INSERT INTO clientes (nome, cpf, telefone, rua, numero, complemento, bairro, cidade)
                    VALUES ('$nome', '$cpf', '$telefone', '$rua', '$numero', '$complemento', '$bairro', '$cidade')";
            if (mysqli_query($conn, $sql)) {
                echo "Cliente cadastrado com sucesso!";
            } else {
                echo "Erro: " . mysqli_error($conn);
            }
        }
    }
}
?>

<h2><?php echo isset($cliente) ? 'Editar Cliente' : 'Cadastro de Cliente'; ?></h2>
<form method="post">
    <?php if (isset($cliente)) echo '<input type="hidden" name="id" value="' . $cliente['id'] . '">'; ?>
    Nome: <input type="text" name="nome" value="<?php echo isset($cliente) ? $cliente['nome'] : ''; ?>"><br>
    CPF: <input type="text" name="cpf" value="<?php echo isset($cliente) ? $cliente['cpf'] : ''; ?>"><br>
    Telefone: <input type="text" name="telefone" value="<?php echo isset($cliente) ? $cliente['telefone'] : ''; ?>"><br>
    Rua: <input type="text" name="rua" value="<?php echo isset($cliente) ? $cliente['rua'] : ''; ?>"><br>
    Número: <input type="text" name="numero" value="<?php echo isset($cliente) ? $cliente['numero'] : ''; ?>"><br>
    Complemento: <input type="text" name="complemento" value="<?php echo isset($cliente) ? $cliente['complemento'] : ''; ?>"><br>
    Bairro: <input type="text" name="bairro" value="<?php echo isset($cliente) ? $cliente['bairro'] : ''; ?>"><br>
    Cidade: <input type="text" name="cidade" value="<?php echo isset($cliente) ? $cliente['cidade'] : ''; ?>"><br>
    <input type="submit" value="<?php echo isset($cliente) ? 'Atualizar' : 'Salvar'; ?>">
</form>

<h2>Clientes Cadastrados</h2>
<table border="1">
    <tr>
        <th>Nome</th>
        <th>Telefone</th>
        <th>Ações</th>
    </tr>
    <?php
    $res = mysqli_query($conn, "SELECT * FROM clientes");
    while ($row = mysqli_fetch_assoc($res)) {
        echo "<tr>
            <td>{$row['nome']}</td>
            <td>{$row['telefone']}</td>
            <td>
                <a href='cadastro_cliente.php?editar={$row['id']}'>Editar</a> |
                <a href='cadastro_cliente.php?excluir={$row['id']}' onclick=\"return confirm('Deseja realmente excluir este cliente?');\">Excluir</a>
            </td>
        </tr>";
    }
    ?>
</table>