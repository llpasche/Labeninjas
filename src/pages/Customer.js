import React from "react";
import { ProductCard } from '../components/ProductCard'
import styled from "styled-components";
import axios from 'axios'
import Header from "../components/Header";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
`

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction:column;
  width: 200px;
  input{
    border: 1px solid #e6930d;
    border-radius: 5px;
    padding: 10px;
    background-color:transparent;
    color: #e6930d;
  }
  select {
    border: 1px solid #e6930d;
    border-radius: 5px;
    padding: 10px;
    background-color:transparent;
    color: gray;
  }
  label{
    color: #e6930d;
    position:absolute;
    top: 130px;
    background-color: white;
    padding: 0 10px;
    text-align:center;
    font-size: 0.8rem;
    margin-left: 5px;
  }

`


const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`

const Botao = styled.button`
  padding: 5px 0;
  background-color: #06a2cf;
  color: white;
  border: none;
  border-radius: 5px;
  width: 130px;
  :hover{
    cursor: pointer;
    background-color: #184cbd;
    transition-duration: 1s;
    transform: scale(1.1,1.1);
  }
`

const BotaoFechado = styled.button`
  padding: 5px 0;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 5px;
  width: 130px;
`



class CustomerScreen extends React.Component {

  state = {
    servicos: [],
    carrinho: [],
    valorMin: "",
    valorMax: "",
    buscador: "",
    ordenacao: "titulo crescente"
  }

  componentDidMount = () => {
    this.getServicos()
  }


  getServicos = () => {
    const url = "https://labeninjas.herokuapp.com/jobs"

    axios.get(url, {
      headers: {
        Authorization: "f6ea36c4-47c4-4187-a3fb-38bd313f9559"
      }
    })
    .then(resp => {
      this.setState({servicos: resp.data.jobs})
    })
    .catch(err => {
      console.log(err)
    })
  }


  
  verificaBotaoCarrinho = (taken,id) => {
    if(taken) {
      return <BotaoFechado><span class="material-icons">shopping_cart </span></BotaoFechado>
    }
    else {
      return <Botao onClick={() => this.addCarrinho(id)}><span class="material-icons">shopping_cart </span></Botao>
    }
  }

  addCarrinho = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`
    const body = {
      "taken":true
    }

    axios.post(url, body, {
      headers: {
        Authorization: "f6ea36c4-47c4-4187-a3fb-38bd313f9559"
      }
    })
    .then(resp => {
      alert("Serviço Adicionado ao Carrinho")
      this.getServicos()
    })
    .catch(err => {
      alert("Erro ao Adicionar ao Carrinho")
    })
  }

  atualizaValorMin = (event) => {
    this.setState({valorMin: event.target.value})
  }

  atualizaValorMax = (event) => {
    this.setState({valorMax: event.target.value})
  }

  atualizaValorBuscador = (event) => {
    this.setState({buscador: event.target.value})
  }

  atualizaValorOrdenacao = (event) => {
    this.setState({ordenacao: event.target.value})
  }

  limparFiltros = () => {
    this.setState({valorMin: "", valorMax: "", buscador: ""})
  }

  render() {
    
    const listaServicos = this.state.servicos
    .filter(servico => {
      return servico.price >= this.state.valorMin
    })
    .filter(servico => {
      return servico.price <= this.state.valorMax || this.state.valorMax === ""
    })
    .filter(servico => {
      return servico.title.toLowerCase().includes(this.state.buscador.toLowerCase())
    })
    .sort((a, b) => {
      switch (this.state.ordenacao) {
        case "crescente":
          return a.price - b.price
        case "decrescente":
          return b.price - a.price
        case "prazo crescente":
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "prazo decrescente":
          return new Date(b.dueDate) - new Date(a.dueDate)
        case "titulo crescente":
          if(a.title > b.title) {
            return 1;
          } else {
            return -1;
          }
        case "titulo decrescente":
          if(b.title > a.title) {
            return 1;
          } else {
            return -1;
          }
        default:
          return a.price - b.price
      }
    })
    .map(servico => {
      return <ProductCard key={servico.id}
              id = {servico.id} 
              title = {servico.title}
              description = {servico.description}
              price = {servico.price}
              paymentMethods = {servico.paymentMethods}
              dueDate = {servico.dueDate}
              taken = {servico.taken}
              verificaBotaoCarrinho = {this.verificaBotaoCarrinho}
              irParaDetalhes = {() => this.props.irParaDetalhes(
                servico.id, servico.title, servico.description, servico.price, servico.paymentMethods,
                servico.dueDate, servico.taken)}
              irParaCarrinho = {() => this.props.irParaCarrinho(
                servico.id, servico.title, servico.description, servico.price, servico.paymentMethods,
                servico.dueDate, servico.taken)}
                addCarrinho = {this.addCarrinho}
            />
    })

    return (
     <div> 
      <Header goToHomeScreen={this.props.goToHomeScreen} goToShoppingCart={this.props.goToShoppingCart} />
      <MainContainer>
        <InputsContainer>
          <InputContainer>
            <label for="valMin">Valor Mínimo</label>
            <input id ="valMin" type="number" placeholder="R$" 
                   value={this.state.valorMin} 
                   onChange={this.atualizaValorMin}
            />
          </InputContainer>
          <InputContainer>
            <label for="valMax">Valor Máximo</label>
            <input id ="valMax" type="number" placeholder="R$"
                   value={this.state.valorMax} 
                   onChange={this.atualizaValorMax}
            />
          </InputContainer>
          <InputContainer>
            <label for="titulo">Busca por Título</label>
            <input id ="titulo" type="text" placeholder="Nome"
                   value={this.state.buscador} 
                   onChange={this.atualizaValorBuscador}
            />
          </InputContainer>
          <InputContainer>
            <label for="orden">Ordenação</label>
            <select id="orden" value={this.state.ordenacao} onChange={this.atualizaValorOrdenacao}>
              <option value="titulo crescente" >Título Crescente</option>
              <option value="titulo decrescente" >Título Decrescente</option>
              <option value="prazo crescente" >Prazo Crescente</option>
              <option value="prazo decrescente" >Prazo Decrescente</option>
              <option value="crescente" >Preço Crescente</option>
              <option value="decrescente" >Preço Decrescente</option>
            </select>
          </InputContainer>
          <Botao onClick={this.limparFiltros}>Limpar Filtros</Botao>
        </InputsContainer>
        <CardsContainer>
          {listaServicos}
        </CardsContainer>
      </MainContainer>
    </div>
    )
  }
}

export default CustomerScreen;
