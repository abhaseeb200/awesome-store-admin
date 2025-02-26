import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  persistQueryClientRestore,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ToastContainer } from "react-toastify";
import Main from "./config/router";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

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

  persistQueryClientRestore({
    queryClient,
    persister,
  });

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      queryClient.setQueryData("auth", JSON.parse(auth));
    }
  }, []);
  

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
