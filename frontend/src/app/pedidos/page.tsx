"use client";
import { useState, useEffect } from 'react';
import Header from "@/components/Header";

const clientesFake = {
  "11999999999": { nome: "João da Silva", endereco: "Rua das Flores, 123" },
  "11988888888": { nome: "Maria Oliveira", endereco: "Av. Brasil, 456" },
};

const saboresPizza = [
  {
    sabor: "Calabresa",
    tamanhos: {
      pequena: 20,
      media: 30,
      grande: 40,
    },
  },
  {
    sabor: "Mussarela",
    tamanhos: {
      pequena: 18,
      media: 28,
      grande: 38,
    },
  },
  {
    sabor: "Portuguesa",
    tamanhos: {
      pequena: 22,
      media: 32,
      grande: 42,
    },
  },
  {
    sabor: "Frango com Catupiry",
    tamanhos: {
      pequena: 23,
      media: 33,
      grande: 43,
    },
  },
];

const bebidasDisponiveis = [
  {
    nomeBebida: "Coca-Cola",
    tamanhos: {
      lata: 5,
      '600ml': 8,
      '1 litro': 10,
    },
  },
  {
    nomeBebida: "Guaraná",
    tamanhos: {
      lata: 5,
      '600ml': 8,
      '1 litro': 10,
    },
  },
  {
    nomeBebida: "Suco de Laranja",
    tamanhos: {
      '300ml': 7,
      '500ml': 9,
    },
  },
  {
    nomeBebida: "Água Mineral",
    tamanhos: {
      '500ml': 4,
      '1 litro': 6,
    },
  },
];

