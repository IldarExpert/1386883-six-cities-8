import Main from '../main/main';
import AppProps from './type';

function App({numberOfPlaces, CardProperties}: AppProps): JSX.Element {
  return (
    <Main
      numberOfPlaces = {numberOfPlaces}
      CardProperties = {CardProperties}
    />
  );
}

export default App;
