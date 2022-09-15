import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUserName: '',
      newUserPhone: '',
      newUserEmail: ''
    }
    this.changeInfo = this.changeInfo.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  changeInfo(e) {
    e.preventDefault();
    let currentElement = e.target;
    let stateProperty = currentElement.id;
    let value = currentElement.value;
    this.setState({
      [stateProperty]: value
    })
  }

  addUser(e) {
    e.preventDefault();
    let users = this.state.users;
    let user = {
      name: this.state.newUserName,
      phone: this.state.newUserPhone,
      email: this.state.newUserEmail
    }
    users.push(user);
    this.setState({
      users: users
    })
    e.target.closest('form').reset();

  }

  removeUser(e) {
    let element = e.target.closest('tr');
    let users = this.state.users;
    let name = element.childNodes[0].textContent;
    let phone = element.childNodes[1].textContent;
    let email = element.childNodes[2].textContent;
    users = users.filter(user => !(user.name === name && user.phone === phone && user.email === email));
    this.setState({
      users: users
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='part'>
          <h2 className='part__title'>Добавить</h2>
          <form className='registration__form'>
            <div>
              <label>Имя</label>
              <input type='text' required onChange={this.changeInfo} id='newUserName' />
            </div>
            <div>
              <label>Телефон</label>
              <input type='number' required onChange={this.changeInfo} id='newUserPhone' />
            </div>
            <div>
              <label>Email</label>
              <input type='email' required onChange={this.changeInfo} id='newUserEmail' />
            </div>
            <input type='submit' value='Добавить' onClick={this.addUser} disabled={!this.state.newUserName || !this.state.newUserPhone || !this.state.newUserEmail} />
          </form>
        </div>
        <div className='part'>
          <h2 className='part__title'>Список контактов</h2>
          <table className='users'>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) =>
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td><button onClick={this.removeUser}>Delete</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
);

