<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: index.php");
    exit();
}
?>
<h1>Bem-vindo, <?php echo $_SESSION['usuario']; ?>!</h1>
<ul>
    <li><a href="modulos/cadastro_cliente.php">Cadastro de Clientes</a></li>
    <li><a href="modulos/pedido.php">Novo Pedido</a></li>
    <li><a href="modulos/sabores.php">Sabores</a></li>
    <li><a href="modulos/tamanhos.php">Tamanhos</a></li>
    <li><a href="modulos/bebidas.php">Bebidas</a></li>
    <li><a href="modulos/usuarios.php">Usuários</a></li>    
</ul>
<a href="logout.php">Sair</a>