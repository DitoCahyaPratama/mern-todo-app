import React, { Component } from "react";
import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeTodoCompleted = (event) => {
    this.setState({
      todo_completed: !this.state.todo_completed,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed,
    };
    axios
      .post(
        "http://localhost:4000/todos/update/" + this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="todo_description"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              name="todo_responsible"
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
              <label className="form-check-label">High</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedChecbox"
                name="completedChecbox"
                onChange={this.handleChangeTodoCompleted}
                checked={this.state.todo_completed}
                value={this.state.todo_completed}
              />
              <label className="form-check-label" htmlFor="completedChecbox">
                Completed
              </label>
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Update Todo"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
