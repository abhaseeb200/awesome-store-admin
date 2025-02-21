import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ToastContainer } from "react-toastify";
import Main from "./config/router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  return (
    <>
      <ToastContainer />
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Main />
      </PersistQueryClientProvider>
    </>
  );
}

export default App;
