import Navbar from './components/Navbar';
import CountryCatalog from './components/CountryCatalog';

function App() {
  return (
    <div>
      <Navbar />
      <div className="bg-very-light-gray">
        <div className="flex flex-col">
          <div className="w-full max-w-7xl mx-auto flex flex-wrap flex-col p-4">
            <CountryCatalog />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
