import './App.css';

import {QueryClient, QueryClient,QueryClientProvider,useQuery} from '@tanstack/react-query'
import { Posts } from './components/posts';


const App = () => {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <div className="content">
      <Posts/>
    </div>
    </QueryClientProvider>
  );
};

export default App;
