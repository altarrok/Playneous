import React, { Component } from "react";
import { View, Text } from "react-native";
import EventForm from "./components/CreateEventForm";



export default function EventCreationScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Create Event</Text>
      <EventForm></EventForm>
    </View>
  );
}
