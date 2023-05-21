import React, { Component } from "react";
import { Button, View, Text, TextInput } from "react-native";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

const createEventValidationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Min 3").required("Title is required"),
  description: Yup.string().min(3, "Min 3").required("Description is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.number().min(10, "Min 10").required("Phone is required"),
});



export default function EventForm() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Formik
            initialValues={{ title: "", description: "", email: "", phone: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={createEventValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <Text>Title</Text>
                <TextInput
                  placeholder="Title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {errors.title && touched.title ? (
                  <Text style={{ color: "red" }}>{errors.title}</Text>
                ) : null}
                <Text>Description</Text>
                <TextInput
                  placeholder="Description"
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
                {errors.description && touched.description ? (
                  <Text style={{ color: "red" }}>{errors.description}</Text>
                ) : null}
                <Text>Email</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                ) : null}
                <Text>Phone</Text>
                <TextInput
                  placeholder="Phone"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <Text style={{ color: "red" }}>{errors.phone}</Text>
                ) : null}
                {/* <Button onPress={handleSubmit} title="Submit" /> */}
                </View>
         
            )}
          </Formik>
        </View>
      );
}