import Navbar from "./components/Navbar"
import Routing from "./routes/Routing"
import "bootstrap-icons/font/bootstrap-icons.css"


function App() {
  
  return (
    <div className="flex flex-wrap w-full h-auto">
      <Navbar />
      <Routing />
    </div>
  )
}

export default App
