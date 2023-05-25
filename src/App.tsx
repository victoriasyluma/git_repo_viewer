import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Repositories, Users } from './routes';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="*" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default App;
