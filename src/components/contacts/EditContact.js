import React, { Component } from "react";
import { Consumer } from "../../context";
// import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for errors
    if (name === "") {
      this.setState({
        errors: {
          name: "Name is required"
        }
      });
      return;
    }
    // Check for errors
    if (email === "") {
      this.setState({
        errors: {
          email: "Email is required"
        }
      });
      return;
    }
    // Check for errors
    if (phone === "") {
      this.setState({
        errors: {
          phone: "Phone is required"
        }
      });
      return;
    }
    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({
      type: "UPDATE_CONTACT",
      payload: res.data
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  async componentDidMount() {
    // console.log(this.props.match.params.id);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    );
    this.setState({
      name: res.data.name,
      email: res.data.email,
      phone: res.data.phone
    });
  }

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <div className="card-body">
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    type="email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-light btn-block"
                  value="Update Contact"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
