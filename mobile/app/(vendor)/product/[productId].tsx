import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CustomHeaderScrollView } from "@/components/app/CustomHeaderScrollView";
import { getProductDetails } from "@/services/Vendor";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/models";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Product = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<IProduct>({
    initialValues: {
      documentId: "",
      name: "",
      price: 0,
      available: true,
      image: {
        name: "",
        url: "",
      },
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      available: Yup.boolean(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    },
  });

  useEffect(() => {
    getProductDetails(productId).then((data) => {
      setValues(data.data);
    });
  }, []);

  return (
    <CustomHeaderScrollView
      title={values.name || "New Product"}
      isBackButton={true}
    >
      <View>
        <View className="w-full h-96 bg-slate-200">
          <Image
            source={values.image.url}
            contentFit="fill"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View className="container gap-4 p-4">
          <View>
            <Label>Name</Label>
            <Input
              placeholder="name"
              autoCapitalize="words"
              value={values.name}
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
            />
            {errors.name && touched.name && (
              <Text className="text-xs font-medium color-red-600 m-1">
                {errors.name}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-grow mr-4">
              <Label>Price</Label>
              <Input
                placeholder="Price"
                autoCapitalize="words"
                value={String(values.price)}
                keyboardType="numeric"
                onBlur={handleBlur("price")}
                onChangeText={handleChange("price")}
              />
              {errors.price && touched.price && (
                <Text className="text-xs font-medium color-red-600 m-1">
                  {errors.price}
                </Text>
              )}
            </View>
            <View className="w-5/12">
              <Label>Available</Label>
              <View className="flex-row items-center h-10">
                <Switch
                  checked={values.available}
                  onCheckedChange={(value) => setFieldValue("available", value)}
                  nativeID="airplane-mode"
                />
                <Label
                  className="ml-2"
                  nativeID="airplane-mode"
                  onPress={() => setFieldValue("available", !values.available)}
                >
                  {values.available ? "In Stock" : "Out of Stock"}
                </Label>
              </View>
            </View>
          </View>

          <View>
            <Button
              className="flex-0 flex-row justify-center items-center rounded-3xl"
              disabled={isSubmitting}
              onPress={() => handleSubmit()}
            >
              <Text>Login</Text>
            </Button>
          </View>
        </View>
      </View>
    </CustomHeaderScrollView>
  );
};

export default Product;
