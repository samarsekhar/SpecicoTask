import express from "express";
import { Data } from "../models/studentsmodel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.student || !req.body.teacher || !req.body.marks) {
      return res.status(400).send({
        message: "Send all required fields: student,teacher,marks",
      });
    }
    const newStudent = {
      student: req.body.student,
      teacher: req.body.teacher,
      marks: req.body.marks,
    };
    const student = await Data.create(newStudent);
    return res.status(201).send(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Data.find({});

    return res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Data.findById(id);

    return res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.student || !req.body.teacher || !req.body.marks) {
      return res.status(400).send({
        message: "Send all required fields: student,teacher,marks",
      });
    }
    const { id } = req.params;

    const result = await Data.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Data.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
