import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

const BASE_URL = "http://fullyai.localhost:8000/api/v1";
export const backEnd = axios.create({ baseURL: BASE_URL });

export const createBackendInstance = (domain) => {
  const baseURL = `http://${domain}.localhost:8000/api/v1`;
  return axios.create({ baseURL });
};

// Async thunk for user registration
export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const loginData = { email, password };
    console.log("loginData", loginData);
    const response = await backEnd.post("/user/login/", { email, password });

    console.log("response", response.status);
    if (response.status === 200) {
      console.log("response", response.data);
      // dispatch(sendOTP(email));
    }

    const { access_token, refresh_token, user } = response.data;
    console.log("USER DATA:", access_token, refresh_token, user);

    // Set header on successful registration
    backEnd.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    // Set AsyncStorage items
    // await AsyncStorage.setItem("userToken", access_token);
    // await AsyncStorage.setItem("refreshToken", refresh_token);
    // await AsyncStorage.setItem("email", user.email);
    // await AsyncStorage.setItem("role", user.role);
    // await AsyncStorage.setItem("nom", user.first_name);
    // await AsyncStorage.setItem("prenom", user.last_name);
    // await AsyncStorage.setItem("phone", user.phone);
    // await AsyncStorage.setItem("userID", user.id.toString());

    return {
      userToken: access_token,
      refreshToken: refresh_token,
      email: user.email,
      role: user.role,
      nom: user.first_name,
      prenom: user.last_name,
      phone: user.phone,
      userID: user.id,
    };
  } catch (error) {
    console.log("error", error.response.status);
    return rejectWithValue(error.toString());
  }
});

// Some action file
export const sendOTP = createAsyncThunk("auth/sendOTP", async (email, { rejectWithValue }) => {
  try {
    const response = await backEnd.post("/user/generate-otp/", { email });
    console.log("OTP:", response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("email");
  await AsyncStorage.removeItem("role");
  await AsyncStorage.removeItem("last_name");
  await AsyncStorage.removeItem("first_name");
  await AsyncStorage.removeItem("phone");
  await AsyncStorage.removeItem("userID");
  return {};
});

// Async thunk for initializing the auth state
export const initializeAuth = createAsyncThunk("auth/initializeAuth", async (_, { rejectWithValue }) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const email = await AsyncStorage.getItem("email");
    const role = await AsyncStorage.getItem("role");
    const first_name = await AsyncStorage.getItem("first_name");
    const last_name = await AsyncStorage.getItem("last_name");
    const phone = await AsyncStorage.getItem("phone");
    const userID = await AsyncStorage.getItem("userID");

    // Set header if token exists
    if (userToken) {
      backEnd.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    }

    return { userToken, refreshToken, email, role, first_name, last_name, phone, userID };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

// Initial state
const initialState = {
  userToken: null,
  refreshToken: null,
  email: null,
  role: null,
  first_name: null,
  last_name: null,
  phone: null,
  userID: null,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userToken = action.payload.userToken;
        state.refreshToken = action.payload.refreshToken;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.userID = action.payload.userID;
        state.last_name = action.payload.last_name;
        state.first_name = action.payload.first_name;
        state.phone = action.payload.phone;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userToken = null;
        state.refreshToken = null;
        state.email = null;
        state.role = null;
        state.userID = null;
        state.last_name = null;
        state.first_name = null;
        state.phone = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.userToken = action.payload.userToken;
        state.refreshToken = action.payload.refreshToken;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.userID = action.payload.userID;
        state.last_name = action.payload.last_name;
        state.first_name = action.payload.first_name;
        state.phone = action.payload.phone;
      });
  },
});

export const selectUserEmail = (state) => state.auth.email;

export default authSlice.reducer;
