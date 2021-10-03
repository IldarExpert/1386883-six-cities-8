import Main from '../main/main';

type AppProps = {
  numberOfPlaces: number,
  CardProperties:
    {
      id: number
    }[]
}

function App({numberOfPlaces, CardProperties}: AppProps): JSX.Element {
  return (
    <Main
      numberOfPlaces = {numberOfPlaces}
      CardProperties = {CardProperties}
    />
  );
}

export default App;