export default function Pedidos() {
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [saborPizza, setSaborPizza] = useState('');
  const [quantidadePizza, setQuantidadePizza] = useState(1);
  const [tamanhoPizza, setTamanhoPizza] = useState('');
  const [querBebida, setQuerBebida] = useState(false);
  const [nomeBebida, setNomeBebida] = useState('');
  const [tamanhoBebida, setTamanhoBebida] = useState('');
  const [quantidadeBebida, setQuantidadeBebida] = useState(1);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [status, setStatus] = useState('pendente');
  const [total, setTotal] = useState(0);
  const [erros, setErros] = useState({});

  const pizzaSelecionada = saboresPizza.find((p) => p.sabor === saborPizza);
  
  const bebidaSelecionada = bebidasDisponiveis.find((b) => b.nomeBebida === nomeBebida);

  useEffect(() => {
    const telefoneLimpo = telefone.replace(/\D/g, "");
    const cliente = clientesFake[telefoneLimpo];
    
    if (cliente) {
      setNome(cliente.nome);
      setEndereco(cliente.endereco);
    } else {
      setNome("");
      setEndereco("");
    }
  }, [telefone]);

  useEffect(() => {
    let valorPizza = 0;
    if (pizzaSelecionada && tamanhoPizza) {
      valorPizza = pizzaSelecionada.tamanhos[tamanhoPizza] * quantidadePizza;
    }
    
    let valorBebida = 0;
    if (querBebida && bebidaSelecionada && tamanhoBebida) {
      valorBebida = bebidaSelecionada.tamanhos[tamanhoBebida] * quantidadeBebida;
    }
      
    setTotal(valorPizza + valorBebida);
  }, [
    pizzaSelecionada, 
    tamanhoPizza, 
    quantidadePizza, 
    querBebida, 
    bebidaSelecionada,
    tamanhoBebida,
    quantidadeBebida
  ]);

  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 11);
    setTelefone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novosErros = {};
    
    if (!telefone) novosErros.telefone = "Telefone é obrigatório";
    if (!saborPizza) novosErros.saborPizza = "Selecione um sabor de pizza";
    if (!tamanhoPizza) novosErros.tamanhoPizza = "Selecione um tamanho";
    if (querBebida && !nomeBebida) novosErros.nomeBebida = "Selecione uma bebida";
    if (querBebida && !tamanhoBebida) novosErros.tamanhoBebida = "Selecione o tamanho da bebida";
    if (!formaPagamento) novosErros.formaPagamento = "Selecione a forma de pagamento";
    
    setErros(novosErros);
    
    if (Object.keys(novosErros).length === 0) {
      alert(`Pedido de ${saborPizza}${querBebida ? ` + ${nomeBebida}` : ''} realizado com sucesso!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header />
      <div className="pt-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 font-poppins">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Novo Pedido</h1>
          <div>
            <label className="block font-semibold">Telefone do Cliente</label>
            <input
              type="text"
              value={telefone}
              onChange={handleTelefoneChange}
              className={`w-full p-2 rounded border ${erros.telefone ? "border-red-500" : ""}`}
              placeholder="11999999999"
              maxLength={11}
            />
            {erros.telefone && <p className="text-red-500 text-sm">{erros.telefone}</p>}
          </div>

          <div>
            <label className="block font-semibold">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 rounded border"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full p-2 rounded border"
              required
            />
          </div>

          <div className="border-t pt-4">
            <label className="block font-semibold mb-1">Sabor da Pizza</label>
            <select
              value={saborPizza}
              onChange={(e) => setSaborPizza(e.target.value)}
              className={`w-full p-2 rounded border ${erros.saborPizza ? "border-red-500" : ""}`}
            >
              <option value="">Selecione um sabor</option>
              {saboresPizza.map((pizza) => (
                <option key={pizza.sabor} value={pizza.sabor}>
                  {pizza.sabor}
                </option>
              ))}
            </select>
            {erros.saborPizza && <p className="text-red-500 text-sm">{erros.saborPizza}</p>}

            <div className="mt-3">
              <label className="block font-semibold">Quantidade</label>
              <input
                type="number"
                min={1}
                value={quantidadePizza}
                onChange={(e) => setQuantidadePizza(parseInt(e.target.value) || 1)}
                className="w-full p-2 rounded border"
              />
            </div>

            <div className="mt-3">
              <label className="block font-semibold">Tamanho</label>
              {pizzaSelecionada ? (
                <select
                  value={tamanhoPizza}
                  onChange={(e) => setTamanhoPizza(e.target.value)}
                  className={`w-full p-2 rounded border ${erros.tamanhoPizza ? "border-red-500" : ""}`}
                >
                  <option value="">Selecione</option>
                  {Object.entries(pizzaSelecionada.tamanhos).map(([tamanho, preco]) => (
                    <option key={tamanho} value={tamanho}>
                      {tamanho.charAt(0).toUpperCase() + tamanho.slice(1)} - R$ {preco.toFixed(2)}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-500">Selecione um sabor primeiro</p>
              )}
              {erros.tamanhoPizza && <p className="text-red-500 text-sm">{erros.tamanhoPizza}</p>}
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="block font-semibold mb-2">Deseja bebida?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="bebida"
                  checked={querBebida === true}
                  onChange={() => {
                    setQuerBebida(true);
                    setNomeBebida('');
                    setTamanhoBebida('');
                  }}
                />
                Sim
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="bebida"
                  checked={querBebida === false}
                  onChange={() => {
                    setQuerBebida(false);
                    setNomeBebida('');
                    setTamanhoBebida('');
                  }}
                />
                Não
              </label>
            </div>

            {querBebida && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block font-semibold">Bebida</label>
                  <select
                    value={nomeBebida}
                    onChange={(e) => {
                      setNomeBebida(e.target.value);
                      setTamanhoBebida('');
                    }}
                    className={`w-full p-2 rounded border ${erros.nomeBebida ? "border-red-500" : ""}`}
                  >
                    <option value="">Selecione uma bebida</option>
                    {bebidasDisponiveis.map((bebida) => (
                      <option key={bebida.nomeBebida} value={bebida.nomeBebida}>
                        {bebida.nomeBebida}
                      </option>
                    ))}
                  </select>
                  {erros.nomeBebida && <p className="text-red-500 text-sm">{erros.nomeBebida}</p>}
                </div>

                <div>
                  <label className="block font-semibold">Tamanho</label>
                  {bebidaSelecionada ? (
                    <select
                      value={tamanhoBebida}
                      onChange={(e) => setTamanhoBebida(e.target.value)}
                      className={`w-full p-2 rounded border ${erros.tamanhoBebida ? "border-red-500" : ""}`}
                    >
                      <option value="">Selecione</option>
                      {Object.entries(bebidaSelecionada.tamanhos).map(([tamanho, preco]) => (
                        <option key={tamanho} value={tamanho}>
                          {tamanho} - R$ {preco.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-gray-500">Selecione uma bebida primeiro</p>
                  )}
                  {erros.tamanhoBebida && <p className="text-red-500 text-sm">{erros.tamanhoBebida}</p>}
                </div>

                <div>
                  <label className="block font-semibold">Quantidade</label>
                  <input
                    type="number"
                    min={1}
                    value={quantidadeBebida}
                    onChange={(e) => setQuantidadeBebida(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded border"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <label className="block font-semibold mb-1">Forma de Pagamento</label>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              className={`w-full p-2 rounded border ${erros.formaPagamento ? "border-red-500" : ""}`}
              required
            >
              <option value="">Selecione</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">Pix</option>
              <option value="debito">Débito</option>
              <option value="credito">Crédito</option>
            </select>
            {erros.formaPagamento && <p className="text-red-500 text-sm">{erros.formaPagamento}</p>}
          </div>

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

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
          
          {pizzaSelecionada && tamanhoPizza && (
            <p>
              <strong>Pizza:</strong> {quantidadePizza}x {pizzaSelecionada.sabor} (
              {tamanhoPizza.charAt(0).toUpperCase() + tamanhoPizza.slice(1)}
              ) - R$ {(pizzaSelecionada.tamanhos[tamanhoPizza] * quantidadePizza).toFixed(2)}
            </p>
          )}
          
          {querBebida && bebidaSelecionada && tamanhoBebida && (
            <p className="mt-2">
              <strong>Bebida:</strong> {quantidadeBebida}x {bebidaSelecionada.nomeBebida} (
              {tamanhoBebida}
              ) - R$ {(bebidaSelecionada.tamanhos[tamanhoBebida] * quantidadeBebida).toFixed(2)}
            </p>
          )}
          
          <hr className="my-4" />

          {formaPagamento && (
            <p className="mt-2">
                <strong>Pagamento:</strong> {formaPagamento.charAt(0).toUpperCase() + formaPagamento.slice(1)}
            </p>
            )}
            <hr className="my-4" />
            <p className="text-lg font-bold">
            Total: <span className="text-green-700">R$ {total.toFixed(2)}</span>
            </p>
          
          <p className="text-lg font-bold">
            Total: <span className="text-green-700">R$ {total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}