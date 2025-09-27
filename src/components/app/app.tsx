import MainScreen from '../../pages/main-screen/main-screen.tsx';

type AppScreenProps = {
  offerCardCount: number;
}

function App({ offerCardCount } : AppScreenProps): JSX.Element {
  return (
    <MainScreen offerCardCount={offerCardCount} />
  );
}

export default App;
