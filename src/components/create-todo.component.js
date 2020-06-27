import React, { Component } from "react";
import axios from 'axios'

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Form Submitted: `);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsible: ${this.state.todo_responsible}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`);
    console.log(`Todo Completed: ${this.state.todo_completed}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    }

    axios.post('http://localhost:4000/todos/add', newTodo)
      .then(res => console.log(res.data))

    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    });
  };

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              name="todo_description"
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              name="todo_responsible"
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">Low</label>
            </div>
          </div>
          <div className="form-group">
              <input type="submit" value="Create Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
