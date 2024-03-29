import React from "react";
import { Home } from "./pages/Home";
import CustomerScreen from "./pages/Customer";
import { FreelancerScreen } from "./pages/Freelancer";
import ProductDetails from './pages/ProductDetails'
import ShoppingCart from './pages/ShoppingCart'

class App extends React.Component {
  state = {
    chosenPage: "home",
		id: "",
    title: "",
    description: "",
    price: "",
    paymentMethods: "",
    dueDate: "",
    taken: ""
  };

  
  //ensures that the selected page is being shown
  selectPage = () => {
    switch (this.state.chosenPage) {
      case "home":
        return (
          <Home
            goToCustomerScreen={this.goToCustomerScreen}
            goToFreelancerScreen={this.goToFreelancerScreen}
          />
        );
      case "customer":
        return (
					<CustomerScreen 
						irParaDetalhes = {this.irParaDetalhes} 
						irParaCarrinho = {this.irParaCarrinho} 
					/>
				)
      case "freelancer":
        return <FreelancerScreen />;
			case "details":
				return (
					<ProductDetails 
						id={this.state.id}
						title={this.state.title}
						description={this.state.description}
						price={this.state.price}
						paymentMethods={this.state.paymentMethods}
						dueDate={this.state.dueDate}
						taken={this.state.taken}
						goToCustomerScreen = {this.goToCustomerScreen}
					/>
				)
			case "shoppingCart":
				return (
					<ShoppingCart 
						id={this.state.id}
						title={this.state.title}
						description={this.state.description}
						price={this.state.price}
						paymentMethods={this.state.paymentMethods}
						dueDate={this.state.dueDate}
						taken={this.state.taken}
					/>
				)
				default:
					return (
						<Home
							goToCustomerScreen={this.goToCustomerScreen}
							goToFreelancerScreen={this.goToFreelancerScreen}
						/>
					);
    }
  };

  //onclick customer page selector
  goToCustomerScreen = () => {
    this.setState({ chosenPage: "customer" });
  };

  //onclick freelancer page selector
  goToFreelancerScreen = () => {
    this.setState({ chosenPage: "freelancer" });
  };

	irParaDetalhes = (id, title, description, price, paymentMethods, dueDate, taken) => {
    this.setState({chosenPage: "details",id: id, title: title, description: description, price:price, paymentMethods: paymentMethods, dueDate: dueDate, taken: taken})
  }

  irParaCarrinho = (id, title, description, price, paymentMethods, dueDate, taken) => {
    this.setState({chosenPage: "shoppingCart",id: id, title: title, description: description, price:price, paymentMethods: paymentMethods, dueDate: dueDate, taken: taken})
  }




  render() {
    return <>{this.selectPage()}</>;
  }
}

export default App;
