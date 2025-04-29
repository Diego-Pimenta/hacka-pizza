"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

const clientesFake = {
  "11999999999": { nome: "João da Silva", endereco: "Rua das Flores, 123" },
  "11988888888": { nome: "Maria Oliveira", endereco: "Av. Brasil, 456" },
};

const saboresPizza = ["Calabresa", "Mussarela", "Portuguesa", "Frango com Catupiry"];
const saboresBebida = ["Coca-Cola", "Guaraná", "Pepsi", "Suco de Laranja"];

export default function Pedidos() {
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");

  const [saborPizza, setSaborPizza] = useState("");
  const [quantidadePizza, setQuantidadePizza] = useState(1);
  const [tamanhoPizza, setTamanhoPizza] = useState("");

  const [querBebida, setQuerBebida] = useState(false);
  const [saborBebida, setSaborBebida] = useState("");
  const [quantidadeBebida, setQuantidadeBebida] = useState(1);

  const [formaPagamento, setFormaPagamento] = useState("");
  const [status, setStatus] = useState("pendente");

  const [total, setTotal] = useState(0);

  const precosPizza = {
    pequena: 20,
    media: 30,
    grande: 40,
  };

  const precoBebida = 5;

  useEffect(() => {
    // Preencher nome e endereço automaticamente
    const cliente = clientesFake[telefone.replace(/\D/g, "")];
    if (cliente) {
      setNome(cliente.nome);
      setEndereco(cliente.endereco);
    } else {
      setNome("");
      setEndereco("");
    }
  }, [telefone]);

  useEffect(() => {
    const precoPizza = precosPizza[tamanhoPizza] || 0;
    const totalPizza = precoPizza * quantidadePizza;
    const totalBebida = querBebida ? precoBebida * quantidadeBebida : 0;
    setTotal(totalPizza + totalBebida);
  }, [tamanhoPizza, quantidadePizza, querBebida, quantidadeBebida]);

  const saboresFiltradosPizza = saboresPizza.filter((sabor) =>
    sabor.toLowerCase().includes(saborPizza.toLowerCase())
  );

  const saboresFiltradosBebida = saboresBebida.filter((sabor) =>
    sabor.toLowerCase().includes(saborBebida.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-20 px-6 max-w-6xl mx-auto flex gap-6">
        {/* Formulário */}
        <form className="w-2/3 space-y-4">
          <h1 className="text-2xl font-bold text-[#B72A23] mb-4">Novo Pedido</h1>

          <div>
            <label className="block font-semibold">Telefone do Cliente</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-2 rounded border"
              placeholder="11999999999"
            />
          </div>

          <div>
            <label className="block font-semibold">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>

          <div>
            <label className="block font-semibold">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>

          {/* Pizza */}
          <div className="border-t pt-4">
            <label className="block font-semibold mb-1">Sabor da Pizza</label>
            <input
              type="text"
              value={saborPizza}
              onChange={(e) => setSaborPizza(e.target.value)}
              className="w-full p-2 rounded border"
              list="sugestoesPizza"
            />
            <datalist id="sugestoesPizza">
              {saboresFiltradosPizza.map((sabor) => (
                <option key={sabor} value={sabor} />
              ))}
            </datalist>

            <div className="mt-3">
              <label className="block font-semibold">Quantidade</label>
              <input
                type="number"
                min={1}
                value={quantidadePizza}
                onChange={(e) => setQuantidadePizza(parseInt(e.target.value))}
                className="w-full p-2 rounded border"
              />
            </div>

            <div className="mt-3">
              <label className="block font-semibold">Tamanho</label>
              <select
                value={tamanhoPizza}
                onChange={(e) => setTamanhoPizza(e.target.value)}
                className="w-full p-2 rounded border"
              >
                <option value="">Selecione</option>
                <option value="pequena">Pequena</option>
                <option value="media">Média</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>

          {/* Bebida */}
          <div className="border-t pt-4">
            <label className="block font-semibold mb-2">Deseja bebida?</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="bebida"
                  value="sim"
                  checked={querBebida === true}
                  onChange={() => setQuerBebida(true)}
                />{" "}
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="bebida"
                  value="nao"
                  checked={querBebida === false}
                  onChange={() => setQuerBebida(false)}
                />{" "}
                Não
              </label>
            </div>

            {querBebida && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block font-semibold">Sabor da bebida</label>
                  <input
                    type="text"
                    value={saborBebida}
                    onChange={(e) => setSaborBebida(e.target.value)}
                    className="w-full p-2 rounded border"
                    list="sugestoesBebida"
                  />
                  <datalist id="sugestoesBebida">
                    {saboresFiltradosBebida.map((sabor) => (
                      <option key={sabor} value={sabor} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block font-semibold">Quantidade</label>
                  <input
                    type="number"
                    min={1}
                    value={quantidadeBebida}
                    onChange={(e) => setQuantidadeBebida(parseInt(e.target.value))}
                    className="w-full p-2 rounded border"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pagamento */}
          <div className="border-t pt-4">
            <label className="block font-semibold mb-1">Forma de Pagamento</label>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              className="w-full p-2 rounded border"
            >
              <option value="">Selecione</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">Pix</option>
              <option value="debito">Débito</option>
              <option value="credito">Crédito</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold">Status do Pedido</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded border"
            >
              <option value="pendente">Pendente</option>
              <option value="em_preparo">Em Preparo</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B72A23] text-white py-2 rounded hover:bg-[#a0251e] transition mt-4"
          >
            Finalizar Pedido
          </button>
        </form>

        {/* Resumo do Pedido */}
        <div className="w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold text-[#B72A23] mb-4">Resumo do Pedido</h2>
          <div className="text-sm space-y-2">
            <p><strong>Pizza:</strong> {quantidadePizza}x {saborPizza} ({tamanhoPizza})</p>
            {querBebida && (
              <p><strong>Bebida:</strong> {quantidadeBebida}x {saborBebida}</p>
            )}
            <p><strong>Pagamento:</strong> {formaPagamento}</p>
            <p><strong>Status:</strong> {status}</p>
            <hr className="my-2" />
            <p className="text-lg font-bold">
              Total: <span className="text-green-700">R$ {total.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
