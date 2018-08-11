import React, { Component } from "react";
import { Consumer } from "../../context";
// import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

export default class AddContact extends Component {
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

    const newContact = {
      // id: uuid(),
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({
      type: "ADD_CONTACT",
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

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
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
                  value="Add Contact"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
