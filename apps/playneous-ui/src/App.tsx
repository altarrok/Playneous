import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { trpc } from "./utils/trpc";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./SearchEventScreen";
import EventCreationScreen from "./CreateEventScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://192.168.1.22:8000/trpc",
        }),
      ],
    })
  );

  const statusBarHeight =
    Platform.OS === "android" ? Constants.statusBarHeight : 0;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Search">
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="Create" component={EventCreationScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
});
