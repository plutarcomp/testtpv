import { useTheme } from '../src/theme/useTheme';


const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Welcome to the Home Page</h1>
      <p className="lead">Current Theme: {theme}</p>
      <button className="btn btn-primary" onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default App;