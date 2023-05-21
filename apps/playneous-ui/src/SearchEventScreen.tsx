import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function SearchScreen({ navigation} : any) {
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: "1", value: "FootBall" },
    { key: "2", value: "BasketBall" },
    { key: "3", value: "SpikeBall" },
    { key: "4", value: "TableTennis" },
    { key: "5", value: "Tennis" },
    { key: "6", value: "VolleyBall" },
  ];
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Create Event</Text>
      <SelectList
        setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
        data={data}
        save="value"
      /> */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Screen</Text>
        <Button
          title="Go to Create"
          onPress={() => navigation.navigate("Create")}
        />
      </View>
    </View>
  );
}
