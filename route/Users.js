import express from "express";
import Info from "../db/schema.js"

const routes = express.Router();

export const create = async (req, res) => {
    const newUser = new Info(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.log(err)
    }
};

export const dltuser = async (req, res) => {
    try {
        await Info.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        console.log(err)
    }
};

export const update = async (req, res) => {
    try {
        const updatedUser = await Info.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        }, {
            new: true
        }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
    }
};

export const findUser = async (req, res) => {
    try {
        const user = await Info.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
    }
};

export const findUsers = async (req, res) => {
    try {
        const user = await Info.find();
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
    }
};

routes.post('/', create)
routes.delete('/:id', dltuser)
routes.put('/:id', update)
routes.get('/:id', findUser)
routes.get('/', findUsers)

export default routes