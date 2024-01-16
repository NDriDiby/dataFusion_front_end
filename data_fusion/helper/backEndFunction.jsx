import { backEnd } from "@/features/AuthSlice";

export const sendOTP = async (email) => {
  try {
    const response = await backEnd.post("/user/generate-otp/", { email });
    return response; // You can return the response or a specific part of it
  } catch (error) {
    // Handle error
    console.error("Error in sending OTP:", error);
    throw error; // Re-throw the error if you want the calling function to handle it
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await backEnd.post("/user/verify-otp/", { email, otp });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error in verifying OTP:", error.response.data);
    return { success: false, error: error.response.data };
  }
};

export const salesData = async () => {
  try {
    const response = await backEnd.get("/sales");
    console.log("Sales", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting sales data", error.response.data);
    return { success: false, error: error.response.data };
  }
};

export const createSalesData = async () => {
  try {
    const response = await backEnd.post("/sales");
    console.log("Sales", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting sales data", error.response.data);
    return { success: false, error: error.response.data };
  }
};
