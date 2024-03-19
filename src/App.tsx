import './App.css'
import RegisterForm, { User } from './components/RegisterForm'

function App() {
  const handleCreateUser = (newUser: User) => {
    console.log(newUser);
  }

  return (
    <>
      <RegisterForm createUser={handleCreateUser} />
    </>
  )
}

export default App
