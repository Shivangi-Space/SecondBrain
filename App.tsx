import React from "react";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadScreen from "./src/presentation/screens/documentUpload/UploadScreen";
import { store } from "./src/store";

function App(): React.JSX.Element {
  return(
    <Provider store={store}>
      <SafeAreaView style={{
        flex: 1
      }}>
        <UploadScreen />
      </SafeAreaView>
    </Provider>
  );
}

export default App;