import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = await req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new ApiError(409, "User with same email id already exists");
    }
    const user = await User.create({
        fullName: fullName,
        email: email,
        password: password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user. Please Try again."
        );
    }
    res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false,
        });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong while generating refresh and access tokens"
            // error.message
        );
    }
};
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
        throw new ApiError(
            400,
            "The e-mail address and/or password you specified are not correct."
        );
    }
    const isPasswordValid = await existingUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "The e-mail address and/or password you specified are not correct."
        );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        existingUser._id
    );
    const loggedInUser = await User.findById(existingUser._id).select(
        "-password -refreshToken"
    );
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.body._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged out"));
});
const checkLoginStatus = asyncHandler(async (req, res) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        // const refToken = req.cookies?.refreshToken;
        if (!token) {
            return res
                .status(201)
                .json(new ApiResponse(201, {}, "User Logged out"));
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );
        if (!user) {
            return res
                .status(201)
                .json(new ApiResponse(201, {}, "User Logged out"));
        }
        console.log(token);
        return res.status(200).json(new ApiResponse(200, {}, "User Logged in"));
    } catch (error) {
        console.error(error);
        throw new ApiError(401, error?.message || "Invalid Access Token"); //by chai and code
    }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        // const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
        const accessToken  = await user.generateAccessToken();
        console.log(accessToken);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken: accessToken },
                    "Access token refreshed"
                )
            );
        // return res
        //     .status(200)
        //     .cookie("accessToken", accessToken, options)
        //     .cookie("refreshToken", newRefreshToken, options)
        //     .json(
        //         new ApiResponse(
        //             200,
        //             { accessToken, refreshToken: newRefreshToken },
        //             "Access token refreshed"
        //         )
        //     );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    checkLoginStatus,
};
