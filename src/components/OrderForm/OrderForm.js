import React, { Component } from 'react';
import { newOrders } from '../../apiCalls';
import './OrderForm.css';

class OrderForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredients: [],
      error: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.ingredients.length > 0 && this.state.name) {
      this.setState({ error: false })
      const newOrder = {
        id: Date.now(),
        name: this.state.name,
        ingredients: this.state.ingredients
      }
      this.handleFetch(newOrder)
    } else {
      this.setState({ error: true })
    }
    this.clearInputs();
  }

  handleFetch = (order) => {
    newOrders(order)
    .then(response => response.json())
    .then(order => {
      this.props.updateOrders(order)
    })
    .catch(err => console.log(err));
  }

  clearInputs = () => {
    this.setState({ name: '', ingredients: [] });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.name] })
  }

  handleNameChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className={ingredient} key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <div className='form'>
          <label>Start Order:</label>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={this.state.name}
            onChange={e => this.handleNameChange(e)}
          />
        </div>
        <section className='buttons'>
          { ingredientButtons }
        </section>

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
        {this.state.error ? <p>Please fill out your name and choose at least one ingredient!</p> : <p style={{ opacity: "0" }}>Error placeholder</p>}
      </form>
    )
  }
}

export default OrderForm;
