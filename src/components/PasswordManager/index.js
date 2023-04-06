import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordListItems from '../PasswordListItems'

const initialBackgroundClassNamesList = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isShowPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchResult = event => {
    this.setState({searchInput: event.target.value})
  }

  ShowPassword = () => {
    const {isShowPasswords} = this.state
    this.setState({isShowPasswords: !isShowPasswords})
  }

  onAddPasswords = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initialBackgroundColors = `initial-container ${
      initialBackgroundClassNamesList[
        Math.ceil(Math.random() * initialBackgroundClassNamesList.length - 1)
      ]
    }`

    const newPasswordsList = {
      id: uuidv4(),
      username,
      website,
      password,
      initialContainer: initialBackgroundColors,
      showPassword: false,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordsList],
      username: '',
      website: '',
      password: '',
    }))
  }

  deleteItem = deleteId => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(
        deleteItem => deleteItem.id !== deleteId,
      ),
    })
  }

  getSearchResult = () => {
    const {passwordList, searchInput} = this.state
    const searchResultItems = passwordList.filter(eachItem =>
      eachItem.username.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResultItems
  }

  render() {
    const {website, username, password, searchInput, passwordList} = this.state
    const searchResults = this.getSearchResult()
    return (
      <div className="password-manager-bg-container">
        <div className="password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="app-logo"
            alt="app logo"
          />
          <div className="password-bottom-container">
            <div className="form-card-container">
              <div className="form-password-container">
                <h1 className="heading">Add New Password</h1>
                <form className="form" onSubmit={this.onAddPasswords}>
                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="website-logo"
                    />
                    <hr className="line" />
                    <input
                      type="text"
                      className="website-input"
                      placeholder="Enter Website"
                      onChange={this.onChangeWebsite}
                      value={website}
                    />
                  </div>

                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="website-logo"
                    />
                    <hr className="line" />
                    <input
                      type="text"
                      className="website-input"
                      placeholder="Enter Username"
                      onChange={this.onChangeUsername}
                      value={username}
                    />
                  </div>

                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="website-logo"
                    />
                    <hr className="line" />
                    <input
                      type="password"
                      className="website-input"
                      placeholder="Enter Password"
                      onChange={this.onChangePassword}
                      value={password}
                    />
                  </div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                  className="password-manager"
                  alt="password manager"
                />
              </div>
            </div>
            <div className="form-bottom-card-container">
              <div className="password-list-container">
                <h1 className="password-heading">
                  Your Passwords
                  <span className="count-list-items">
                    {passwordList.length}
                  </span>
                </h1>
                <div className="search-results-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-results"
                  />
                  <hr className="line" />
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={this.onSearchResult}
                    value={searchInput}
                  />
                </div>
              </div>
              <hr className="border-line" />
              <div className="show-password-container">
                <button
                  className="show-password-button"
                  type="button"
                  onClick={this.ShowPassword}
                >
                  <input type="checkbox" className="radio-box" id="password" />
                </button>
                <label className="show-password-heading" htmlFor="password">
                  Show Passwords
                </label>
              </div>
              {passwordList.length === 0 ? (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords"
                  />
                  <p className="no-password-heading">No Passwords</p>
                </div>
              ) : (
                <ul className="list-items">
                  {searchResults.map(eachItem => (
                    <PasswordListItems
                      key={eachItem.id}
                      websiteDetails={eachItem}
                      deleteItem={this.deleteItem}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
