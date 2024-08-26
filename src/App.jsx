import userAuth from "./hooks/userAuth";
import AppRouter from "./routes/AppRouter";

function App() {

  const { loading } = userAuth()

  if (loading) {
    return (
      /* From Uiverse.io by Javierrocadev */
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:.7s]" />
        <div className="w-4 h-4 rounded-full bg-orange-500 animate-bounce [animation-delay:.3s]" />
        <div className="w-4 h-4 rounded-full bg-orange-600 animate-bounce [animation-delay:.7s]" />
      </div>


    )
  }
  return (
    <div data-theme="light" className="min-h-screen">
      <AppRouter />
    </div>
  );

}

export default App;