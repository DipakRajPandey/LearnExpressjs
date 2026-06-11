import { request, response } from "express";
import userService from "../service/user.service.js";

const getAllUsers = async (request, response) => {
  try {
    const users = await userService.getAllUsers(request.query);

    response.status(200).json(users);
  } catch (err) {
    response.status(400).send(err.message);
  }
};

const addUser = async (request, response) => {
  try {
    const userDetails = request.body;
    const user = await userService.addUser(userDetails);
    // console.log(userDetails);
    response.status(201).json({
      message: "User Created  Successfully",
      data: user,
    });
  } catch (err) {
    response.status(400).send(err.message);
  }
};
const getUserById = async (request, response) => {
  try {
    const user = await userService.getUserById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(400).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(
      req.params.id,
      req.body,
      req.user,
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.id);
    res.send({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateRoles = async (req, res) => {
  try {
    const data = await userService.updateRoles(
      req.params.id,
      req.body.role,
      req.user,
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await userService.updateProfile(req.user._id, req.file);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export default {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  updateRoles,
  updateProfile
};
